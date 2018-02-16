angular.module('patternfly.datepicker').component('pfBootstrapDatepicker', {
  bindings: {
    date: '<',
    format: '@?',
    dateOptions: '<?',
    isOpen: '<?',
    popupPlacement: '@?'
  },
  templateUrl: 'datepicker/datepicker.html',
  controller: function () {
    'use strict';

    var ctrl = this;

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
      _.defaults(ctrl.isOpen, ctrl.defaultIsOpen);
    };

  }
});
