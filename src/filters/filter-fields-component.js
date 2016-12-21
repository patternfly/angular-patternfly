/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterFields
 * @restrict E
 *
 * @description
 *   Directive for the filter bar's filter entry components
 *   <br><br>
 *
 * @param {array} fields List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * @param {string} currentFieldId Id of the field to show for filter entry
 * @param {array} appliedFilters List of the currently applied filters
 *
 */
angular.module('patternfly.filters').component('pfFilterFields', {
  bindings: {
    fields: '<',
    currentFieldId: '@',
    appliedFilters: '<?',
    addFilterFn: '<'
  },
  templateUrl: 'filters/filter-fields.html',
  controller: function () {
    'use strict';

    var ctrl = this;

    if (angular.isUndefined(ctrl.currentFieldId)) {
      ctrl.currentFieldId = ctrl.fields[0].id;
    }

    if (angular.isUndefined(ctrl.appliedFilters)) {
      ctrl.appliedFilters = [];
    }

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        currentField: getCurrentField (),
        currentValue: null,
        selectField: selectField,
        selectValue: selectValue,
        onValueKeyPress: onValueKeyPress
      });
    };

    function getCurrentField () {
      var found = undefined;

      angular.forEach(ctrl.fields, function (nextField) {
        if (nextField.id === ctrl.currentFieldId) {
          found = nextField;
        }
      });

      return found;
    }

    function selectField (item) {
      ctrl.currentField = item;
      ctrl.currentFieldId = item.id;
      ctrl.currentValue = null;
    }

    function selectValue (filterValue) {
      if (angular.isDefined(filterValue)) {
        ctrl.addFilterFn(ctrl.currentField, filterValue);
        ctrl.currentValue = null;
      }
    }

    function onValueKeyPress (keyEvent) {
      if (keyEvent.which === 13) {
        ctrl.addFilterFn(ctrl.currentField, ctrl.currentValue);
        ctrl.currentValue = null;
      }
    }
  }
});
