describe('Directive:  pfSort', function () {
  var $scope;
  var $compile;
  var $timeout;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.sort', 'sort/sort.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  beforeEach(function () {
    $scope.fields = [
      {
        id: 'name',
        title:  'Name',
        sortType: 'alpha'
      },
      {
        id: 'count',
        title:  'Count',
        sortType: 'numeric'
      },
      {
        id: 'description',
        title:  'Description',
        sortType: 'alpha'
      }
    ];

    var htmlTmp = '<pf-sort fields="fields"></pf-sort>';

    compileHTML(htmlTmp, $scope);
  });

  it('should have correct number of sort fields', function () {
    var fields = element.find('.sort-pf .sort-field');
    expect(fields.length).toBe(3);
  });

  it('should have default to the first sort field', function () {
    var results = element.find('.sort-pf .dropdown-toggle');
    expect(results.length).toBe(1);
    expect(results.html().trim().slice(0,'Name'.length)).toBe("Name");
  });

  it('should default to ascending sort', function () {
    var sortIcon = element.find('.sort-pf .fa-sort-alpha-asc');
    expect(sortIcon.length).toBe(1);
  });

  it('should update the current sort when one is selected', function () {
    var results = element.find('.sort-pf .dropdown-toggle');
    var fields = element.find('.sort-pf .sort-field');

    expect(results.length).toBe(1);
    expect(results.html().trim().slice(0,'Name'.length)).toBe("Name");
    expect(fields.length).toBe(3);

    eventFire(fields[2], 'click');
    $scope.$digest();

    results = element.find('.sort-pf .dropdown-toggle');
    expect(results.length).toBe(1);
    expect(results.html().trim().slice(0,'Description'.length)).toBe("Description");
  });

  it('should update the direction icon when the sort type changes', function () {
    var results = element.find('.sort-pf .dropdown-toggle');
    var fields = element.find('.sort-pf .sort-field');
    var sortIcon = element.find('.sort-pf .fa-sort-alpha-asc');

    expect(results.length).toBe(1);
    expect(results.html().trim().slice(0,'Name'.length)).toBe("Name");
    expect(fields.length).toBe(3);
    expect(sortIcon.length).toBe(1);

    eventFire(fields[1], 'click');
    $scope.$digest();

    results = element.find('.sort-pf .dropdown-toggle');
    sortIcon = element.find('.sort-pf .fa-sort-numeric-asc');
    expect(results.length).toBe(1);
    expect(results.html().trim().slice(0,'Count'.length)).toBe("Count");
    expect(sortIcon.length).toBe(1);

  });

  it('should reverse the sort direction when the direction button is clicked', function () {
    var sortButton = element.find('.sort-pf .btn.btn-link');
    var sortIcon = element.find('.sort-pf .fa-sort-alpha-asc');
    expect(sortButton.length).toBe(1);
    expect(sortIcon.length).toBe(1);

    eventFire(sortButton[0], 'click');
    $scope.$digest();

    sortIcon = element.find('.sort-pf .fa-sort-alpha-desc');
    expect(sortIcon.length).toBe(1);
  });

  it ('should notify when a new sort field is chosen', function() {
    var notified = false;
    var chosenId = '';
    var chosenDir = '';

    $scope.watchForNotify = function (sortId, isAscending) {
      notified = true;
      chosenId = sortId;
      chosenDir = isAscending;
    };

    var htmlTmp = '<pf-sort fields="fields" on-sort-change="watchForNotify" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);

    var fields = element.find('.sort-pf .sort-field');
    expect(fields.length).toBe(3);

    eventFire(fields[2], 'click');
    $scope.$digest();
    $timeout.flush();

    expect(notified).toBeTruthy();
    expect(chosenId).toBe($scope.fields[2].id);
    expect(chosenDir).toBeTruthy();
  });

  it ('should notify when the sort direction changes', function() {
    var notified = false;
    var chosenId = '';
    var chosenDir = '';

    $scope.watchForNotify = function (sortId, isAscending) {
      notified = true;
      chosenId = sortId;
      chosenDir = isAscending;
    };

    var htmlTmp = '<pf-sort fields="fields" on-sort-change="watchForNotify" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);

    var sortButton = element.find('.sort-pf .btn.btn-link');

    expect(sortButton.length).toBe(1);

    eventFire(sortButton[0], 'click');
    $scope.$digest();
    $timeout.flush();

    expect(notified).toBeTruthy();
    expect(chosenId).toBe($scope.fields[0].id);
    expect(chosenDir).toBeFalsy();
  });

  it ('should return appropriate icons for current sort type and direction', function () {
    $scope.currentSortId = $scope.fields[0].id;
    $scope.isAscending = true;

    var htmlTmp = '<pf-sort fields="fields" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);

    var alphaSortAsc = element.find('.fa.fa-sort-alpha-asc');
    var alphaSortDesc = element.find('.fa.fa-sort-alpha-desc');
    var numericSortAsc = element.find('.fa.fa-sort-numeric-asc');
    var numericSortDesc = element.find('.fa.fa-sort-numeric-desc');
    expect(alphaSortAsc.length).toBe(1);
    expect(alphaSortDesc.length).toBe(0);
    expect(numericSortAsc.length).toBe(0);
    expect(numericSortDesc.length).toBe(0);

    $scope.currentSortId = $scope.fields[0].id;
    $scope.isAscending = false;
    var htmlTmp = '<pf-sort fields="fields" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);

    alphaSortAsc = element.find('.fa.fa-sort-alpha-asc');
    alphaSortDesc = element.find('.fa.fa-sort-alpha-desc');
    numericSortAsc = element.find('.fa.fa-sort-numeric-asc');
    numericSortDesc = element.find('.fa.fa-sort-numeric-desc');
    expect(alphaSortAsc.length).toBe(0);
    expect(alphaSortDesc.length).toBe(1);
    expect(numericSortAsc.length).toBe(0);
    expect(numericSortDesc.length).toBe(0);

    $scope.currentSortId = $scope.fields[1].id;
    $scope.isAscending = true;
    var htmlTmp = '<pf-sort fields="fields" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);
    alphaSortAsc = element.find('.fa.fa-sort-alpha-asc');
    alphaSortDesc = element.find('.fa.fa-sort-alpha-desc');
    numericSortAsc = element.find('.fa.fa-sort-numeric-asc');
    numericSortDesc = element.find('.fa.fa-sort-numeric-desc');
    expect(alphaSortAsc.length).toBe(0);
    expect(alphaSortDesc.length).toBe(0);
    expect(numericSortAsc.length).toBe(1);
    expect(numericSortDesc.length).toBe(0);

    $scope.currentSortId = $scope.fields[1].id;
    $scope.isAscending = false;
    var htmlTmp = '<pf-sort fields="fields" current-sort-id="currentSortId" is-ascending="isAscending"></pf-sort>';
    compileHTML(htmlTmp, $scope);
    alphaSortAsc = element.find('.fa.fa-sort-alpha-asc');
    alphaSortDesc = element.find('.fa.fa-sort-alpha-desc');
    numericSortAsc = element.find('.fa.fa-sort-numeric-asc');
    numericSortDesc = element.find('.fa.fa-sort-numeric-desc');
    expect(alphaSortAsc.length).toBe(0);
    expect(alphaSortDesc.length).toBe(0);
    expect(numericSortAsc.length).toBe(0);
    expect(numericSortDesc.length).toBe(1);
  });
})
