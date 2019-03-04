/**
 * @ngdoc directive
 * @name patternfly.views.directive:pfEmptyState
 * @restrict E
 *
 * @description
 * Component for rendering an empty state.
 *
 * @param {object} config Optional configuration object
 * <ul style='list-style-type: none'>
 *   <li>.icon   - (string) class for main icon. Ex. 'pficon pficon-add-circle-o'
 *   <li>.title  - (string) Text for the main title
 *   <li>.info  - (string) Text for the main informational paragraph
 *   <li>.helpLink - (object) Contains url specific properties and actions
 *   <ul style='list-style-type: none'>
 *     <li>.label - (string) Optional text label which appears before the urlLabel
 *     <li>.urlLabel - (string) Optional text for the clickable portion of the link
 *     <li>.url - (string) Optional text for url path
 *     <li>.urlAction - (function) Optional function to invoke a url action when a callback method is specified.
 *     When both urlAction and url are specified the component will first execute urlAction then nagivate to the url.
 *   </ul>
 * </ul>
 * @param {array} actionButtons Buttons to display under the icon, title, and informational paragraph.
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *     <li>.type - (String) Optional type property. Set to 'main' to be displayed as a main action button.
 *     If unspecified, action button will be displayed as a secondary action button.
 *   </ul>
 * @example
 <example module="patternfly.views" deps="patternfly.utils">
 <file name="index.html">
   <div ng-controller="ViewCtrl" class="row example-container">
     <div class="col-md-12">
       <pf-empty-state config="config" action-buttons="actionButtons"></pf-empty-state>
     </div>
     <hr class="col-md-12">
     <div class="col-md-12">
       <label style="font-weight:normal;vertical-align:center;">Events: </label>
     </div>
     <div class="col-md-12">
       <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
     </div>
   </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
   function ($scope) {

     $scope.eventText = '';

     var performEmptyStateAction = function () {
       $scope.eventText += 'Empty State Action Executed \r\n';
     };

     $scope.config = {
       icon: 'pficon-add-circle-o',
       title: 'Empty State Title',
       info: "This is the Empty State component. The goal of a empty state pattern is to provide a good first impression that helps users to achieve their goals. It should be used when a view is empty because no objects exists and you want to guide the user to perform specific actions.",
       helpLink: {
         label: 'For more information please see',
         urlLabel: 'pfExample',
         url: '#/api/patternfly.views.directive:pfEmptyState',
         urlAction: performEmptyStateAction
       }
     };

     var performAction = function (action) {
       $scope.eventText = action.name + " executed. \r\n" + $scope.eventText;
     };

     $scope.actionButtons = [
       {
         name: 'Main Action',
         title: 'Perform an action',
         actionFn: performAction,
         type: 'main'
       },
       {
         name: 'Secondary Action 1',
         title: 'Perform an action',
         actionFn: performAction
       },
       {
         name: 'Secondary Action 2',
         title: 'Perform an action',
         actionFn: performAction
       },
       {
         name: 'Secondary Action 3',
         title: 'Perform an action',
         actionFn: performAction
       }
     ];
   }
 ]);
</file>
</example>
*/
angular.module('patternfly.views').component('pfEmptyState', {
  bindings: {
    config: '<?',
    actionButtons: "<?"
  },
  templateUrl: 'views/empty-state.html',
  controller: function ($filter) {
    'use strict';
    var ctrl = this, prevConfig;

    ctrl.defaultConfig = {
      title: 'No Items Available'
    };

    ctrl.$onInit = function () {
      if (angular.isUndefined(ctrl.config)) {
        ctrl.config = {};
      }
      ctrl.updateConfig();
    };

    ctrl.updateConfig = function () {
      prevConfig = angular.copy(ctrl.config);
      _.defaults(ctrl.config, ctrl.defaultConfig);
    };

    ctrl.$onChanges = function (changesObj) {
      if ((changesObj.config && !changesObj.config.isFirstChange()) ) {
        ctrl.updateConfig();
      }
    };

    ctrl.$doCheck = function () {
      // do a deep compare on config
      if (!angular.equals(ctrl.config, prevConfig)) {
        ctrl.updateConfig();
      }
    };

    ctrl.hasMainActions = function () {
      var mainActions;

      if (ctrl.actionButtons) {
        mainActions = $filter('filter')(ctrl.actionButtons, {type: 'main'});
        return mainActions.length;
      }

      return false;
    };

    ctrl.hasSecondaryActions = function () {
      var secondaryActions;

      if (ctrl.actionButtons) {
        secondaryActions = $filter('filter')(ctrl.actionButtons, {type: undefined});
        return secondaryActions.length;
      }

      return false;
    };

    ctrl.filterMainActions = function (action) {
      return action.type === 'main';
    };

    ctrl.filterSecondaryActions = function (action) {
      return action.type !== 'main';
    };

    ctrl.handleButtonAction = function (action) {
      if (action && action.actionFn) {
        action.actionFn(action);
      }
    };
  }
});
