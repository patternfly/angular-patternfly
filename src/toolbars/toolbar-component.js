angular.module('patternfly.toolbars').component('pfToolbar', {
  bindings: {
    filterFields: '<?',
    appliedFilters: '<?',
    resultsCount: '@',
    onFilterChange: '<?',
    sortFields: '<?',
    currentSortField: '<?',
    isSortAscending: '<?',
    onSortChange: '<?',
    views: '<?',
    currentView: '<?',
    checkViewDisabled: '<?',
    onViewSelect: '<?',
    primaryActions: '<?',
    moreActions: '<?',
    actionsInclude: '<?'
  },
  transclude: {
    'actions': '?'
  },
  templateUrl: 'toolbars/toolbar.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {

      if (angular.isArray(ctrl.views) && angular.isUndefined(ctrl.currentView)) {
        ctrl.currentView = ctrl.views[0].id;
      }

      if (angular.isUndefined(ctrl.actionsInclude) || ctrl.actionsInclude !== true) {
        ctrl.actionsInclude = false;
      }

      angular.extend(ctrl, {
        showFilters: angular.isArray(ctrl.filterFields) && ctrl.filterFields.length > 0,
        showSort: angular.isArray(ctrl.sortFields) && ctrl.sortFields.length > 0,
        showPrimaryActions: angular.isArray(ctrl.primaryActions) && ctrl.primaryActions.length > 0,
        showMoreActions: angular.isArray(ctrl.moreActions) && ctrl.moreActions.length > 0,
        showViews: angular.isArray(ctrl.views) && ctrl.views.length > 0,
        viewSelected: viewSelected,
        isViewSelected: isViewSelected,
        isViewDisabled: isViewDisabled,
        addFilter: addFilter,
        handleAction: handleAction
      });
    };

    ctrl.$onChanges = function (changes) {
      var filterFieldsChange = changes.filterFields;
      var sortFieldsChange = changes.sortFields;
      var primayActionsChange = changes.primaryActions;
      var moreActionsChange = changes.moreActions;
      var viewsChange = changes.views;

      if (filterFieldsChange && !filterFieldsChange.isFirstChange()) {
        ctrl.showFilters = angular.isArray(ctrl.filterFields) && ctrl.filterFields.length > 0;
      }

      if (sortFieldsChange && !sortFieldsChange.isFirstChange()) {
        ctrl.showSort = angular.isArray(ctrl.sortFields) && ctrl.sortFields.length > 0;
      }

      if (primayActionsChange && !primayActionsChange.isFirstChange()) {
        ctrl.showPrimaryActions = angular.isArray(ctrl.primaryActions) && ctrl.primaryActions.length > 0;
      }

      if (moreActionsChange && !moreActionsChange.isFirstChange()) {
        ctrl.showMoreActions = angular.isArray(moreActionsChange.currentValue) && moreActionsChange.currentValue.length > 0;
      }

      if (viewsChange && !viewsChange.isFirstChange()) {
        ctrl.showViews = angular.isArray(ctrl.views) && ctrl.views.length > 0;
      }
    };

    function viewSelected (viewId) {
      if (!ctrl.isViewDisabled(viewId)) {
        if (angular.isFunction(ctrl.onViewSelect)) {
          ctrl.onViewSelect(viewId);
        }
      }
    }

    function isViewSelected (viewId) {
      return ctrl.currentView === viewId;
    }

    function isViewDisabled (view) {
      var disabled = false;
      if (angular.isFunction(ctrl.checkViewDisabled)) {
        disabled = ctrl.checkViewDisabled(view);
      }

      return disabled;
    }

    function filterExists (filter) {
      var foundFilter = _.find(ctrl.appliedFilters, {title: filter.title, value: filter.value});
      return foundFilter !== undefined;
    }

    function enforceSingleSelect (filter) {
      _.remove(ctrl.appliedFilters, {title: filter.title});
    }

    function addFilter (field, value) {
      var newFilter = {
        id: field.id,
        title: field.title,
        value: value
      };
      if (!filterExists(newFilter)) {
        if (newFilter.type === 'select') {
          enforceSingleSelect(newFilter);
        }
        ctrl.appliedFilters.push(newFilter);

        if (ctrl.onFilterChange) {
          ctrl.onFilterChange(ctrl.appliedFilters);
        }
      }
    }

    function handleAction (action) {
      if (action && action.actionFn && (action.isDisabled !== true)) {
        action.actionFn(action);
      }
    }
  }
});
