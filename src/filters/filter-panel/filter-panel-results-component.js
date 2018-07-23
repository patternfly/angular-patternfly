/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterPanelResults
 * @restrict E
 *
 * @description
 *   Component for the filter panel results
 *   <br><br>
 *
 * @param {object} config configuration settings for the filter panel results:<br/>
 * <ul style='list-style-type: none'>
 * <li>.appliedFilters - (Array) List of the currently applied filters. Used to render the filter results tags and returned
 * in the <code>onFilterChange</code> function where it can be used to filter a set of items.
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Id for the filter, useful for comparisons
 * <li>.title       - (String) The title to display for the filter results tag
 * <li>.values      - (Array) The value(s) to display for the filter results tag. Ie. [title: [value1 x] [value2 x]]
 * </ul>
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.totalCount     - (int) The total number of items before any filters have been applied. The 'm' in the label: 'n' of 'm'
 * <li>.resultsLabel   - (String) Optional label for the result units.  Default is "Results".  Ex: "'n' of 'm' Results"
 * <li>.onFilterChange - ( function(appliedFilters, changedFilterId, changedFilterValue) ) Function to call when the applied
 * filters list changes.  Triggered by user clicking on 'x' or 'Clear All Filters' in the filter result tags.
 * <code>changedFilterId</code> and <code>changedFilterValue</code> are returned after user clicks on an 'x' in a tag to
 * denote which filter and filter value was cleared.  <code>changedFilterId</code> and <code>changedFilterValue</code> are
 * not returned when 'Clear All Filters' link is clicked.
 * </ul>
 *
 */
angular.module('patternfly.filters').component('pfFilterPanelResults', {
  bindings: {
    config: '='
  },
  templateUrl: 'filters/filter-panel/filter-panel-results.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
      });
    };

    ctrl.$onChanges = function () {
      setupConfig ();
    };

    function setupConfig () {
      if (!ctrl.config.appliedFilters) {
        ctrl.config.appliedFilters = [];
      }
      if (ctrl.config.resultsCount === undefined) {
        ctrl.config.resultsCount = 0;
      }
    }

    function clearFilter (evt, filter, value) {
      var changedFilterId = filter.id;
      evt.preventDefault();

      _.pull(filter.values, value);

      if (filter.values.length === 0) {
        _.pull(ctrl.config.appliedFilters, filter);
      }

      if (ctrl.config.onFilterChange) {
        ctrl.config.onFilterChange(ctrl.config.appliedFilters, changedFilterId, value);
      }
    }

    function clearAllFilters (evt) {
      evt.preventDefault();

      ctrl.config.appliedFilters = [];

      if (ctrl.config.onFilterChange) {
        ctrl.config.onFilterChange(ctrl.config.appliedFilters);
      }
    }
  }
});
