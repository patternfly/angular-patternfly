angular.module('patternfly.sort').component('pfSort', {
  bindings: {
    config: '='
  },
  templateUrl: 'sort/sort.html',
  controller: function ($scope) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      angular.extend(ctrl, {
        selectField: selectField,
        changeDirection: changeDirection,
        getSortIconClass: getSortIconClass
      });

      setupConfig();

    };

    ctrl.$postLink = function () {
      $scope.$watch('config', function () {
        setupConfig();
      }, true);
    };

    function setupConfig () {
      var updated = false;

      if (ctrl.config.fields === undefined) {
        ctrl.config.fields = [];
      }

      if (ctrl.config.fields.length > 0) {
        if (ctrl.config.currentField === undefined) {
          ctrl.config.currentField = ctrl.config.fields[0];
          updated = true;
        }
        if (ctrl.config.isAscending === undefined) {
          ctrl.config.isAscending = true;
          updated = true;
        }
      }

      if (updated === true && ctrl.config.onSortChange) {
        ctrl.config.onSortChange(ctrl.config.currentField, ctrl.config.isAscending);
      }
    }

    function selectField (field) {
      ctrl.config.currentField = field;

      if (ctrl.config.onSortChange) {
        ctrl.config.onSortChange(ctrl.config.currentField, ctrl.config.isAscending);
      }
    }

    function changeDirection () {
      ctrl.config.isAscending = !ctrl.config.isAscending;

      if (ctrl.config.onSortChange) {
        ctrl.config.onSortChange(ctrl.config.currentField, ctrl.config.isAscending);
      }
    }

    function getSortIconClass () {
      var iconClass;

      if (ctrl.config.currentField.sortType === 'numeric') {
        if (ctrl.config.isAscending) {
          iconClass = 'fa fa-sort-numeric-asc';
        } else {
          iconClass = 'fa fa-sort-numeric-desc';
        }
      } else {
        if (ctrl.config.isAscending) {
          iconClass = 'fa fa-sort-alpha-asc';
        } else {
          iconClass = 'fa fa-sort-alpha-desc';
        }
      }

      return iconClass;
    }
  }
});
