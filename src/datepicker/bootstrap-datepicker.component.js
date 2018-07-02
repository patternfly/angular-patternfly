angular.module('patternfly.datepicker').component('pfBootstrapDatepicker', {
  bindings: {
    date: '<',
    format: '@?',
    dateOptions: '<?',
    isOpen: '<?',
    popupPlacement: '@?',
    onDateChange: '&'
  },
  templateUrl: 'datepicker/datepicker.html',
  controller: function () {
    'use strict';

    var ctrl = this, prevDate;

    ctrl.defaultDateOptions = {
      showWeeks : false,
      formatDay : "d"
    };
    ctrl.defaultIsOpen = false;

    ctrl.$onInit = function () {
      ctrl.format = "MM/dd/yyyy";
      ctrl.showButtonBar = true;
      ctrl.popupPlacement = "auto bottom-left";

      if (angular.isUndefined(ctrl.dateOptions)) {
        ctrl.dateOptions = {};
      }
      _.defaults(ctrl.dateOptions, ctrl.defaultDateOptions);
      _.defaults(ctrl.isOpen, ctrl.defaultIsOpen);
    };

    ctrl.$onChanges = function (changes) {
      prevDate = angular.copy(ctrl.date);
      _.defaults(ctrl.isOpen, ctrl.defaultIsOpen);
    };

    ctrl.$doCheck = function () {
      // do a deep compare on data
      if (!angular.equals(ctrl.date, prevDate)) {
        prevDate = angular.copy(ctrl.date);
        if (ctrl.onDateChange) {
          ctrl.onDateChange({newDate: ctrl.date});
        }
      }
    };
  }
});
