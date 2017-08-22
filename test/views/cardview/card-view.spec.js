describe('Component:  pfCardView', function () {
  var $scope;
  var $compile;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.views', 'patternfly.utils', 'views/cardview/card-view.html', 'views/empty-state.html', 'pagination/pagination.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  function basicSetup() {
    $scope.systemModel = [
      {uuid: '1', name: 'One', size: 291445030, capacity: 8200000000},
      {uuid: '2', name: 'Two', size: 1986231544, capacity: 8700000000},
      {uuid: '3', name: 'Three', size: 7864632, capacity: 7800000000},
      {uuid: '4', name: 'Four', size: 8162410, capacity: 3200000000},
      {uuid: '5', name: 'Five', size: 6781425410, capacity: 7600000000}
    ];
    $scope.cardConfig = {
      selectedItems: [],
      showSelectBox: true
    };

    var htmlTmp = '<pf-card-view items="systemModel" config="cardConfig">' +
      '<div class="nameLabel1">{{item.name}}</div>' +
      '<div class="nameLabel1">{{item.size}}</div>' +
      '<div class="nameLabel1">{{item.capacity}}</div>' +
      '</pf-card-view>';

    compileHTML(htmlTmp, $scope);
  }

  function paginationSetup() {
    $scope.systemModel = [
      {uuid: '1', name: 'One', size: 291445030, capacity: 8200000000},
      {uuid: '2', name: 'Two', size: 1986231544, capacity: 8700000000},
      {uuid: '3', name: 'Three', size: 7864632, capacity: 7800000000},
      {uuid: '4', name: 'Four', size: 8162410, capacity: 3200000000},
      {uuid: '5', name: 'Five', size: 6781425410, capacity: 7600000000},
      {uuid: '6', name: 'Six', size: 6781425410, capacity: 7600000000},
      {uuid: '7', name: 'Seven', size: 6781425410, capacity: 7600000000}
    ];

    $scope.cardConfig = {
      selectedItems: [],
      showSelectBox: true
    };

    $scope.pageConfig = {
      pageNumber: 2,
      pageSize: 2,
      pageSizeIncrements: [2, 10, 15]
    };

    var htmlTmp = '<pf-card-view items="systemModel" config="cardConfig" page-config="pageConfig">' +
      '<div class="nameLabel1">{{item.name}}</div>' +
      '<div class="nameLabel1">{{item.size}}</div>' +
      '<div class="nameLabel1">{{item.capacity}}</div>' +
      '</pf-card-view>';

    compileHTML(htmlTmp, $scope);
  }

  it('should have correct number cards', function () {
    basicSetup();
    var rows = element.find('.card-content');
    expect(rows.length).toBe(5);

  });

  it('should show the select checkbox by default', function () {
    var items;
    var checkItems;

    basicSetup();

    items = element.find('.card-content');
    checkItems = element.find('.card-check-box');
    expect(checkItems.length).toBe(items.length);

    // allow item selection
    $scope.cardConfig.selectItems = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should not show the select checkboxes when showSelectBox is false', function () {
    var checkItems;

    basicSetup();

    checkItems = element.find('.card-check-box');
    expect(checkItems.length).toBe(5);

    // disallow checkbox selection
    $scope.cardConfig.showSelectBox = false;
    $scope.$digest();

    checkItems = element.find('.card-check-box');
    expect(checkItems.length).toBe(0);
  });

  it('should not allow selection when selectItems is false', function () {
    var items;
    var selectedItems;

    basicSetup();

    items = element.find('.card-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.cardConfig.selectItems = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should add selected class to clicked card', function () {
    var items;
    var selectedItems;

    basicSetup();

    items = element.find('.card-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.cardConfig.selectItems = true;
    $scope.cardConfig.showSelectBox = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);
  });

  it('should manage selected array', function () {
    var items;
    var selectedItems;

    basicSetup();

    items = element.find('.card-content');
    expect($scope.cardConfig.selectedItems.length).toBe(0);

    // allow item selection
    $scope.cardConfig.selectItems = true;
    $scope.cardConfig.showSelectBox = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);
    expect($scope.cardConfig.selectedItems.length).toBe(1);

  });

  it('should handle double click event', function () {
    var items;
    var doubleClickWorking = false;
    var onDoubleClick = function () {
      doubleClickWorking = true;
    };

    basicSetup();

    $scope.cardConfig.onDblClick = onDoubleClick;

    items = element.find('.card-content');
    expect(doubleClickWorking).toBe(false);

    eventFire(items[1], 'dblclick');
    expect(doubleClickWorking).toBe(true);

  });

  it('should respect the multiSelect setting', function () {
    var items;
    var selectedItems;

    basicSetup();

    items = element.find('.card-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.cardConfig.selectItems = true;
    $scope.cardConfig.showSelectBox = false;
    $scope.cardConfig.multiSelect = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);

    eventFire(items[2], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);

    $scope.cardConfig.multiSelect = true;

    eventFire(items[3], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(2);
  });

  it('should set disabled rows correctly', function () {
    var items;
    var selectedItems;
    var disabledItems;
    var checkDisabled = function (item) {
      return item.uuid === '2';
    };

    basicSetup();

    // allow item selection
    $scope.cardConfig.selectItems = true;
    $scope.cardConfig.showSelectBox = false;

    $scope.cardConfig.checkDisabled = checkDisabled;

    $scope.$digest();

    items = element.find('.card-content');
    disabledItems = element.find('.disabled');
    expect(disabledItems.length).toBe(1);

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should not allow both row and checkbox selection', function () {
    var exceptionRaised = false;

    basicSetup();

    $scope.badConfig = {
      selectItems: true,
      showSelectBox: true
    };

    var htmlTmp = '<pf-card-view items="systemModel" config="badConfig">' +
      '<div class="nameLabel1">{{item.name}}</div>' +
      '</pf-card-view>';


    try {
      compileHTML(htmlTmp, $scope);
      scope.$digest();
    } catch (e) {
      exceptionRaised = true;
    }
    expect(exceptionRaised).toBe(true);
  });

  it('should show the empty state when specified', function () {
    basicSetup();
    $scope.cardConfig.itemsAvailable = false;
    $scope.$digest();
    expect(element.find('#title').text()).toContain('No Items Available');
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

    // two items shown in the list
    expect(element.find('.card-content').length).toBe(2);
  });

  it('should goto a specific page when inputted', function () {
    paginationSetup();

    angular.element(element.find('.pagination-pf-page ')).val('3').trigger('input').blur();
    $scope.$digest();

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('5-6');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('7');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('3');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('4');

    // two items shown in the list
    expect(element.find('.card-content').length).toBe(2);
  });

  it('should change the page size when selected from dropdown', function() {
    paginationSetup();

    //Get pageSizeDropdown
    var pageSizeDropdown = element.find('div[uib-dropdown]');
    expect(pageSizeDropdown.length).toBe(1);

    // two items shown in the list
    expect(element.find('.card-content').length).toBe(2);

    var selectedPageSize = pageSizeDropdown.find('.display-length-increment.selected');
    expect(selectedPageSize.length).toBe(1);
    expect(angular.element(selectedPageSize).text().trim()).toBe('2', 'selected pageSize should be 2');

    //Change pageSizeDropdown to 10
    var pageSizeLinks = pageSizeDropdown.find('a');
    expect(pageSizeLinks.length).toBe(3);
    pageSizeLinks[1].click();  // switch to 10 items per page
    element.isolateScope().$digest();

    selectedPageSize = pageSizeDropdown.find('.display-length-increment.selected');
    expect(selectedPageSize.length).toBe(1);
    expect(angular.element(selectedPageSize).text().trim()).toBe('10', 'selected pageSize should be 10');

    expect(element.find('.card-content').length).toBe(7, 'should be 7 items shown in list');
  });
});
