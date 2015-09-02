describe('Directive:  pfDataList', function () {
  var $scope;
  var $compile;
  var $timeout;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.views', 'patternfly.utils', 'views/datalist/data-list.html');
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
    $scope.systemModel = [
      {uuid: '1', name: 'One', size: 291445030, capacity: 8200000000},
      {uuid: '2', name: 'Two', size: 1986231544, capacity: 8700000000},
      {uuid: '3', name: 'Three', size: 7864632, capacity: 7800000000},
      {uuid: '4', name: 'Four', size: 8162410, capacity: 3200000000},
      {uuid: '5', name: 'Five', size: 6781425410, capacity: 7600000000}
    ];
    $scope.listConfig = {
      selectedItems: []
    };

    var htmlTmp = '<div pf-data-list items="systemModel" config="listConfig">' +
      '<div class="nameLabel1">{{item.name}}</div>' +
      '</div>';

    compileHTML(htmlTmp, $scope);
  });

  it('should have correct number list items', function () {
    var rows = element.find('.list-content');
    expect(rows.length).toBe(5);

  });

  it('should show the select checkbox by default', function () {
    var items;
    var checkItems;

    items = element.find('.list-content');
    checkItems = element.find('.list-check-box');
    expect(checkItems.length).toBe(items.length);

    // allow item selection
    $scope.listConfig.selectItems = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should not show the select checkboxes when showSelectBox is false', function () {
    var checkItems;

    checkItems = element.find('.list-check-box');
    expect(checkItems.length).toBe(5);

    // disallow checkbox selection
    $scope.listConfig.showSelectBox = false;
    $scope.$digest();

    checkItems = element.find('.list-check-box');
    expect(checkItems.length).toBe(0);
  });

  it('should not allow selection when selectItems is false', function () {
    var items;
    var selectedItems;

    items = element.find('.list-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.listConfig.selectItems = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should add selected class to clicked list item', function () {
    var items;
    var selectedItems;

    items = element.find('.list-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.listConfig.selectItems = true;
    $scope.listConfig.showSelectBox = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);
  });

  it('should manage selected array', function () {
    var items;
    var selectedItems;

    items = element.find('.list-content');
    expect($scope.listConfig.selectedItems.length).toBe(0);

    // allow item selection
    $scope.listConfig.selectItems = true;
    $scope.listConfig.showSelectBox = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);
    expect($scope.listConfig.selectedItems.length).toBe(1);

  });

  it('should handle double click event', function () {
    var items;
    var doubleClickWorking = false;
    var onDoubleClick = function () {
      doubleClickWorking = true;
    };

    $scope.listConfig.onDblClick = onDoubleClick;

    items = element.find('.list-content');
    expect(doubleClickWorking).toBe(false);

    eventFire(items[1], 'dblclick');
    expect(doubleClickWorking).toBe(true);

  });

  it('should respect the multiSelect setting', function () {
    var items;
    var selectedItems;

    items = element.find('.list-content');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);

    // allow item selection
    $scope.listConfig.selectItems = true;
    $scope.listConfig.showSelectBox = false;
    $scope.listConfig.multiSelect = false;

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);

    eventFire(items[2], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(1);

    $scope.listConfig.multiSelect = true;

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

    // allow item selection
    $scope.listConfig.selectItems = true;
    $scope.listConfig.showSelectBox = false;

    $scope.listConfig.checkDisabled = checkDisabled;

    $scope.$digest();

    items = element.find('.list-content');
    disabledItems = element.find('.disabled');
    expect(disabledItems.length).toBe(1);

    eventFire(items[1], 'click');
    selectedItems = element.find('.active');
    expect(selectedItems.length).toBe(0);
  });

  it('should not allow both row and checkbox selection', function () {
    var exceptionRaised = false;

    $scope.badConfig = {
      selectItems: true,
      showSelectBox: true
    };

    var htmlTmp = '<div pf-data-list items="systemModel" config="badConfig">' +
      '<div class="nameLabel1">{{item.name}}</div>' +
      '</div>';


    try {
      compileHTML(htmlTmp, $scope);
      scope.$digest();
    } catch (e) {
      exceptionRaised = true;
    }
    expect(exceptionRaised).toBe(true);
  });
})
