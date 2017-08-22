describe('Component: pfTableView', function () {
  var $scope;
  var $compile;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.views', 'patternfly.table', 'table/tableview/table-view.html', 'views/empty-state.html', 'pagination/pagination.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $timeout = _$timeout_;
    $scope.config = {
      selectionMatchProp: 'uuid'
    };
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  function onNameClick (name) {
    $scope.result = "You clicked on " + name;
  }

  function basicSetup() {
    $scope.columns = [
      {itemField: 'uuid', header: 'ID'},
      {itemField: 'name', header: 'Name', htmlTemplate: "name_template.html", colActionFn: onNameClick},
      {itemField: 'size', header: 'Size'},
      {itemField: 'capacity', header: 'Capacity', templateFn: function(value) { return '<span class="custom-template2">' + value + '</span>' }}
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
  }

  function paginationSetup() {
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
      {uuid: '5', name: 'Five', size: 6781425410, capacity: 7600000000},
      {uuid: '6', name: 'Six', size: 6781425410, capacity: 7600000000},
      {uuid: '7', name: 'Seven', size: 6781425410, capacity: 7600000000}
    ];

    $scope.pageConfig = {
      pageNumber: 2,
      pageSize: 2,
      pageSizeIncrements: [2, 10, 15]
    };

    var htmlTmp = '<pf-table-view config="config" columns="columns" items="items" page-config="pageConfig"></pf-table-view>';

    compileHTML(htmlTmp, $scope);
  }

  it('should not show the empty state when items is null', function () {
    basicSetup();
    $scope.items = null;
    $scope.$digest();
    expect(element.find('#title').text()).toContain('');
  });

  it('should show the empty state when items is empty', function () {
    basicSetup();
    $scope.items = [];
    $scope.$digest();
    expect(element.find('#title').text()).toContain('No Items Available');
  });

  it('should show the empty state when the config property is specified', function () {
    basicSetup();
    $scope.config.itemsAvailable = false;
    $scope.$digest();
    expect(element.find('#title').text()).toContain('No Items Available');
  });

  it('should show the correct number of items', function () {
    basicSetup();
    var rows = element.find('.table > tbody > tr');
    expect(rows.length).toBe($scope.items.length);
  });

  it('should populate cells with correct data', function () {
    basicSetup();
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
    basicSetup();
    var headerCheckbox = element.find('.table > thead > tr > th > input[type="checkbox"]');
    var bodyCheckboxes = element.find('.table > tbody > tr > td > input[type="checkbox"]');
    expect(headerCheckbox.length).toBe(1);
    expect(bodyCheckboxes.length).toBe($scope.items.length);
  });

  it('should not show checkboxes for row selection when "showCheckboxes" is false', function () {
    basicSetup();
    $scope.config.showCheckboxes = false;
    $scope.$digest();
    var headerCheckbox = element.find('.table > thead > tr > th > input[type="checkbox"]');
    var bodyCheckboxes = element.find('.table > tbody > tr > td > input[type="checkbox"]');
    expect(headerCheckbox.length).toBe(0);
    expect(bodyCheckboxes.length).toBe(0);
  });

  it('should use an htmlTemplate if one is configured', function () {
    basicSetup();
    var nameLinks = element.find('.custom-template');
    expect(nameLinks.length).toBe(5);
    eventFire(nameLinks[0], 'click');
    expect($scope.result).toBe('You clicked on One');
  });

  it('should use a template function if one is configured', function () {
    basicSetup();
    var customSpans = element.find('.custom-template2');
    expect(customSpans.length).toBe(5);
    customSpans.each(function(i) {
      var result = $(this).parent().html();
      var expected = '<span class="custom-template2">' + $scope.items[i].capacity + '</span>';
      expect(result).toBe(expected);
    });
  });

  it('should not show pagination controls by default', function () {
    basicSetup();
    expect(element.find('pf-pagination').length).toBe(0);
  });

  it('should show pagination controls when configured', function () {
    paginationSetup();
    expect(element.find('pf-pagination').length).toBe(1);

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('3-4');  // page # 2
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('7');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('2');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('4');
  });

  it('should goto a specific page when inputted', function () {
    paginationSetup();

    var ctrl = element.isolateScope().$ctrl;
    spyOn(ctrl, 'updatePageNumber');

    angular.element(element.find('.pagination-pf-page ')).val('3').trigger('input').blur();
    $scope.$digest();

    expect(ctrl.updatePageNumber).toHaveBeenCalled();
    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('5-6');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('7');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('3');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('4');
  });

  it('should change the page size when selected from dropdown', function() {
    paginationSetup();

    var ctrl = element.isolateScope().$ctrl;
    spyOn(ctrl, 'updatePageSize');

    // initially on page 2, showing 2 rows 3 and 4
    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('3-4');

    //Get pageSizeDropdown
    var pageSizeDropdown = element.find('div[uib-dropdown]');
    expect(pageSizeDropdown.length).toBe(1);

    var selectedPageSize = pageSizeDropdown.find('.display-length-increment.selected');
    expect(selectedPageSize.length).toBe(1);
    expect(angular.element(selectedPageSize).text().trim()).toBe('2', 'selected pageSize should be 2');

    //Change pageSizeDropdown to 10
    pageSizeDropdown.find('button').click();
    var pageSizeLinks = pageSizeDropdown.find('a');
    expect(pageSizeLinks.length).toBe(3);
    pageSizeLinks[1].click();  // switch to 10 items per page
    element.isolateScope().$digest();

    expect(ctrl.updatePageSize).toHaveBeenCalled();

    selectedPageSize = pageSizeDropdown.find('.display-length-increment.selected');
    expect(selectedPageSize.length).toBe(1);
    expect(angular.element(selectedPageSize).text().trim()).toBe('10', 'selected pageSize should be 10');
    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('1-7');
  });
});
