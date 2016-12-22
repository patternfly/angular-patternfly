/**
 * @ngdoc directive
 * @name patternfly.wizard.component:pfWizardReviewPage
 * @restrict E
 *
 * @description
 * Component for rendering a Wizard Review Page - should only be used within a wizard.
 *
 * @param {boolean} shown Value watched internally by the wizard review page to know when it is visible.
 * @param {object} wizardData  Sets the internal content of the review page to apply wizard data to the review templates.
 *
 */
angular.module('patternfly.wizard').component('pfWizardReviewPage', {
  bindings: {
    shown: '<',
    wizardData: "<"
  },
  require: {
    wizard: '^pfWizard'
  },
  templateUrl: 'wizard/wizard-review-page.html',
  controller: function () {
    'use strict';
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.reviewSteps = [];
    };

    ctrl.$onChanges = function (changesObj) {
      if (changesObj.shown) {
        if (changesObj.shown.currentValue) {
          ctrl.updateReviewSteps();
        }
      }
    };

    ctrl.toggleShowReviewDetails = function (step) {
      if (step.showReviewDetails === true) {
        step.showReviewDetails = false;
      } else {
        step.showReviewDetails = true;
      }
    };

    ctrl.getSubStepNumber = function (step, substep) {
      return step.getStepDisplayNumber(substep);
    };

    ctrl.getReviewSubSteps = function (reviewStep) {
      return reviewStep.getReviewSteps();
    };

    ctrl.updateReviewSteps = function () {
      ctrl.reviewSteps = ctrl.wizard.getReviewSteps();
    };
  }
});
