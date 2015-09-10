describe('Directive:  pfDataToolbar', function () {
  var $scope;
  var $compile;
  var element;
  var pfViewUtils;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.views', 'patternfly.filters', 'patternfly.select', 'views/toolbar/data-toolbar.html',
           'filters/simple-filter.html', 'filters/simple-filter-fields.html', 'filters/simple-filter-results.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_, pfViewUtils) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $pfViewUtils = pfViewUtils;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  beforeEach(function () {
    $scope.filterConfig =
    $scope.config = {
      viewsConfig: {
        views: [$pfViewUtils.getDashboardView(), $pfViewUtils.getListView(), $pfViewUtils.getTilesView(), $pfViewUtils.getTableView(), $pfViewUtils.getTopologyView()]
      },
      filterConfig: {
        fields: [
          {
            id: 'name',
            title:  'Name',
            placeholder: 'Filter by Name',
            filterType: 'text'
          },
          {
            id: 'address',
            title:  'Address',
            placeholder: 'Filter by Address',
            filterType: 'text'
          },
          {
            id: 'birthMonth',
            title:  'Birth Month',
            placeholder: 'Filter by Birth Month',
            filterType: 'select',
            filterValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          }
        ],
        resultsCount: 5,
        appliedFilters: []
      }
    };

    var htmlTmp = '<div pf-data-toolbar config="config"></div>';

    compileHTML(htmlTmp, $scope);
  });

  it('should have correct number of filter fields', function () {
    var fields = element.find('.filter-field');
    expect(fields.length).toBe(3);
  });

  it('should have correct number of results', function () {
    var results = element.find('h5');
    expect(results.length).toBe(1);
    expect(results.html()).toBe("5 Results");

    $scope.config.filterConfig.resultsCount = 10;

    $scope.$digest();

    results = element.find('h5');
    expect(results.length).toBe(1);
    expect(results.html()).toBe("10 Results");
  });

  it('should show active filters and clear filters button when there are filters', function () {
    var activeFilters = element.find('.active-filter');
    expect(activeFilters.length).toBe(0);
    expect(element.find('.clear-filters').length).toBe(0);

    $scope.config.filterConfig.appliedFilters = [
      {
        id: 'address',
        title: 'Address',
        value: 'New York'
      }
    ];

    $scope.$digest();
    activeFilters = element.find('.active-filter');
    expect(activeFilters.length).toBe(1);
    expect(element.find('.clear-filters').length).toBe(1);
  });

  it ('should add a dropdown select when a select type is chosen', function() {
    var pfSelects = element.find('.filter-select');
    var fields = element.find('.filter-field');

    expect(pfSelects.length).toBe(0);
    eventFire(fields[2], 'click');
    $scope.$digest();
    pfSelects = element.find('.filter-select');
    expect(pfSelects.length).toBe(2); // 2 because it is a directive

    var items = pfSelects.find('li');
    expect(items.length).toBe($scope.config.filterConfig.fields[2].filterValues.length + 1); // +1 for the null value
  });

  it ('should clear a filter when the close button is clicked', function () {
    var closeButtons;

    closeButtons = element.find('.pficon-close');
    expect(closeButtons.length).toBe(0);

    $scope.config.filterConfig.appliedFilters = [
      {
        id: 'address',
        title: 'Address',
        value: 'New York'
      }
    ];

    $scope.$digest();

    closeButtons = element.find('.pficon-close');
    expect(closeButtons.length).toBe(1);

    eventFire(closeButtons[0], 'click');
    $scope.$digest();
    expect(element.find('.pficon-close').length).toBe(0);
  });

  it ('should clear all filters when the clear all filters button is clicked', function () {
    var clearButtons = element.find('.clear-filters');
    var activeFilters = element.find('.active-filter');

    expect(activeFilters.length).toBe(0);
    expect(clearButtons.length).toBe(0);

    $scope.config.filterConfig.appliedFilters = [
      {
        id: 'address',
        title: 'Address',
        value: 'New York'
      }
    ];

    $scope.$digest();

    activeFilters = element.find('.active-filter');
    clearButtons = element.find('.clear-filters');

    expect(activeFilters.length).toBe(1);
    expect(clearButtons.length).toBe(1);

    eventFire(clearButtons[0], 'click');
    $scope.$digest();

    activeFilters = element.find('.active-filter');
    clearButtons = element.find('.clear-filters');
    expect(activeFilters.length).toBe(0);
    expect(clearButtons.length).toBe(0);
  });

  it ('should not show filters when a filter config is not supplied', function () {
    var filter = element.find('.simple-filter');
    expect(filter.length).toBe(2);

    $scope.config = {
      viewsConfig: {
        views: [$pfViewUtils.getListView(), $pfViewUtils.getTilesView()]
      }
    };

    var htmlTmp = '<div pf-data-toolbar config="config"></div>';

    compileHTML(htmlTmp, $scope);

    filter = element.find('.simple-filter');
    expect(filter.length).toBe(0);
  });

  it ('should show the correct view selection buttons', function () {
    var selectors = element.find('.view-selector');
    expect(selectors.length).toBe(5);

    expect(element.find('.fa-dashboard').length).toBe(1);
    expect(element.find('.fa-th').length).toBe(1);
    expect(element.find('.fa-th-list').length).toBe(1);
    expect(element.find('.fa-table').length).toBe(1);
    expect(element.find('.fa-sitemap').length).toBe(1);
  });

  it ('should show the currently selected view', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    var active = element.find('.active');

    expect(viewSelector.length).toBe(1);
    expect(active.length).toBe(0);

    $scope.config.viewsConfig.currentView = $scope.config.viewsConfig.views[0].id;
    $scope.$apply();

    active = element.find('.active');
    expect(active.length).toBe(1);
  });

  it ('should update the currently selected view when a view selector clicked', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    var active = element.find('.active');
    var listSelector = element.find('.fa-th-list');

    expect(viewSelector.length).toBe(1);
    expect(active.length).toBe(0);
    expect(listSelector.length).toBe(1);

    eventFire(listSelector[0], 'click');
    $scope.$apply();

    listSelector = element.find('.fa-th-list');
    active = element.find('.active');
    expect(active.length).toBe(1);
  });

  it ('should call the callback function when a view selector clicked', function () {
    var listSelector = element.find('.fa-th-list');
    var functionCalled = false;

    var onViewSelect = function () {
      functionCalled = true;
    };

    $scope.config.viewsConfig.onViewSelect = onViewSelect;
    expect(functionCalled).toBeFalsy();
    expect(listSelector.length).toBe(1);

    eventFire(listSelector[0], 'click');
    $scope.$apply();

    expect(functionCalled).toBeTruthy();
  });

  it ('should not show view selectors when no viewsConfig is supplied', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    expect(viewSelector.length).toBe(1);

    $scope.config.viewsConfig = undefined;
    $scope.$digest();

    viewSelector = element.find('.toolbar-pf-view-selector');
    expect(viewSelector.length).toBe(0);
  });

})
