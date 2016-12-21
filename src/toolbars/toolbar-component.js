angular.module('patternfly.toolbars').component('pfToolbar', {
  bindings: {
    config: '='
  },
  transclude: {
    'actions': '?'
  },
  templateUrl: 'toolbars/toolbar.html',
  controller: function ($scope) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        viewSelected: viewSelected,
        isViewSelected: isViewSelected,
        checkViewDisabled: checkViewDisabled,
        addFilter: addFilter,
        handleAction: handleAction
      });
    };

    ctrl.$postLink = function () {
      $scope.$watch('config', function () {
        if (ctrl.config && ctrl.config.viewsConfig && ctrl.config.viewsConfig.views) {
          ctrl.config.viewsConfig.viewsList = angular.copy(ctrl.config.viewsConfig.views);

          if (!ctrl.config.viewsConfig.currentView) {
            ctrl.config.viewsConfig.currentView = ctrl.config.viewsConfig.viewsList[0];
          }
        }
      }, true);
    };

    function viewSelected (viewId) {
      ctrl.config.viewsConfig.currentView = viewId;
      if (ctrl.config.viewsConfig.onViewSelect && !ctrl.checkViewDisabled(viewId)) {
        ctrl.config.viewsConfig.onViewSelect(viewId);
      }
    }

    function isViewSelected (viewId) {
      return ctrl.config.viewsConfig && (ctrl.config.viewsConfig.currentView === viewId);
    }

    function checkViewDisabled (view) {
      return ctrl.config.viewsConfig.checkViewDisabled && ctrl.config.viewsConfig.checkViewDisabled(view);
    }

    function filterExists (filter) {
      var foundFilter = _.find(ctrl.config.filterConfig.appliedFilters, {title: filter.title, value: filter.value});
      return foundFilter !== undefined;
    }

    function enforceSingleSelect (filter) {
      _.remove(ctrl.config.appliedFilters, {title: filter.title});
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
        ctrl.config.filterConfig.appliedFilters.push(newFilter);

        if (ctrl.config.filterConfig.onFilterChange) {
          ctrl.config.filterConfig.onFilterChange(ctrl.config.filterConfig.appliedFilters);
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
