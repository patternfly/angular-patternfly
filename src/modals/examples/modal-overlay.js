/**
 * @ngdoc directive
 * @name patternfly.modals.componenet:pfModalOverlay
 * @element pfModalOverlay
 * @restrict E
 *
 * @description
 * The Modal Overlay pattern provides a way to quickly load and display important information to the user without navigating
 * away from the current page. It utilizes the {@link https://angular-ui.github.io/bootstrap/#modal Angular UI modal}
 * and Patternfly styling. Use cases for Modal Overlays can vary a great deal, but some examples include the following:
 * <ul>
 * <li>To remind or prompt users
 * <li>To load dialogs that require user input before advancing
 * <li>To load tasks which require a user’s full attention, such as stepping through a wizard flow
 * <li>To present important information or warnings
 * </ul>
 *
 * @param {boolean} showModal Flag for setting modal to hide/show by default
 * @param {function} onClose Function to call when the modal is closed<br/>
 * Note: the parameter passed to the on-close function must be named 'dismissCause'
 * @param {string} modalId Id of the modal
 * @param {string} modalTitle The title of the modal displayed in the header
 * @param {string} modalBodyTemplate Path to html template for modal body
 * @param {array} actionButtons array of button objects. Each button can have the following properties:<br/>
 * <ul style='list-style-type: none'>
 * <li>.label        - the text to display on the button
 * <li>.class        - (optional) classes to add to the button
 * <li>.actionFn     - (optional) user defined function to call when the button is clicked. May optionally return false
 * to prevent closing the modal. For example to perfrom asynchronous validations.
 * <li>.isDisabled   - (optional) boolean true if the button should be disabled by default
 * <li>.isCancel     - (optional) boolean true if the button should cancel and dismiss the modal
 * </ul>
 * @param {string=} titleId Id of the title. "modalTitle" by default
 * @param {boolean=} hideCloseIcon Flag indicating that the modal should hide the 'x' close icon.
 * @param {boolean=} backgroundClose Flag indicating that the modal should close if user clicks background. False by default
 * @param {function=} onBackgroundClick Function to call when the user clicks the background.
 * Return true if clicking background should close the modal, false otherwise.<br/>
 * Note: backgroundClose needs to be set to true in order for the onBackgroundClick event to fire.
 * @param {boolean=} isForm Flag indicating that the modal body will contain a form which should be valid before an action button is enabled
 * @param {object=} modalBodyScope Object containing the scope for the modalBodyTemplate
 *
 * @example
 <example module="patternfly.modals.demo">

 <file name="modules.js">
   angular.module('patternfly.modals.demo', ['patternfly.modals', 'patternfly.notification']);
 </file>

 <file name="index.html">
 <div ng-controller="DemoModalOverlayCtrl" class="example-container">
    <button ng-click="open()" class="btn btn-default">Launch Form Example</button>
    <pf-modal-overlay show-modal="showModal"
          on-close="onClose(dismissCause)"
          modal-id="modalId"
          modal-title="modalTitle"
          background-close="backgroundClose"
          on-background-click="onBackgroundClick"
          is-form="isForm"
          modal-body-template="template"
          modal-body-scope="formScope"
          action-buttons="actionButtons">
    </pf-modal-overlay>

   <button ng-click="open2()" class="btn btn-default">Launch Confirmation Example</button>
   <pf-modal-overlay show-modal="showModal2"
         on-close="onClose2(dismissCause)"
         modal-id="modalId2"
         modal-title="modalTitle2"
         title-id="titleId2"
         hide-close-icon="hideCloseIcon2"
         modal-body-template="template2"
         action-buttons="actionButtons2">
    </pf-modal-overlay>
   <div>
      <label class="actions-label">Actions: </label>
   </div>
   <div>
      <textarea rows="3" class="col-md-12">{{actionsText}}</textarea>
   </div>
 </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.modals.demo').controller('DemoModalOverlayCtrl', function( $scope, $timeout ) {

      $scope.actionsText = "";

      // first example
      $scope.open = function () {
          $scope.showModal = true;
       };
      $scope.onClose = function(dismissCause) {
          $scope.showModal = false;
          $scope.actionsText = "First Modal closed via: " + dismissCause + "\n" + $scope.actionsText;
       };

      $scope.modalId = "demoModal1";
      $scope.modalTitle = "First Demo Title";
      $scope.backgroundClose = true;
      $scope.onBackgroundClick = function() {
        if(!$scope.formScope.allowBackgroundDismissal) {
          $scope.actionsText = "Backdrop clicked, but dismissal using background is not allowed\n" + $scope.actionsText;
          $scope.formScope.showNotAllowedMsg = true;
          return false;
        }
        $scope.formScope.showNotAllowedMsg = false;
        return true;
      };
      $scope.isForm = true;
      $scope.template = "demo-form.html";
      $scope.formScope = {
        inputs: {
          first: "",
          second: "test",
          third: ""
        },
        allowBackgroundDismissal: false,
        showNotAllowedMsg: false,
        maxLength: 6,
        firstInputInvalid: false,
        validating: false,
        formErrorNotification: {
          type: "danger",
          header: "Input is not valid.",
          message: "Fix the errors below to continue saving."
        }
      };
      $scope.actionButtons = [
          {
            label: "Cancel",
            isCancel: true
          },
          {
            label: "Save",
            class: "btn-primary custom-class",
            actionFn: function() {
              $scope.actionsText = "inputs {" +
                    "\n    first: " + $scope.formScope.inputs.first +
                    "\n    second: " + $scope.formScope.inputs.second +
                    "\n    third: " + $scope.formScope.inputs.third +
                    "\n}" + $scope.actionsText;
              $scope.formScope.firstInputInvalid = false;
              $scope.formScope.validating = true;
              $timeout(function () {
                $scope.formScope.validating = false;
                if ($scope.formScope.inputs.first === 'apples') {
                  $scope.showModal = false;
                } else {
                  $scope.formScope.firstInputInvalid = true;
                }
              }, 3000);
              return false;
            }
          }];

      // second example
      $scope.open2 = function () {
          $scope.showModal2 = true;
       };
      $scope.onClose2 = function(dismissCause) {
          $scope.showModal2 = false;
          $scope.actionsText = "Second Modal closed via: " + dismissCause + "\n" + $scope.actionsText;
       };

      $scope.modalId2 = "demoModal2";
      $scope.modalTitle2 = "Second Demo Title";
      $scope.titleId2 = "demoTitle2";
      $scope.hideCloseIcon2 = true;
      $scope.template2 = "demo-info.html";
      $scope.actionButtons2 = [
          {
            label: "Cancel",
            isCancel: true
          },
          {
            label: "OK",
            class: "btn-primary"
          }];
 });
 </file>

 <file name="demo-form.html">
   <ng-form name="demoForm" class="form-horizontal">
     <pf-inline-notification ng-if="$ctrl.modalBodyScope.firstInputInvalid"
       pf-notification-type="$ctrl.modalBodyScope.formErrorNotification.type"
       pf-notification-header="$ctrl.modalBodyScope.formErrorNotification.header"
       pf-notification-message="$ctrl.modalBodyScope.formErrorNotification.message">
     </pf-inline-notification>
     <div class="form-group">
       <label class="col-sm-3 control-label required-pf" for="textInput">Field One</label>
       <div class="col-sm-9"
            ng-class="{ 'has-error': demoForm.fieldOne.$dirty && demoForm.fieldOne.$touched && $ctrl.modalBodyScope.firstInputInvalid}">
        <input type="text" id="textInput" name="fieldOne" class="form-control"
               ng-model="$ctrl.modalBodyScope.inputs.first" ng-required="true"/>
         <div class="has-error" ng-show="$ctrl.modalBodyScope.firstInputInvalid">
           <span class="help-block">
             Invalid value for Field One.  Only acceptable value is 'apples'
           </span>
         </div>
       </div>
     </div>
     <div class="form-group">
       <label class="col-sm-3 control-label" for="textInput2">Field Two</label>
       <div class="col-sm-9"
            ng-class="{ 'has-error': demoForm.fieldTwo.$dirty && demoForm.fieldTwo.$touched && demoForm.fieldTwo.$error.maxlength}" >
         <input type="text" name="fieldTwo" id="textInput2" class="form-control"
                ng-model="$ctrl.modalBodyScope.inputs.second"
                ng-maxlength="$ctrl.modalBodyScope.maxLength" />
         <div class="has-error" ng-show="demoForm.fieldTwo.$error.maxlength">
           <span class="help-block">
             Field Two exceeds max length of {{$ctrl.modalBodyScope.maxLength}}!
           </span>
         </div>
       </div>
     </div>
     <div class="form-group">
       <label class="col-sm-3 control-label" for="textInput3">Field Three</label>
       <div class="col-sm-9">
         <input type="text" id="textInput3" class="form-control" ng-model="$ctrl.modalBodyScope.inputs.third"/>
       </div>
     </div>
     <div class="form-group">
       <div class="col-sm-offset-3 col-sm-9">
         <div class="checkbox">
           <label>
              <input type="checkbox" ng-model="$ctrl.modalBodyScope.allowBackgroundDismissal"> Allow background dismissal
           </label>
         </div>
         <div ng-show="$ctrl.modalBodyScope.showNotAllowedMsg" class="col-sm-12 has-error">
            <span class="help-block">Background dismissal is not allowed!</span>
         </div>
       </div>
     </div>
     <div ng-if="$ctrl.modalBodyScope.validating">
       <div class="spinner spinner-lg blank-slate-pf-icon"></div>
     </div>
   </ng-form>
 </file>

 <file name="demo-info.html">
   <div class="row">
    <div class="col-md-12">Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.</div>
   </div>
 </file>
 </example>
 */
