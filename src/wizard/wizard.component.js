angular.module('patternfly.wizard').component('pfWizard', {
  transclude: true,
  bindings: {
    title: '@',
    wizardTitle: '@',
    hideIndicators: '=?',
    activeStepTitleOnly: '<?',
    hideSidebar: '@',
    hideHeader: '@',
    hideBackButton: '@',
    sidebarClass: '@',
    stepClass: '@',
    contentHeight: '=?',
    currentStep: '<?',
    cancelTitle: '=?',
    backTitle: '=?',
    nextTitle: '=?',
    backCallback: '=?',
    nextCallback: '=?',
    onFinish: '&',
    onCancel: '&',
    wizardReady: '=?',
    wizardDone: '=?',
    loadingWizardTitle: '=?',
    loadingSecondaryInformation: '=?',
    embedInPage: '=?',
    onStepChanged: '&?'
  },
  templateUrl: 'wizard/wizard.html',
  controller: function ($timeout, $scope) {
    'use strict';
    var ctrl = this,
      firstRun;

    var stepIdx = function (step) {
      var idx = 0;
      var res = -1;
      angular.forEach(ctrl.getEnabledSteps(), function (currStep) {
        if (currStep === step) {
          res = idx;
        }
        idx++;
      });
      return res;
    };

    var unselectAll = function () {
      //traverse steps array and set each "selected" property to false
      angular.forEach(ctrl.getEnabledSteps(), function (step) {
        step.selected = false;
      });
      //set selectedStep variable to null
      ctrl.selectedStep = null;
    };

    var stepByTitle = function (titleToFind) {
      var foundStep = null;
      angular.forEach(ctrl.getEnabledSteps(), function (step) {
        if (step.title === titleToFind) {
          foundStep = step;
        }
      });
      return foundStep;
    };

    ctrl.$onInit = function () {
      firstRun = true;
      ctrl.steps = [];
      ctrl.context = {};
      ctrl.hideHeader = ctrl.hideHeader === 'true';
      ctrl.hideSidebar = ctrl.hideSidebar === 'true';
      ctrl.hideBackButton = ctrl.hideBackButton === 'true';
      ctrl.activeStepTitleOnly = ctrl.activeStepTitleOnly === true;

      // Use the wizardTitle first, if non-existent use the deprecated title parameter
      ctrl.wizardTitle = ctrl.wizardTitle || ctrl.title;

      // If a step class is given use it for all steps
      if (angular.isDefined(ctrl.stepClass)) {

        // If a sidebarClass is given, us it for sidebar panel, if not, apply the stepsClass to the sidebar panel
        if (angular.isUndefined(ctrl.sidebarClass)) {
          ctrl.sidebarClass = ctrl.stepClass;
        }
      } else {
        // No step class give, setup the content style to allow scrolling and a fixed height
        if (angular.isUndefined(ctrl.contentHeight)) {
          ctrl.contentHeight = '300px';
        }
        ctrl.contentStyle = {
          'height': ctrl.contentHeight,
          'max-height': ctrl.contentHeight,
          'overflow-y': 'auto'
        };
      }

      if (angular.isUndefined(ctrl.wizardReady)) {
        ctrl.wizardReady = true;
      }

      if (!ctrl.cancelTitle) {
        ctrl.cancelTitle = "Cancel";
      }
      if (!ctrl.backTitle) {
        ctrl.backTitle = "< Back";
      }
      if (!ctrl.nextTitle) {
        ctrl.nextTitle = "Next >";
      }
    };

    ctrl.$onChanges = function (changesObj) {
      var step;

      if (changesObj.hideHeader) {
        ctrl.hideHeader = ctrl.hideHeader === 'true';
      }

      if (changesObj.hideSidebar) {
        ctrl.hideSidebar = ctrl.hideSidebar === 'true';
      }

      if (changesObj.hideBackButton) {
        ctrl.hideBackButton = ctrl.hideBackButton === 'true';
      }

      if (changesObj.wizardReady && changesObj.wizardReady.currentValue) {
        ctrl.goTo(ctrl.getEnabledSteps()[0]);
      }

      if (changesObj.currentStep) {
        //checking to make sure currentStep is truthy value
        step = changesObj.currentStep.currentValue;
        if (!step) {
          return;
        }

        //setting stepTitle equal to current step title or default title
        if (ctrl.selectedStep && ctrl.selectedStep.title !== step) {
          ctrl.goTo(stepByTitle(step));
        }
      }
    };

    ctrl.getEnabledSteps = function () {
      return ctrl.steps.filter(function (step) {
        return step.disabled !== 'true';
      });
    };

    ctrl.getReviewSteps = function () {
      return ctrl.steps.filter(function (step) {
        return !step.disabled &&
          (!angular.isUndefined(step.reviewTemplate) || step.getReviewSteps().length > 0);
      });
    };

    ctrl.currentStepNumber = function () {
      //retrieve current step number
      return stepIdx(ctrl.selectedStep) + 1;
    };

    ctrl.getStepNumber = function (step) {
      return stepIdx(step) + 1;
    };

    ctrl.goTo = function (step, resetStepNav) {
      if (ctrl.wizardDone || (ctrl.selectedStep && !ctrl.selectedStep.okToNavAway) || step === ctrl.selectedStep) {
        return;
      }

      if (firstRun || (ctrl.getStepNumber(step) < ctrl.currentStepNumber() && ctrl.selectedStep.isPrevEnabled()) || ctrl.selectedStep.isNextEnabled()) {
        unselectAll();

        if (!firstRun && resetStepNav && step.substeps) {
          step.resetNav();
        }

        ctrl.selectedStep = step;
        step.selected = true;

        $timeout(function () {
          if (angular.isFunction(step.onShow)) {
            step.onShow();
          }
        }, 100);

        // Make sure current step is not undefined
        ctrl.currentStep = step.title;

        ctrl.nextTooltip = step.nextTooltip;
        ctrl.prevTooltip = step.prevTooltip;

        //emit event upwards with data on goTo() invocation
        if (!step.substeps) {
          ctrl.setPageSelected(step);
        }
        firstRun = false;
      }

      if (!ctrl.selectedStep.substeps) {
        ctrl.firstStep =  stepIdx(ctrl.selectedStep) === 0;
      } else {
        ctrl.firstStep = stepIdx(ctrl.selectedStep) === 0 && ctrl.selectedStep.currentStepNumber() === 1;
      }
    };

    ctrl.allowStepIndicatorClick = function (step) {
      return step.allowClickNav &&
        !ctrl.wizardDone &&
        ctrl.selectedStep.okToNavAway &&
        (ctrl.selectedStep.nextEnabled || (step.stepPriority < ctrl.selectedStep.stepPriority)) &&
        (ctrl.selectedStep.prevEnabled || (step.stepPriority > ctrl.selectedStep.stepPriority));
    };

    ctrl.stepClick = function (step) {
      if (step.allowClickNav &&
        !ctrl.wizardDone &&
        ctrl.selectedStep.okToNavAway &&
        (ctrl.selectedStep.nextEnabled || (step.stepPriority < ctrl.selectedStep.stepPriority)) &&
        (ctrl.selectedStep.prevEnabled || (step.stepPriority > ctrl.selectedStep.stepPriority))) {
        ctrl.goTo(step, true);
      }
    };

    ctrl.setPageSelected = function (step) {
      if (angular.isFunction(ctrl.onStepChanged)) {
        ctrl.onStepChanged({step: step, index: stepIdx(step)});
      }
    };

    ctrl.addStep = function (step) {
      // Insert the step into step array
      var insertBefore = _.find(ctrl.steps, function (nextStep) {
        return nextStep.stepPriority > step.stepPriority;
      });
      if (insertBefore) {
        ctrl.steps.splice(ctrl.steps.indexOf(insertBefore), 0, step);
      } else {
        ctrl.steps.push(step);
      }

      if (ctrl.wizardReady && (ctrl.getEnabledSteps().length > 0) && (step === ctrl.getEnabledSteps()[0])) {
        ctrl.goTo(ctrl.getEnabledSteps()[0]);
      }
    };

    ctrl.isWizardDone = function () {
      return ctrl.wizardDone;
    };

    ctrl.updateSubStepNumber = function (value) {
      ctrl.firstStep =  stepIdx(ctrl.selectedStep) === 0 && value === 0;
    };

    ctrl.currentStepTitle = function () {
      return ctrl.selectedStep.title;
    };

    ctrl.currentStepDescription = function () {
      return ctrl.selectedStep.description;
    };

    ctrl.currentStep = function () {
      return ctrl.selectedStep;
    };

    ctrl.totalStepCount = function () {
      return ctrl.getEnabledSteps().length;
    };

    // Allow access to any step
    ctrl.goToStep = function (step, resetStepNav) {
      var enabledSteps = ctrl.getEnabledSteps();
      var stepTo;

      if (angular.isNumber(step)) {
        stepTo = enabledSteps[step];
      } else {
        stepTo = stepByTitle(step);
      }

      ctrl.goTo(stepTo, resetStepNav);
    };

    // Method used for next button within step
    ctrl.next = function (callback) {
      var enabledSteps = ctrl.getEnabledSteps();

      // Save the step  you were on when next() was invoked
      var index = stepIdx(ctrl.selectedStep);

      callback = callback || ctrl.nextCallback;

      if (ctrl.selectedStep.substeps) {
        if (ctrl.selectedStep.next(callback)) {
          return;
        }
      }

      // Check if callback is a function
      if (angular.isFunction(callback)) {
        if (callback(ctrl.selectedStep)) {
          if (index < enabledSteps.length - 1) {
            // Go to the next step
            if (enabledSteps[index + 1].substeps) {
              enabledSteps[index + 1].resetNav();
            }
          } else {
            ctrl.finish();
          }
        } else {
          return;
        }
      }

      // Completed property set on ctrl which is used to add class/remove class from progress bar
      ctrl.selectedStep.completed = true;

      // Check to see if this is the last step.  If it is next behaves the same as finish()
      if (index === enabledSteps.length - 1) {
        ctrl.finish();
      } else {
        // Go to the next step
        ctrl.goTo(enabledSteps[index + 1]);
      }
    };

    ctrl.previous = function (callback) {
      var index = stepIdx(ctrl.selectedStep);
      callback = callback || ctrl.backCallback;

      if (ctrl.selectedStep.substeps) {
        if (ctrl.selectedStep.previous(callback)) {
          return;
        }
      }

      // Check if callback is a function
      if (!angular.isFunction(callback) || callback(ctrl.selectedStep)) {

        if (index === 0) {
          throw new Error("Can't go back. It's already in step 0");
        } else {
          ctrl.goTo(ctrl.getEnabledSteps()[index - 1]);
        }
      }
    };

    ctrl.finish = function () {
      if (ctrl.onFinish) {
        if (ctrl.onFinish() !== false) {
          ctrl.reset();
        }
      }
    };

    ctrl.cancel = function () {
      if (ctrl.onCancel) {
        if (ctrl.onCancel() !== false) {
          ctrl.reset();
        }
      }
    };

    //reset
    ctrl.reset = function () {
      //traverse steps array and set each "completed" property to false
      angular.forEach(ctrl.getEnabledSteps(), function (step) {
        step.completed = false;
      });
      //go to first step
      ctrl.goToStep(0);
    };

    // Provide wizard controls to steps and sub-steps
    $scope.wizard = this;
  }
});
