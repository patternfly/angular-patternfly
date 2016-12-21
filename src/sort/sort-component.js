angular.module('patternfly.sort').component('pfSort', {
  bindings: {
    fields: '=',
    currentSortId: '<?',
    isAscending: '<?',
    onSortChange: '<?'

  },
  templateUrl: 'sort/sort.html',
  controller: function ($timeout) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {

      if (angular.isUndefined(ctrl.currentSortId)) {
        ctrl.currentSortId = ctrl.fields[0].id;
      }

      if (angular.isUndefined(ctrl.isAscending)) {
        ctrl.isAscending = true;
      }

      angular.extend(ctrl, {
        currentField: getCurrentField(),
        selectField: selectField,
        changeDirection: changeDirection,
        getSortIconClass: getSortIconClass
      });
    };

    function getCurrentField () {
      var found = undefined;

      angular.forEach(ctrl.fields, function (nextField) {
        if (nextField.id === ctrl.currentSortId) {
          found = nextField;
        }
      });

      return found;
    }

    function notifySortChange () {
      if (angular.isFunction(ctrl.onSortChange)) {
        ctrl.onSortChange(ctrl.currentSortId, ctrl.isAscending);
      }
    }

    function selectField (field) {
      ctrl.currentField = field;
      ctrl.currentSortId = field.id;

      notifySortChange();
    }

    function changeDirection () {
      ctrl.isAscending = !ctrl.isAscending;

      notifySortChange();
    }

    function getSortIconClass () {
      var iconClass;

      if (ctrl.currentField.sortType === 'numeric') {
        if (ctrl.isAscending) {
          iconClass = 'fa fa-sort-numeric-asc';
        } else {
          iconClass = 'fa fa-sort-numeric-desc';
        }
      } else {
        if (ctrl.isAscending) {
          iconClass = 'fa fa-sort-alpha-asc';
        } else {
          iconClass = 'fa fa-sort-alpha-desc';
        }
      }

      return iconClass;
    }
  }
});
