describe('Component: pfTableView', function () {
  var $scope;
  var $compile;
  var element;
  var performedAction;
  var updateCount;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.views', 'patternfly.table', 'table/tableview/table-view.html', 'views/empty-state.html');
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

  function onNameClick (name) {
    $scope.result = "You clicked on " + name;
  }

  beforeEach(function () {
    $scope.config = {
      selectionMatchProp: 'uuid'
    };

    $scope.columns = [
      {itemField: 'uuid', header: 'ID'},
      {itemField: 'name', header: 'Name', htmlTemplate: "name_template.html", colActionFn: onNameClick},
      {itemField: 'size', header: 'Size'},
      {itemField: 'capacity', header: 'Capacity'}
    ];

    $scope.items = [
      {name: 'One', capacity: 8200000000, uuid: '1', size: 291445030},
      {name: 'Two', capacity: 8700000000, uuid: '2', size: 1986231544},
      {name: 'Three', capacity: 7800000000, uuid: '3', size: 7864632},
      {name: 'Four', capacity: 3200000000, uuid: '4', size: 8162410},
      {name: 'Five', capacity: 7600000000, uuid: '5', size: 6781425410}
    ];

    var htmlTmp = '<pf-table-view config="config" columns="columns" items="items"></pf-table-view>' +
      '<script type="text/ng-template" id="name_template.html">' +
        '<span class="custom-template" ng-click="$ctrl.handleColAction(key, value)">{{value}}</span>' +
      '</script>';

    compileHTML(htmlTmp, $scope);
  });

  it('should not show the empty state when items is null', function () {
    $scope.items = null;
    $scope.$digest();
    expect(element.find('#title').text()).toContain('');
  });

  it('should show the empty state when items is empty', function () {
    $scope.items = [];
    $scope.$digest();
    expect(element.find('#title').text()).toContain('No Items Available');
  });

  it('should show the empty state when the config property is specified', function () {
    $scope.config.itemsAvailable = false;
    $scope.$digest();
    expect(element.find('#title').text()).toContain('No Items Available');
  });

  it('should show the correct number of items', function () {
    var rows = element.find('.table > tbody > tr');
    expect(rows.length).toBe($scope.items.length);
  });

  it('should populate cells with correct data', function () {
    var i, j, item, selector, expectedValue;
    for (i = 0; i < $scope.items.length; i++) {
      item = $scope.items[i];
      for (j = 0; j < $scope.columns.length; j++) {
        selector = '.table > tbody > tr:eq(' + i + ') > td:eq(' + (j + 1) + ')';
        cellValue = element.find(selector).text().trim();
        expectedValue = item[$scope.columns[j].itemField].toString();
        expect(cellValue).toBe(expectedValue);
      }
    }
  });

  it('should show checkboxes for row selection', function () {
    var headerCheckbox = element.find('.table > thead > tr > th > input[type="checkbox"]');
    var bodyCheckboxes = element.find('.table > tbody > tr > td > input[type="checkbox"]');
    expect(headerCheckbox.length).toBe(1);
    expect(bodyCheckboxes.length).toBe($scope.items.length);
  });

  it('should not show checkboxes for row selection when "showCheckboxes" is false', function () {
    $scope.config.showCheckboxes = false;
    $scope.$digest();
    var headerCheckbox = element.find('.table > thead > tr > th > input[type="checkbox"]');
    var bodyCheckboxes = element.find('.table > tbody > tr > td > input[type="checkbox"]');
    expect(headerCheckbox.length).toBe(0);
    expect(bodyCheckboxes.length).toBe(0);
  });

  it('should use an htmlTemplate if one is configured', function () {
    var nameLinks = element.find('.custom-template');
    expect(nameLinks.length).toBe(5);
    eventFire(nameLinks[0], 'click');
    expect($scope.result).toBe('You clicked on One');
  });

});
