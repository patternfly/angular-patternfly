angular.module('patternfly.form').component('pfFormGroup', {

  bindings: {
    pfLabel: '@',
    pfField: '@',
    pfLabelClass: '@',
    pfInputClass: '@'

  },
  require: {
    form: '^form'
  },
  transclude: true,
  templateUrl: 'form/form-group/form-group.html',

  controller: function ($scope, $element) {
    'use strict';

    var ctrl = this;

    ctrl.$postLink = function () {
      var input;
      var type;

      if (!ctrl.pfLabelClass) {
        ctrl.pfLabelClass = 'col-sm-2';
      }

      if (!ctrl.pfInputClass) {
        ctrl.pfInputClass = 'col-sm-5';
      }

      input = getInput($element);
      type = input.attr('type');

      if (['checkbox', 'radio', 'time'].indexOf(type) === -1) {
        input.addClass('form-control');
      }

      if (!ctrl.pfField) {
        ctrl.pfField = input.attr('id');
      }

      if (input.attr('required')) {
        $element.addClass('required');
      }

      if (ctrl.form[ctrl.pfField]) {
        ctrl.error = ctrl.form[ctrl.pfField].$error;
      }
    };

    ctrl.hasErrors = function () {
      return ctrl.form[ctrl.pfField] && ctrl.form[ctrl.pfField].$invalid && ctrl.form[ctrl.pfField].$dirty;
    };

    function getInput (element) {
      // table is used for bootstrap3 date/time pickers
      var input = element.find('table');

      if (input.length === 0) {
        input = element.find('input');

        if (input.length === 0) {
          input = element.find('select');

          if (input.length === 0) {
            input = element.find('textarea');
          }
        }
      }
      return input;
    }
  }
});
