'use strict';
/**
 * @ngdoc service
 * @name patternfly.notification.Notification
 * @requires $rootScope
 *
 * @description
 * Notification service used to notify user about important events in the application.
 *
 * ## Configuring the service
 *
 * You can configure the service with two methods. You can set the custom delay with the setDelay method and
 * set the verbose mode with the setVerbose method.
 *
 * ### Notifications.setDelay
 * Set the delay after which the notification is dismissed. The argument of this method is delay in miliseconds. Default
 * delay is 5000 ms.
 *
 * ### Notifications.setVerbose
 * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console,
 * too. This is done using the default angular.js $log service.
 *
 * ## Configuration Example
 * ```js
 * angular.module('myApp', []).config(function(NotificationsProvider){
 *   NotificationsProvider.setDelay(10000).setVerbose(false);
 * });
 * ```
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">
     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
angular.module('patternfly.notification', []).provider('Notifications', function() {
  // time (in ms) the notifications are shown

  this.delay = 5000;
  this.verbose = true;
  this.notifications = {};

  this.setDelay = function(delay){
    this.delay = delay;
    return this;
  };

  this.setVerbose = function(verbose){
    this.verbose = verbose;
    return this;
  };

  this.$get = ['$rootScope', '$timeout', '$log', function($rootScope, $timeout, $log) {

    var delay = this.delay;
    var notifications = this.notifications;
    var verbose = this.verbose;

    $rootScope.notifications = {};
    $rootScope.notifications.data = [];

    $rootScope.notifications.remove = function(index){
      $rootScope.notifications.data.splice(index,1);
    };

    var scheduleMessagePop = function() {
      $timeout(function() {
        for (var i = 0; i < $rootScope.notifications.data.length; i++){
          if (!$rootScope.notifications.data[i].isPersistent){
            $rootScope.notifications.data.splice(i,1);
          }
        }
      }, delay);
    };

    if (!$rootScope.notifications) {
      $rootScope.notifications.data = [];
    }

    notifications.message = function(type, header, message, isPersistent) {
      $rootScope.notifications.data.push({
        type : type,
        header: header,
        message : message,
        isPersistent: isPersistent
      });

      scheduleMessagePop();
    };

    notifications.info = function(message) {
      notifications.message('info', 'Info!', message);
      if (verbose) {
        $log.info(message);
      }
    };

    notifications.success = function(message) {
      notifications.message('success', 'Success!', message);
      if (verbose) {
        $log.info(message);
      }
    };

    notifications.error = function(message) {
      notifications.message('danger', 'Error!', message, true);
      if (verbose) {
        $log.error(message);
      }
    };

    notifications.warn = function(message) {
      notifications.message('warning', 'Warning!', message);
      if (verbose) {
        $log.warn(message);
      }
    };

    notifications.httpError = function(message, httpResponse) {
      message += ' (' + (httpResponse.data.message || httpResponse.data.cause || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
      notifications.message('danger', 'Error!', message, true);
      if (verbose) {
        $log.error(message);
      }
    };

    return notifications;
  }];

})

/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotification
 * @restrict E
 * @scope
 *
 * @param {expression=} pfNotificationType The type of the notification message. Allowed value is one of these: 'success','info','danger', 'warning'.
 * @param {expression=} pfNotificationMessage The main text message of the notification.
 * @param {expression=} pfNotificationHeader The header text of the notification.
 * @param {expression=} pfNotificationPersistent The notification won't disappear after delay timeout, but has to be closed manually with the close button.
 *
 * @description
 * The main visual element of the notification message.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification pf-notification-type="type"
                      pf-notification-header="header"
                      pf-notification-message="message"
                      pf-notification-persistent="isPersistent">
     </pf-notification>

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
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Persistent:</label>
         <div class="col-sm-10">
          <input type="checkbox" ng-model="isPersistent"></input>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope) {
    $scope.types = ['success','info','danger', 'warning'];
    $scope.type = $scope.types[0];
    $scope.isPersistent = false;

    $scope.header = 'Default Header.';
    $scope.message = 'Default Message.';
  }
 </file>

 </example>
 */
.directive('pfNotification', function () {
  return {
    scope: {
      'pfNotificationType': '=',
      'pfNotificationMessage': '=',
      'pfNotificationHeader': '=',
      'pfNotificationPersistent': '=',
      'pfNotificationIndex': '='
    },
    restrict: 'E',
    template: '<div class="alert alert-{{pfNotificationType}}">' +
                '<button ng-show="pfNotificationPersistent" type="button" class="close" ' +
                'ng-click="$parent.notifications.remove($index)">' +
                  '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
                '</button>' +
                '<span class="pficon pficon-ok" ng-show="pfNotificationType == \'success\'"></span>' +
                '<span class="pficon pficon-info" ng-show="pfNotificationType == \'info\'"></span>' +
                '<span class="pficon-layered" ng-show="pfNotificationType == \'danger\'">' +
                  '<span class="pficon pficon-error-octagon"></span>' +
                  '<span class="pficon pficon-error-exclamation"></span>' +
                '</span>' +
                '<span class="pficon-layered" ng-show="pfNotificationType == \'warning\'">' +
                  '<span class="pficon pficon-warning-triangle"></span>' +
                  '<span class="pficon pficon-warning-exclamation"></span>' +
                '</span>' +
                '<strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}' +
              '</div>'
  };
})
/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotificationList
 * @restrict E
 *
 * @description
 * Using this directive automatically creates a list of notifications generated by the {@link api/patternfly.notification.Notification notification} service.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification - Click me several times</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    $scope.message = 'Default Message.';

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
.directive('pfNotificationList', function () {
  return {
    restrict: 'E',
    template: '<div data-ng-show="notifications.data.length > 0">' +
                '<div ng-repeat="notification in notifications.data">' +
                  '<pf-notification pf-notification-type="notification.type" ' +
                                   'pf-notification-header="notification.header" ' +
                                   'pf-notification-message="notification.message" ' +
                                   'pf-notification-persistent="notification.isPersistent"' +
                                   'pf-notification-index="$index">' +
                  '</pf-notification>' +
                '</div>' +
              '</div>'
  };
});