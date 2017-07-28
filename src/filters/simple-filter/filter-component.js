angular.module('patternfly.filters').component('pfFilter', {
  bindings: {
    config: '='
  },
  templateUrl: 'filters/simple-filter/filter.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {

      angular.extend(ctrl,
        {
          addFilter: addFilter
        }
      );
    };

    function filterExists (filter) {
      return angular.isDefined(_.find(ctrl.config.appliedFilters, {title: filter.title, value: filter.value}));
    }

    function findDuplicateCategory (field, value) {
      var duplicateValue;

      function searchAppliedFilters (item) {
        return _.includes(item.value, _.split(value, field.filterDelimiter, 1)) ? duplicateValue = item : null;
      }

      return _.some(ctrl.config.appliedFilters, searchAppliedFilters) ? duplicateValue : null;
    }

    function enforceSingleSelect (filter) {
      _.remove(ctrl.config.appliedFilters, {title: filter.title});
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

        if (field.filterType === 'complex-select' && !field.filterMultiselect && findDuplicateCategory(field, value)) {
          _.remove(ctrl.config.appliedFilters, findDuplicateCategory(field, value));
        }

        ctrl.config.appliedFilters.push(newFilter);

        if (ctrl.config.onFilterChange) {
          ctrl.config.onFilterChange(ctrl.config.appliedFilters);
        }
      }
    }
  }
});
