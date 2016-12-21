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
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
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
  templateUrl: 'filters/filter-fields.html',
  controller: function ($scope) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        selectField: selectField,
        selectValue: selectValue,
        onValueKeyPress: onValueKeyPress
      });
    };

    ctrl.$postLink = function () {
      $scope.$watch('config', function () {
        setupConfig();
      }, true);
    };

    function selectField (item) {
      ctrl.currentField = item;
      ctrl.config.currentValue = null;
    }

    function selectValue (filterValue) {
      if (angular.isDefined(filterValue)) {
        ctrl.addFilterFn(scope.currentField, filterValue);
        ctrl.config.currentValue = null;
      }
    }

    function onValueKeyPress (keyEvent) {
      if (keyEvent.which === 13) {
        ctrl.addFilterFn(ctrl.currentField, ctrl.config.currentValue);
        ctrl.config.currentValue = undefined;
      }
    }

    function setupConfig () {
      if (ctrl.fields === undefined) {
        ctrl.fields = [];
      }
      if (!ctrl.currentField) {
        ctrl.currentField = ctrl.config.fields[0];
        ctrl.config.currentValue = null;
      }

      if (ctrl.config.currentValue === undefined) {
        ctrl.config.currentValue = null;
      }
    }
  }
});
