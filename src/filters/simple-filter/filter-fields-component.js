/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterFields
 * @restrict E
 *
 * @description
 *   Directive for the filter bar's filter entry components
 *   <br><br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterMultiselect - (Boolean) In `complex-select`, allow selection of multiple categories and values. Optional, default is `false`
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a single select box or 'complex-select' for a category select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select' or 'complex-select' (in where these values serve as case insensitve keys for .filterCategories objects)
 * <li>.filterCategories - (Array of (Objects)) For 'complex-select' only, array of objects whoes keys (case insensitive) match the .filterValues, these objects include each of the filter fields above (sans .placeholder)
 * <li>.filterCategoriesPlaceholder - (String) Text to display in `complex-select` category value select when no filter value has been entered, Optional
 * <li>.filterDelimiter - (String) Delimiter separating 'complex-select' category and value. Optional, default is a space, ' '
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * </ul>
 *
 */
angular.module('patternfly.filters').component('pfFilterFields', {
  bindings: {
    config: '=',
    addFilterFn: '<'
  },
  templateUrl: 'filters/simple-filter/filter-fields.html',
  controller: function () {
    'use strict';

    var ctrl = this;
    var prevConfig;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        selectField: selectField,
        selectValue: selectValue,
        onValueKeyPress: onValueKeyPress
      });
    };

    ctrl.$onChanges = function () {
      setupConfig ();
    };

    ctrl.$doCheck = function () {
      // do a deep compare on config
      if (!angular.equals(ctrl.config, prevConfig)) {
        setupConfig();
      }
    };

    function selectField (item) {
      ctrl.currentField = item;
      ctrl.currentField.filterDelimiter = ctrl.currentField.filterDelimiter || ' ';
      ctrl.currentValue = null;
    }

    function selectValue (filterValue, valueType) {
      if (angular.isDefined (filterValue)) {
        if (ctrl.currentField.filterType === 'complex-select') {
          switch (valueType) {
          case 'filter-category':
            ctrl.filterCategory = filterValue;
            ctrl.filterValue = null;
            break;
          case 'filter-value':
            ctrl.filterValue = filterValue;
            break;
          }
          if (ctrl.filterCategory && ctrl.filterValue) {
            ctrl.addFilterFn(ctrl.currentField, {
              filterCategory: ctrl.filterCategory,
              filterDelimiter: ctrl.currentField.filterDelimiter,
              filterValue: ctrl.filterValue
            });
          }
        } else {
          ctrl.addFilterFn(ctrl.currentField, filterValue);
          ctrl.currentValue = filterValue;
        }
      }
    }

    function onValueKeyPress (keyEvent) {
      if (keyEvent.which === 13 && ctrl.currentValue && ctrl.currentValue.length > 0) {
        ctrl.addFilterFn(ctrl.currentField, ctrl.currentValue);
        ctrl.currentValue = undefined;
        keyEvent.stopPropagation();
        keyEvent.preventDefault();
      }
    }

    function setupConfig () {
      var fieldFound = false;

      prevConfig = angular.copy(ctrl.config);

      if (ctrl.config.fields === undefined) {
        ctrl.config.fields = [];
      }

      if (ctrl.currentField) {
        fieldFound = _.find(ctrl.config.fields, function (nextField) {
          return nextField.id === ctrl.currentField.id;
        });
      }

      if (!fieldFound) {
        ctrl.currentField = ctrl.config.fields[0];
        ctrl.currentValue = null;
      }

      if (ctrl.currentValue === undefined) {
        ctrl.currentValue = null;
      }
    }
  }
});
