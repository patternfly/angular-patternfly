angular.module('patternfly.filters').component('pfFilter', {
  bindings: {
    fields: '=',
    appliedFilters: '<',
    resultsCount: '@',
    onFilterChange: '<'
  },
  templateUrl: 'filters/filter.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {

      if (angular.isUndefined(ctrl.appliedFilters)) {
        ctrl.appliedFilters = [];
      }

      if (angular.isUndefined(ctrl.resultsCount)) {
        ctrl.resultsCount = 0;
      }

      angular.extend(ctrl,
        {
          addFilter: addFilter,
          resultsFilterChange: resultsFilterChange
        }
      );
    };

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
        type: field.filterType,
        value: value
      };
      if (!filterExists(newFilter)) {

        if (newFilter.type === 'select') {
          enforceSingleSelect(newFilter);
        }

        ctrl.appliedFilters.push(newFilter);

        if (angular.isFunction(ctrl.onFilterChange)) {
          ctrl.onFilterChange(ctrl.appliedFilters);
        }
      }
    }

    function resultsFilterChange (filters) {
      ctrl.appliedFilters = filters;
      if (angular.isFunction(ctrl.onFilterChange)) {
        ctrl.onFilterChange(ctrl.appliedFilters);
      }
    }
  }
});
