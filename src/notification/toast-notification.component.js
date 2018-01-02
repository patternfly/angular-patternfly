/**
 * @ngdoc directive
 * @name patternfly.notification.component:pfToastNotification
 * @restrict E
 * @scope
 *
 * @param {string} notificationType The type of the notification message. Allowed value is one of these: 'success','info','danger', 'warning'
 * @param {string} header The header text of the notification. Accepts HTML content when allowed.
 * @param {string} message The main text message of the notification. Accepts HTML content when allowed.
 * @param {boolean} showClose Flag to show the close button, default: true
 * @param {boolean} htmlContent Flag to allow HTML content within the header and message options.
 * @param {function} closeCallback (function(data)) Function to invoke when close action is selected, optional
 * @param {string} actionTitle Text to show for the primary action, optional.
 * @param {function} actionCallback (function(data)) Function to invoke when primary action is selected, optional
 * @param {Array} menuActions  Optional list of actions to place in the kebab menu:<br/>
 *           <ul style='list-style-type: none'>
 *             <li>.name - (String) The name of the action, displayed on the button
 *             <li>.actionFn - (function(action, data)) Function to invoke when the action selected
 *             <li>.isDisabled - (Boolean) set to true to disable the action
 *             <li>.isSeparator - (Boolean) set to true if this is a placehodler for a separator rather than an action
 *           </ul>
 * @param {function} updateViewing (function(boolean, data)) Function to invoke when user is viewing/no-viewing (hovering on) the toast
 * @param {object} data Any data needed by the callbacks (optional)
 *
 * @description
 * Toast notifications are used to notify users of a system occurence. Toast notifications should be transient and stay on the screen for 8 seconds,
 * so that they do not block the information behind them for too long, but allows the user to read the message.
 * The pfToastNotification directive allows status, header, message, primary action and menu actions for the notification. The notification can also
 * allow the user to close the notification.
 *
 * Note: Using the kebab menu (menu actions) with the close button is not currently supported. If both are specified the close button will not be shown.
 * Add a close menu item if you want to have both capabilities.
 *
 * @example
 <example module="patternfly.notification">

   <file name="index.html">
     <div ng-controller="ToastNotificationDemoCtrl" class="row example-container">
       <div class="col-md-12">
         <pf-toast-notification notification-type="{{type}}" header="{{header}}" message="{{message}}"
              show-close="{{showClose}}"  html-content="htmlContent"
              close-callback="closeCallback" action-title="{{primaryAction}}"
              action-callback="handleAction" menu-actions="menuActions">
         </pf-toast-notification>

         <form class="form-horizontal">
           <div class="form-group">
             <label class="col-sm-2 control-label" for="header">Header:</label>
             <div class="col-sm-10">
              <input type="text" class="form-control" ng-model="header" id="header"/>
             </div>
           </div>
           <div class="form-group">
             <label class="col-sm-2 control-label" for="message">Message:</label>
             <div class="col-sm-10">
               <input type="text" class="form-control" ng-model="message" id="message"/>
             </div>
           </div>
           <div class="form-group">
             <label class="col-sm-2 control-label" for="message">Primary Action:</label>
             <div class="col-sm-10">
              <input type="text" class="form-control" ng-model="primaryAction" id="primaryAction"/>
             </div>
           </div>
           <div class="form-group">
             <label class="col-sm-2 control-label" for="type">Type:</label>
             <div class="col-sm-10">
               <div class="btn-group" uib-dropdown>
                 <button type="button" uib-dropdown-toggle class="btn btn-default">
                   {{type}}
                   <span class="caret"></span>
                 </button>
                 <ul uib-dropdown-menu class="dropdown-menu-right" role="menu">
                   <li ng-repeat="item in types" ng-class="{'selected': item === type}">
                     <a role="menuitem" tabindex="-1" ng-click="updateType(item)">
                       {{item}}
                     </a>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
           <div class="form-group">
             <label class="col-sm-2 control-label" for="type">Show Close:</label>
             <div class="col-sm-1">
             <input type="checkbox" ng-model="showClose"/>
             </div>
             <label class="col-sm-2 control-label" for="type">Show Menu:</label>
             <div class="col-sm-1">
              <input type="checkbox" ng-model="showMenu"/>
             </div>
             <label class="col-sm-2 control-label" for="type">Allow HTML:</label>
                <div class="col-sm-1">
                <input type="checkbox" ng-model="htmlContent"/>
             </div>
           </div>
         </form>
       </div>
       <div class="col-md-12">
         <label class="actions-label">Actions: </label>
       </div>
       <div class="col-md-12">
         <textarea rows="3" class="col-md-12">{{actionText}}</textarea>
       </div>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.notification' ).controller( 'ToastNotificationDemoCtrl', function( $scope, Notifications ) {
       $scope.types = ['success','info','danger', 'warning'];
       $scope.type = $scope.types[0];
       $scope.showClose = false;
       $scope.htmlContent = false;

       $scope.header = 'Default Header.';
       $scope.message = 'Default <strong>notification</strong> message.';
       $scope.primaryAction = '';

       $scope.updateType = function(item) {
         $scope.type = item;
       };

       $scope.showMenu = false;
       var performAction = function (menuAction) {
         $scope.actionText += menuAction.name + '\n';
       };
       var menuActions = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ];

       $scope.$watch('showMenu',  function () {
          if ($scope.showMenu) {
            $scope.menuActions = menuActions;
          } else {
            $scope.menuActions = undefined;
          }
       });

       $scope.actionText = "";

       $scope.handleAction = function () {
         $scope.actionText = $scope.primaryAction + '\n' + $scope.actionText;
       };
       $scope.closeCallback = function () {
         $scope.actionText = "Close" + '\n' + $scope.actionText;
       };
     });
   </file>

 </example>
 */
angular.module( 'patternfly.notification' ).component('pfToastNotification', {
  bindings: {
    'notificationType': '@',
    'message': '@',
    'header': '@',
    'showClose': '@',
    'htmlContent': '<?',
    'closeCallback': '=?',
    'actionTitle': '@',
    'actionCallback': '=?',
    'menuActions': '<?',
    'updateViewing': '=?',
    'data': '=?'
  },
  templateUrl: 'notification/toast-notification.html',
  controller: function ($sce) {
    'use strict';
    var ctrl = this,
      _showClose;

    Object.defineProperty(ctrl, 'showClose', {
      get: function () {
        return _showClose;
      },
      set: function (value) {
        _showClose = value;
        ctrl.updateShowClose();
      }
    });

    ctrl.notificationType = ctrl.notificationType || 'info';

    ctrl.updateShowClose = function () {
      ctrl.showCloseButton = (ctrl.showClose === 'true') && (angular.isUndefined(ctrl.menuActions) || ctrl.menuActions.length < 1);
    };

    ctrl.handleClose = function () {
      if (angular.isFunction(ctrl.closeCallback)) {
        ctrl.closeCallback(ctrl.data);
      }
    };

    ctrl.handleAction = function () {
      if (angular.isFunction(ctrl.actionCallback)) {
        ctrl.actionCallback(ctrl.data);
      }
    };

    ctrl.handleMenuAction = function (menuAction) {
      if (menuAction && angular.isFunction(menuAction.actionFn) && (menuAction.isDisabled !== true)) {
        menuAction.actionFn(menuAction, ctrl.data);
      }
    };

    ctrl.handleEnter = function () {
      if (angular.isFunction(ctrl.updateViewing)) {
        ctrl.updateViewing(true, ctrl.data);
      }
    };
    ctrl.handleLeave = function () {
      if (angular.isFunction(ctrl.updateViewing)) {
        ctrl.updateViewing(false, ctrl.data);
      }
    };

    ctrl.$onInit = function () {
      ctrl.updateShowClose();
    };

    ctrl.$onChanges = function (changesObj) {
      if (changesObj.menuActions) {
        ctrl.updateShowClose();
      }
    };

    ctrl.trustAsHtml = function (html) {
      return $sce.trustAsHtml(html);
    };
  }
});

