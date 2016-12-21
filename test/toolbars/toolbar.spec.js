describe('Directive:  pfToolbar', function () {
  var $scope;
  var $compile;
  var element;
  var $pfViewUtils;
  var performedAction;
  var htmlTmp;
  var sortChangeNotify = false;
  var sortChosenField;
  var sortChosenDir;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.toolbars', 'patternfly.views', 'patternfly.filters', 'toolbars/toolbar.html',
      'filters/filter.html', 'filters/filter-fields.html', 'filters/filter-results.html',
      'sort/sort.html');
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

    performedAction = undefined;
    var performAction = function (action) {
      performedAction = action;
    };

    $scope.contentViews = [$pfViewUtils.getDashboardView(), $pfViewUtils.getListView(), $pfViewUtils.getCardView(), $pfViewUtils.getTableView(), $pfViewUtils.getTopologyView()];
    $scope.sortFields = [
      {
        id: 'name',
        title:  'Name',
        sortType: 'alpha'
      },
      {
        id: 'age',
        title:  'Age',
        sortType: 'numeric'
      },
      {
        id: 'address',
        title:  'Address',
        sortType: 'alpha'
      }
    ];
    $scope.filterFields = [
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
    ];
    $scope.resultsCount = 5;
    $scope.appliedFilters = [];
    $scope.primaryActions = [
      {
        name: 'Action 1',
        title: 'Do the first thing',
        actionFn: performAction
      },
      {
        name: 'Action 2',
        title: 'Do something else',
        actionFn: performAction
      }
    ];
    $scope.moreActions = [
      {
        name: 'Action',
        title: 'Perform an action',
        actionFn: performAction
      },
      {
        name: 'Another Action',
        title: 'Do something else',
        actionFn: performAction
      },
      {
        name: 'Disabled Action',
        title: 'Unavailable action',
        actionFn: performAction,
        isDisabled: true
      },
      {
        name: 'Something Else',
        title: '',
        actionFn: performAction
      },
      {
        isSeparator: true
      },
      {
        name: 'Grouped Action 1',
        title: 'Do something',
        actionFn: performAction
      },
      {
        name: 'Grouped Action 2',
        title: 'Do something similar',
        actionFn: performAction
      }
    ];

    $scope.onSortChange = function (sortField, isAscending) {
      sortChangeNotify = true;
      sortChosenField = sortField;
      sortChosenDir = isAscending;
    };


    $scope.currentView = $scope.contentViews[0].id;
    $scope.onViewSelect = function(viewId) {
      $scope.currentView = viewId;
    };
/*
    <pf-toolbar id="exampleToolbar"
    filter-fields="filterFields"
    applied-filters="appliedFilters"
    results-count="{{resultsCount}}"
    on-filter-change="onFilterChange"
    sort-fields="sortFields"
    current-sort-field="currentSortId"
    is-sort-ascending="sortAscending"
    on-sort-change="onSortChange"
    views="views"
    current-view="currentView"
    on-view-select="onViewSelect"
    primary-actions="primaryActions"
    more-actions="moreActions"
    actions-include="actionsInclude">

*/

    htmlTmp = '' +
      '<pf-toolbar filter-fields="filterFields"' +
      '            applied-filters="appliedFilters"' +
      '            results-count="{{resultsCount}}"' +
      '            sort-fields="sortFields"' +
      '            on-sort-change="onSortChange"' +
      '            views="contentViews"' +
      '            current-view="currentView"' +
      '            on-view-select="onViewSelect"' +
      '            primary-actions="primaryActions"' +
      '            more-actions="moreActions"' +
      '            actions-include="actionsInclude"' +
      '</pf-toolbar>';

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

    $scope.resultsCount = 10;

    $scope.$digest();

    results = element.find('h5');
    expect(results.length).toBe(1);
    expect(results.html()).toBe("10 Results");
  });

  it('should show active filters and clear filters button when there are filters', function () {
    var activeFilters = element.find('.active-filter');
    expect(activeFilters.length).toBe(0);
    expect(element.find('.clear-filters').length).toBe(0);

    $scope.appliedFilters = [
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
    var filterSelect = element.find('.filter-select');
    var fields = element.find('.filter-field');

    expect(filterSelect.length).toBe(0);
    expect(fields.length).toBe(3);

    eventFire(fields[2], 'click');
    $scope.$digest();

    filterSelect = element.find('.filter-select');
    expect(filterSelect.length).toBe(1);

    var items = filterSelect.find('li');
    expect(items.length).toBe($scope.filterFields[2].filterValues.length + 1); // +1 for the null value
  });

  it ('should clear a filter when the close button is clicked', function () {
    var closeButtons;

    closeButtons = element.find('.pficon-close');
    expect(closeButtons.length).toBe(0);

    $scope.appliedFilters = [
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

    $scope.appliedFilters = [
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

  it ('should not show filters when filter fields are not supplied', function () {
    var filter = element.find('.filter-pf');
    expect(filter.length).toBe(2);

    $scope.filterFields = undefined;
    $scope.$digest();

    filter = element.find('.filter-pf');
    expect(filter.length).toBe(0);
  });

  it ('should show the correct view selection buttons', function () {
    var selectors = element.find('.toolbar-pf-view-selector .btn-link');
    expect(selectors.length).toBe(5);

    expect(element.find('.fa-dashboard').length).toBe(1);
    expect(element.find('.fa-th').length).toBe(1);
    expect(element.find('.fa-th-list').length).toBe(1);
    expect(element.find('.fa-table').length).toBe(1);
    expect(element.find('.fa-sitemap').length).toBe(1);
  });

  it ('should show the currently selected view', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    var activeDashboard = element.find('.active .fa.fa-dashboard');
    var activeList = element.find('.active .fa.fa-th-list');

    expect(viewSelector.length).toBe(1);
    expect(activeDashboard.length).toBe(1);
    expect(activeList.length).toBe(0);

    $scope.currentView = $scope.contentViews[1].id;
    $scope.$apply();

    activeDashboard = element.find('.active .fa.fa-dashboard');
    activeList = element.find('.active .fa.fa-th-list');

    expect(activeDashboard.length).toBe(0);
    expect(activeList.length).toBe(1);
  });

  it ('should update the currently selected view when a view selector clicked', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    var activeDashboard = element.find('.active .fa.fa-dashboard');
    var activeList = element.find('.active .fa.fa-th-list');
    var listSelector = element.find('.toolbar-pf-view-selector .btn-link');

    expect(viewSelector.length).toBe(1);
    expect(activeDashboard.length).toBe(1);
    expect(activeList.length).toBe(0);
    expect(listSelector.length).toBe(5);

    eventFire(listSelector[1], 'click');
    $scope.$apply();

    activeDashboard = element.find('.active .fa.fa-dashboard');
    activeList = element.find('.active .fa.fa-th-list');

    expect(activeDashboard.length).toBe(0);
    expect(activeList.length).toBe(1);
  });

  it ('should not show view selectors when no viewsConfig is supplied', function () {
    var viewSelector = element.find('.toolbar-pf-view-selector');
    expect(viewSelector.length).toBe(1);

    $scope.contentViews = undefined;
    $scope.$apply();

    viewSelector = element.find('.toolbar-pf-view-selector');
    expect(viewSelector.length).toBe(0);
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
    expect(results.html().trim().slice(0,'Address'.length)).toBe("Address");
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
    expect(results.html().trim().slice(0,'Age'.length)).toBe("Age");
    expect(sortIcon.length).toBe(1);

  });

  it('should reverse the sort direction when the direction button is clicked', function () {
    var sortIcon = element.find('.sort-pf .fa-sort-alpha-asc');
    var sortButton = element.find('.sort-pf .btn.btn-link');
    expect(sortIcon.length).toBe(1);
    expect(sortButton.length).toBe(1);

    eventFire(sortButton[0], 'click');
    $scope.$digest();

    sortIcon = element.find('.sort-pf .fa-sort-alpha-desc');
    expect(sortIcon.length).toBe(1);
  });

  it ('should notify when a new sort field is chosen', function() {
    var fields = element.find('.sort-pf .sort-field');

    expect(fields.length).toBe(3);

    eventFire(fields[2], 'click');
    $scope.$digest();

    expect(sortChangeNotify).toBeTruthy();
    expect(sortChosenField).toBe($scope.sortFields[2].id);
    expect(sortChosenDir).toBeTruthy();
  });

  it ('should notify when the sort direction changes', function() {
    var sortButton = element.find('.sort-pf .btn.btn-link');
    expect(sortButton.length).toBe(1);

    eventFire(sortButton[0], 'click');
    $scope.$digest();

    expect(sortChangeNotify).toBeTruthy();
    expect(sortChosenField).toBe($scope.sortFields[0].id);
    expect(sortChosenDir).toBeFalsy();
  });

  it ('should not show sort components when sort fields are not supplied', function () {
    var filter = element.find('.sort-pf');
    expect(filter.length).toBe(1);

    $scope.sortFields = undefined;
    $scope.$digest();

    compileHTML(htmlTmp, $scope);

    filter = element.find('.sort-pf');
    expect(filter.length).toBe(0);
  });

  it('should have correct number of primary actions', function () {
    var fields = element.find('.toolbar-pf-actions .primary-action');
    expect(fields.length).toBe(2);
  });

  it('should have correct number of secondary actions', function () {
    var fields = element.find('.toolbar-pf-actions .secondary-action');
    expect(fields.length).toBe(6);
  });

  it('should have correct number of separators', function () {
    var fields = element.find('.toolbar-pf-actions .divider');
    expect(fields.length).toBe(1);
  });

  it('should correctly disable actions', function () {
    var fields = element.find('.toolbar-pf-actions .disabled');
    expect(fields.length).toBe(1);
  });

  it('should not show more actions menu when there are no more actions', function () {
    var menus = element.find('.fa-ellipsis-v');
    expect(menus.length).toBe(1);

    $scope.moreActions = undefined;
    $scope.$digest();

    menus = element.find('.toolbar-pf-actions .fa-ellipsis-v');
    expect(menus.length).toBe(0);
  });

  it('should call the action function with the appropriate action when an action is clicked', function () {
    var primaryActions = element.find('.toolbar-pf-actions .primary-action');
    var moreActions = element.find('.toolbar-pf-actions .secondary-action');
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    eventFire(primaryActions[0], 'click');
    $scope.$digest();

    expect(performedAction.name).toBe('Action 1');

    eventFire(moreActions[3], 'click');
    $scope.$digest();

    expect(performedAction.name).toBe('Something Else');
  });

  it('should not call the action function when a disabled action is clicked', function () {
    var primaryActions = element.find('.toolbar-pf-actions .primary-action');
    var moreActions = element.find('.toolbar-pf-actions .secondary-action');
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    eventFire(moreActions[2], 'click');
    $scope.$digest();

    expect(performedAction).toBe(undefined);

    eventFire(primaryActions[1], 'click');
    $scope.$digest();

    expect(performedAction.name).toBe('Action 2');

    performedAction = undefined;
    $scope.primaryActions[1].isDisabled = true;
    $scope.$digest();

    eventFire(primaryActions[1], 'click');
    $scope.$digest();

    expect(performedAction).toBe(undefined);
  });

  it ('should not show action components when actions not supplied', function () {
    var filter = element.find('.toolbar-actions');
    expect(filter.length).toBe(1);

    $scope.primaryActions = undefined;
    $scope.moreActions = undefined;

    $scope.$digest();

    filter = element.find('.toolbar-actions');
    expect(filter.length).toBe(0);
  });

  it ('should add custom actions in the correct location', function () {
    var actionBar = element.find('.toolbar-actions');
    expect(actionBar.length).toBe(1);

    var includeActions = actionBar.find('.toolbar-pf-include-actions');
    expect(includeActions.length).toBe(0);

    $scope.actionsInclude = true;
    var htmlTmp = '' +
      '<pf-toolbar filter-fields="filterFields"' +
      '            applied-filters="appliedFilters"' +
      '            results-count="{{resultsCount}}"' +
      '            sort-fields="sortFields"' +
      '            on-sort-change="onSortChange"' +
      '            views="contentViews"' +
      '            current-view="currentView"' +
      '            on-view-select="onViewSelect"' +
      '            primary-actions="primaryActions"' +
      '            more-actions="moreActions"' +
      '            actions-include="actionsInclude"' +
      '  <actions><button class="btn btn-default add-action" type="button">Add Action</button></actions>' +
      '</pf-toolbar>';

    compileHTML(htmlTmp, $scope);

    $scope.$digest();

    actionBar = element.find('.toolbar-actions');
    expect(actionBar.length).toBe(1);

    includeActions = actionBar.find('.toolbar-pf-include-actions');
    expect(includeActions.length).toBe(1);

    var addAction = includeActions.find('.add-action');
    expect(addAction.length).toBe(1);
  });
});
