/**
  * @ngdoc directive
  * @name patternfly.wizard.component:pfWizard
  * @restrict E
  *
  * @description
  * Component for rendering a Wizard modal.  Each wizard dynamically creates the step navigation both in the header and the left-hand side based on nested steps.
  * Use pf-wizard-step to define individual steps within a wizard and pf-wizard-substep to define portions of pf-wizard-steps if so desired.  For instance, Step one can have two substeps - 1A and 1B when it is logical to group those together.
  * <br /><br />
  * The basic structure should be:
  * <pre>
  * <pf-wizard>
  *   <pf-wizard-step>
  *     <pf-wizard-substep><!-- content here --></pf-wizard-substep>
  *     <pf-wizard-substep><!-- content here --></pf-wizard-substep>
  *   </pf-wizard-step>
  *   <pf-wizard-step><!-- additional configuration can be added here with substeps if desired --></pf-wizard-step>
  *   <pf-wizard-step><!-- review steps and final command here --></pf-wizard-step>
  * </pf-wizard>
  * </pre>
  *
  * @param {string} wizardTitle The wizard title displayed in the header
  * @param {boolean=} hideIndicators  Hides the step indicators in the header of the wizard
  * @param {boolean=} activeStepTitleOnly  Shows the title only for the active step in the step indicators, optional, default is false.
  * @param {boolean=} hideSidebar  Hides page navigation sidebar on the wizard pages
  * @param {boolean=} hideHeader Optional value to hide the title bar. Default is false.
  * @param {boolean=} hideBackButton Optional value to hide the back button, useful in 2 step wizards. Default is false.
  * @param {string=} stepClass Optional CSS class to be given to the steps page container. Used for the sidebar panel as well unless a sidebarClass is provided.
  * @param {string=} sidebarClass Optional CSS class to be give to the sidebar panel. Only used if the stepClass is also provided.
  * @param {string=} contentHeight The height the wizard content should be set to. This is used ONLY if the stepClass is not given. This defaults to 300px if the property is not supplied.
  * @param {boolean=} hideIndicators  Hides the step indicators in the header of the wizard
  * @param {string=} currentStep The current step can be changed externally - this is the title of the step to switch the wizard to
  * @param {string=} cancelTitle The text to display on the cancel button
  * @param {string=} backTitle The text to display on the back button
  * @param {string=} nextTitle The text to display on the next button
  * @param {function(step)=} backCallback Called to notify when the back button is clicked
  * @param {function(step)=} nextCallback Called to notify when the next button is clicked
  * @param {function()=} onFinish Called to notify when when the wizard is complete.  Returns a boolean value to indicate if the finish operation is complete
  * @param {function()=} onCancel Called when the wizard is canceled, returns a boolean value to indicate if cancel is successful
  * @param {boolean} wizardReady Value that is set when the wizard is ready
  * @param {boolean=} wizardDone  Value that is set when the wizard is done
  * @param {string} loadingWizardTitle The text displayed when the wizard is loading
  * @param {string=} loadingSecondaryInformation Secondary descriptive information to display when the wizard is loading
  * @param {boolean=} embedInPage Value that indicates wizard is embedded in a page (not a modal).  This moves the navigation buttons to the left hand side of the footer and removes the close button.
  * @param {function(step, index)=} onStepChanged Called when the wizard step is changed, passes in the step and the step index of the step changed to
  * @deprecated {string} title The wizard title displayed in the head (use wizardTitle instead)
  * @example
  <example module="patternfly.wizard" deps="patternfly.form">
  <file name="index.html">
    <div ng-controller="WizardModalController">
      <button ng-click="openWizardModel()" class="btn btn-default">Launch Wizard</button>
    </div>
  </file>
  <file name="wizard-container.html">
  <pf-wizard wizard-title="Wizard Title"
    wizard-ready="deployProviderReady"
    on-finish="finishedWizard()"
    on-cancel="cancelDeploymentWizard()"
    next-title="nextButtonTitle"
    next-callback="nextCallback"
    back-callback="backCallback"
    wizard-done="deployComplete || deployInProgress"
    sidebar-class="example-wizard-sidebar"
    step-class="example-wizard-step"
    loading-secondary-information="secondaryLoadInformation"
    on-step-changed="stepChanged(step, index)">
      <pf-wizard-step step-title="First Step" next-tooltip="firstStepNextTooltip" prev-tooltip="firstStepPrevTooltip" substeps="true" step-id="details" step-priority="0" show-review="true" show-review-details="true">
        <div ng-include="'detail-page.html'">
        </div>
        <pf-wizard-substep step-title="Details - Extra" next-enabled="true" step-id="details-extra" step-priority="1" show-review="true" show-review-details="true" review-template="review-second-template.html">
          <form class="form-horizontal">
            <pf-form-group pf-label="Lorem" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" required>
              <input id="new-lorem" name="lorem" ng-model="data.lorem" type="text" required/>
            </pf-form-group>
            <pf-form-group pf-label="Ipsum" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" >
              <input id="new-ipsum" name="ipsum" ng-model="data.ipsum" type="text" />
            </pf-form-group>
          </form>
        </pf-wizard-substep>
      </pf-wizard-step>
      <pf-wizard-step step-title="Second Step" next-tooltip="secondStepNextTooltip" prev-tooltip="secondStepPrevTooltip" substeps="false" step-id="configuration" step-priority="1" show-review="true" review-template="review-second-template.html" >
        <form class="form-horizontal">
          <h3>Wizards should make use of substeps consistently throughout (either using them or not using them).  This is an example only.</h3>
          <pf-form-group pf-label="Lorem" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" >
            <input id="new-lorem" name="lorem" ng-model="data.lorem" type="text"/>
          </pf-form-group>
          <pf-form-group pf-label="Ipsum" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" >
            <input id="new-ipsum" name="ipsum" ng-model="data.ipsum" type="text" />
          </pf-form-group>
        </form>
      </pf-wizard-step>
      <pf-wizard-step step-title="Review" next-tooltip="reviewStepNextTooltip" prev-tooltip="reviewStepPrevTooltip" substeps="true" step-id="review" step-priority="2">
        <div ng-include="'summary.html'"></div>
        <div ng-include="'deployment.html'"></div>
      </pf-wizard-step>
   </pf-wizard>
  </file>
  <file name="detail-page.html">
    <div ng-controller="DetailsGeneralController">
       <pf-wizard-substep step-title="General" next-enabled="detailsGeneralComplete" step-id="details-general" step-priority="0" on-show="onShow" review-template="{{reviewTemplate}}" show-review-details="true">
         <form class="form-horizontal">
           <pf-form-group pf-label="Name" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" required>
              <input id="new-name" name="name" ng-model="data.name" type="text" ng-change="updateName()" required/>
           </pf-form-group>
           <pf-form-group pf-label="Description" pf-label-class="col-sm-3 col-md-2" pf-input-class="col-sm-9 col-md-10" >
             <input id="new-description" name="description" ng-model="data.description" type="text" />
           </pf-form-group>
         </form>
      </pf-wizard-substep>
    </div>
  </file>
  <file name="review-template.html">
  <div ng-controller="DetailsReviewController">
    <form class="form">
      <div class="wizard-pf-review-item">
        <span class="wizard-pf-review-item-label">Name:</span>
        <span class="wizard-pf-review-item-value">{{data.name}}</span>
      </div>
      <div class="wizard-pf-review-item">
        <span class="wizard-pf-review-item-label">Description:</span>
        <span class="wizard-pf-review-item-value">{{data.description}}</span>
      </div>
    </form>
  </div>
  </file>
  <file name="review-second-template.html">
  <div ng-controller="DetailsReviewController">
    <form class="form">
      <div class="wizard-pf-review-item">
        <span class="wizard-pf-review-item-label">Lorem:</span>
        <span class="wizard-pf-review-item-value">{{data.lorem}}</span>
      </div>
      <div class="wizard-pf-review-item">
        <span class="wizard-pf-review-item-label">Ipsum:</span>
        <span class="wizard-pf-review-item-value">{{data.ipsum}}</span>
      </div>
    </form>
  </div>
  </file>
  <file name="summary.html">
  <div ng-controller="SummaryController">
    <pf-wizard-substep step-title="Summary" step-id="review-summary" step-priority="0" next-enabled="true" prev-enabled="true" ok-to-nav-away="true" wz-disabled="false" on-show="onShow">
      <pf-wizard-review-page shown="pageShown" wizard-data="data"></pf-wizard-review-page>
    </pf-wizard-substep>
  </div>
  </file>
  <file name="deployment.html">
  <div ng-controller="DeploymentController">
    <pf-wizard-substep step-title="Deploy" step-id="review-progress" step-priority="1" next-enabled="true" prev-enabled="false" ok-to-nav-away="true" wz-disabled="false" on-show="onShow">
      <div class="wizard-pf-contents" ng-controller="DeploymentController">
        <div class="wizard-pf-process blank-slate-pf" ng-if="!deploymentComplete">
          <div class="spinner spinner-lg blank-slate-pf-icon"></div>
          <h3 class="blank-slate-pf-main-action">Deployment in progress</h3>
          <p class="blank-slate-pf-secondary-action">Lorem ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu eget nunc amet. </p>
        </div>
        <div class="wizard-pf-complete blank-slate-pf" ng-if="deploymentComplete">
          <div class="wizard-pf-success-icon"><span class="glyphicon glyphicon-ok-circle"></span></div>
          <h3 class="blank-slate-pf-main-action">Deployment was successful</h3>
          <p class="blank-slate-pf-secondary-action">Lorem ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu eget nunc amet. </p>
          <button type="button" class="btn btn-lg btn-primary">View Deployment</button>
        </div>
     </div>
   </pf-wizard-substep>
  </div>
  </file>
  <file name="script.js">
  angular.module('patternfly.wizard').controller('WizardModalController', ['$scope', '$timeout', '$uibModal', '$rootScope',
    function ($scope, $timeout, $uibModal, $rootScope) {
      $scope.openWizardModel = function () {
        var wizardDoneListener,
            modalInstance = $uibModal.open({
              animation: true,
              backdrop: 'static',
              templateUrl: 'wizard-container.html',
              controller: 'WizardController',
              size: 'lg'
            });

        var closeWizard = function (e, reason) {
          modalInstance.dismiss(reason);
          wizardDoneListener();
        };

        modalInstance.result.then(function () { }, function () { });

        wizardDoneListener = $rootScope.$on('wizard.done', closeWizard);
      };
    }
  ]);
  angular.module('patternfly.wizard').controller('WizardController', ['$scope', '$timeout', '$rootScope',
    function ($scope, $timeout, $rootScope) {


      var initializeWizard = function () {
        $scope.data = {
          name: '',
          description: '',
          lorem: 'default setting',
          ipsum: ''
        };
        $scope.secondaryLoadInformation = 'ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu eget nunc amet.';
        $timeout(function () {
          $scope.deployReady = true;
        }, 1000);
        $scope.nextButtonTitle = "Next >";
      };

      var startDeploy = function () {
        $timeout(function() { }, 10000);
        $scope.deployInProgress = true;
      };

      $scope.data = {};

      $scope.firstStepNextTooltip = "First step next";
      $scope.firstStepPrevTooltip = "First step back";
      $scope.secondStepNextTooltip = "Second step next";
      $scope.secondStepPrevTooltip = "Second step back";
      $scope.reviewStepNextTooltip = "Review step next";
      $scope.reviewStepPrevTooltip = "Review step back";

      $scope.nextCallback = function (step) {
        // call startdeploy after deploy button is clicked on review-summary tab
        if (step.stepId === 'review-summary') {
          startDeploy();
        }
        return true;
      };
      $scope.backCallback = function (step) {
        return true;
      };

      $scope.stepChanged = function (step, index) {
        if (step.stepId === 'review-summary') {
          $scope.nextButtonTitle = "Deploy";
        } else if (step.stepId === 'review-progress') {
          $scope.nextButtonTitle = "Close";
        } else {
          $scope.nextButtonTitle = "Next >";
        }
      };

      $scope.cancelDeploymentWizard = function () {
        $rootScope.$emit('wizard.done', 'cancel');
      };

      $scope.finishedWizard = function () {
        $rootScope.$emit('wizard.done', 'done');
        return true;
      };

      initializeWizard();
     }
  ]);

  angular.module('patternfly.wizard').controller('DetailsGeneralController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
      'use strict';

      $scope.reviewTemplate = "review-template.html";
      $scope.detailsGeneralComplete = false;

      $scope.onShow = function() { };

      $scope.updateName = function() {
        $scope.detailsGeneralComplete = angular.isDefined($scope.data.name) && $scope.data.name.length > 0;
      };
    }
  ]);

  angular.module('patternfly.wizard').controller('DetailsReviewController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
      'use strict';

      // Find the data!
      var next = $scope;
      while (angular.isUndefined($scope.data)) {
        next = next.$parent;
        if (angular.isUndefined(next)) {
          $scope.data = {};
        } else {
          $scope.data = next.$ctrl.wizardData;
        }
      }
    }
  ]);

  angular.module('patternfly.wizard').controller('SummaryController', ['$rootScope', '$scope', '$timeout',
    function ($rootScope, $scope, $timeout) {
      'use strict';
      $scope.pageShown = false;

      $scope.onShow = function () {
        $scope.pageShown = true;
        $timeout(function () {
          $scope.pageShown = false;  // done so the next time the page is shown it updates
        });
      }
    }
  ]);

  angular.module('patternfly.wizard').controller('DeploymentController', ['$rootScope', '$scope', '$timeout',
    function ($rootScope, $scope, $timeout) {
      'use strict';

      $scope.onShow = function() {
        $scope.deploymentComplete = false;
        $timeout(function() {
          $scope.deploymentComplete = true;
        }, 2500);
      };
    }
  ]);
</file>
</example>
*/
