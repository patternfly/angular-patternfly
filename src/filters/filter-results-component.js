/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterResults
 * @restrict E
 *
 * @description
 *   Component for the filter results
 *   <br><br>
 *
 * @param {Array} appliedFilters List of the currently applied filters
 * <ul style='list-style-type: none'>
 * <li>.title - (String) The title to display for the filter field
 * <li>.value - (String) value for the filter'
 * </ul>
 * @param {int} resultsCount The number of results returned after the current applied filters have been applied
 * @param {function} onFilterChange ( function(array of filters) ) Function to call when filters are removed
 *
 */
angular.module('patternfly.filters').component('pfFilterResults', {
  bindings: {
    appliedFilters: '<?',
    resultsCount: '@',
    onFilterChange: '<?'

  },
  templateUrl: 'filters/filter-results.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      if (!ctrl.appliedFilters) {
        ctrl.appliedFilters = [];
      }

      angular.extend(ctrl, {
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
      });
    };

    function clearFilter (item) {
      var newFilters = [];
      ctrl.appliedFilters.forEach(function (filter) {
        if (item.title !== filter.title || item.value !== filter.value) {
          newFilters.push(filter);
        }
      });
      ctrl.appliedFilters = newFilters;

      if (angular.isFunction(ctrl.onFilterChange)) {
        ctrl.onFilterChange(ctrl.appliedFilters);
      }
    }

    function clearAllFilters () {
      ctrl.appliedFilters = [];

      if (angular.isFunction(ctrl.onFilterChange)) {
        ctrl.onFilterChange(ctrl.appliedFilters);
      }
    }
  }
});
