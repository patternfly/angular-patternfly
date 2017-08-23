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

    function findDuplicateComplexSelect (item) {
      return item.value.filterCategory;
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

        if (field.filterType === 'complex-select' && !field.filterMultiselect) {
          _.remove(ctrl.config.appliedFilters, findDuplicateComplexSelect);
        }

        ctrl.config.appliedFilters.push(newFilter);

        if (ctrl.config.onFilterChange) {
          ctrl.config.onFilterChange(ctrl.config.appliedFilters);
        }
      }
    }
  }
});
