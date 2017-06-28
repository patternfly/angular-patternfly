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

  beforeEach(function () {
    $scope.config = {
      selectionMatchProp: 'uuid'
    };

    $scope.columns = [
      {itemField: 'uuid', header: 'ID'},
      {itemField: 'name', header: 'Name'},
      {itemField: 'size', header: 'Size'},
      {itemField: 'capacity', header: 'Capacity'}
    ];

    $scope.items = [
      {uuid: '1', name: 'One', size: 291445030, capacity: 8200000000},
      {uuid: '2', name: 'Two', size: 1986231544, capacity: 8700000000},
      {uuid: '3', name: 'Three', size: 7864632, capacity: 7800000000},
      {uuid: '4', name: 'Four', size: 8162410, capacity: 3200000000},
      {uuid: '5', name: 'Five', size: 6781425410, capacity: 7600000000}
    ];

    var htmlTmp = '<pf-table-view config="config" columns="columns" items="items"></pf-table-view>';

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

});
