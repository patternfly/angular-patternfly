/**
 * @ngdoc directive
 * @name patternfly.notification.directive:pfInlineNotification
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
       <pf-inline-notification pf-notification-type="types[0]"
                               pf-notification-header="headers[0]"
                               pf-notification-message="message">
       </pf-inline-notification>
       <pf-inline-notification pf-notification-type="types[1]"
                               pf-notification-header="headers[1]"
                               pf-notification-message="message">
       </pf-inline-notification>
       <pf-inline-notification pf-notification-type="types[2]"
                               pf-notification-header="headers[2]"
                               pf-notification-message="message">
       </pf-inline-notification>
       <pf-inline-notification pf-notification-type="types[3]"
                               pf-notification-header="headers[3]"
                               pf-notification-message="persistentMessage"
                               pf-notification-persistent="true">
       </pf-inline-notification>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.notification' ).controller( 'NotificationDemoCtrl', function( $scope, Notifications ) {
       $scope.types = ['success','info','danger', 'warning'];
       //$scope.type = $scope.types[0];
       $scope.isPersistent = false;

       $scope.headers = ['Success Header.', 'Info Header.','Danger Header.', 'Warning Header.'];
       $scope.message = 'Default message.';
       $scope.persistentMessage = 'Persistent enabled.';
     });
   </file>

 </example>
 */
angular.module( 'patternfly.notification' ).directive('pfInlineNotification', function () {
  'use strict';

  return {
    scope: {
      'pfNotificationType': '=',
      'pfNotificationMessage': '=',
      'pfNotificationHeader': '=',
      'pfNotificationPersistent': '=',
      'pfNotificationIndex': '='
    },
    restrict: 'E',
    templateUrl: 'notification/inline-notification.html'
  };
});
