/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterResults
 * @restrict E
 *
 * @description
 *   Component for the filter results
 *   <br><br>
 *
 * @param {object} config configuration settings for the filter results:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.onFilterChange - ( function(array of filters) ) Function to call when the applied filters list changes
 * </ul>
 *
 */
angular.module('patternfly.filters').component('pfFilterResults', {
  bindings: {
    config: '='
  },
  templateUrl: 'filters/filter-results.html',
  controller: function ($scope) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
      });
    };

    ctrl.$postLink = function () {
      $scope.$watch('config', function () {
        setupConfig();
      }, true);
    };

    function setupConfig () {
      if (!ctrl.config.appliedFilters) {
        ctrl.config.appliedFilters = [];
      }
      if (ctrl.config.resultsCount === undefined) {
        ctrl.config.resultsCount = 0;
      }
    }

    function clearFilter (item) {
      var newFilters = [];
      ctrl.config.appliedFilters.forEach(function (filter) {
        if (item.title !== filter.title || item.value !== filter.value) {
          newFilters.push(filter);
        }
      });
      ctrl.config.appliedFilters = newFilters;

      if (ctrl.config.onFilterChange) {
        ctrl.config.onFilterChange(ctrl.config.appliedFilters);
      }
    }

    function clearAllFilters () {
      ctrl.config.appliedFilters = [];

      if (ctrl.config.onFilterChange) {
        ctrl.config.onFilterChange(ctrl.config.appliedFilters);
      }
    }
  }
});
