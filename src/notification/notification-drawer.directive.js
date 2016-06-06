/**
 * @ngdoc directive
 * @name patternfly.notification.directive:pfNotificationDrawer
 *
 * @description
 *   Directive for rendering a notification drawer. This provides a common mechanism to handle how the notification
 *   drawer should look and behave without mandating the look of the notification group heading or notification body.
 *   <br><br>
 *   An array of notification groups must be passed to create each group in the drawer. Each notification
 *   group must include an array of notifications to be shown for that group, the array MUST be called 'notifications'.
 *   You must provide the source for the heading, sub-heading, and notification body to show the content you desire for each.
 *   Pass a customScope object containing any scope variables/functions you need to access from the included source, access these
 *   via hanlders.<your handler> in your included source.
 *   <br><br>
 *
 * @param {boolean} drawerHidden Flag if the drawer is currently hidden
 * @param {string}  drawerTitle  Title to display for the drawer
 * @param {object} notificationGroups Array of notification groups to add to the drawer
 * @param {string} actionButtonTitle Text for the lower action button of the drawer (optional, if not specified there will be no action button)
 * @param {function} actionButtonCallback function(notificationGroup) Callback method for action button for each group, the notificationGroup is passed (Optional)
 * @param {string} headingInclude Include src for the heading area for each notification group, access the group via notificationGroup
 * @param {string} subheadingInclude Include src for the sub-heading area for each notification group, access the group via notificationGroup
 * @param {string} notificationBodyInclude Include src for the notification body for each notification, access the group via notification
 * @param {object} customScope Object containing any variables/functions used by the included src, access via customScope.<xxx>
 *
 * @example
 <example module="patternfly.notification" deps="patternfly.utils, patternfly.filters, patternfly.sort, patternfly.views">
 <file name="index.html">
   <div ng-controller="DrawerCtrl" class="row example-container">
     <div class="col-md-12 pre-demo-text">
       <label>Click the notifications indicator to show the Notification Drawer: </label>
     </div>
     <div class="navbar-pf-vertical">
       <nav class="collapse navbar-collapse">
         <ul class="nav navbar-nav navbar-left navbar-iconic">
           <li class="drawer-pf-trigger dropdown">
             <a class="nav-item-iconic drawer-pf-trigger-icon" ng-click="toggleShowDrawer()">
               <span class="fa fa-bell" title="Notifications"></span>
             </a>
           </li>
         </ul>
       </nav>
     </div>
     <div class="layout-pf-fixed">
       <div class="navbar-pf-vertical">
         <div pf-notification-drawer drawer-hidden="hideDrawer" drawer-title="Notifications Drawer"
              action-button-title="Mark All Read" action-button-callback="actionButtonCB" notification-groups="groups"
              heading-include="heading.html" subheading-include="subheading.html" notification-body-include="notification-body.html"
              custom-scope="customScope">
         </div>
       </div>
     </div>
     <div class="col-md-12">
       <label class="actions-label">Actions: </label>
     </div>
     <div class="col-md-12">
       <textarea rows="3" class="col-md-12">{{actionsText}}</textarea>
     </div>
   </div>
 </file>
 <file name="heading.html">
   {{notificationGroup.heading}}
 </file>
 <file name="subheading.html">
   {{notificationGroup.subHeading}}
 </file>
 <file name="notification-body.html">
   <div class="dropdown pull-right dropdown-kebab-pf" ng-if="notification.actions && notification.actions.length > 0">
     <button class="btn btn-link dropdown-toggle" type="button" id="dropdownKebabRight" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
       <span class="fa fa-ellipsis-v"></span>
     </button>
     <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebabRight">
       <li ng-repeat="action in notification.actions"
           role="{{action.isSeparator === true ? 'separator' : 'menuitem'}}"
           ng-class="{'divider': action.isSeparator === true, 'disabled': action.isDisabled === true}">
         <a ng-if="action.isSeparator !== true" class="secondary-action" title="{{action.title}}" ng-click="customScope.handleAction(notification, action)">
           {{action.name}}
         </a>
       </li>
     </ul>
   </div>
   <span ng-if="notification.status" class="{{'pull-left ' + customScope.getNotficationStatusIconClass(notification)}}"></span>
   <span class="drawer-pf-notification-message">{{notification.message}}</span>
   <div class="drawer-pf-notification-info">
     <span class="date">{{notification.timeStamp | date:'MM/dd/yyyy'}}</span>
     <span class="time">{{notification.timeStamp | date:'h:mm:ss a'}}</span>
   </div>
 </file>
 <file name="script.js">
   angular.module('patternfly.notification').controller('DrawerCtrl', ['$scope',
     function ($scope) {
       var currentTime = (new Date()).getTime();
       $scope.hideDrawer = true;
       $scope.toggleShowDrawer = function () {
         $scope.hideDrawer = !$scope.hideDrawer;
       };

       var menuActions = [
          {
            name: 'Action',
            title: 'Perform an action'
          },
          {
            name: 'Another Action',
            title: 'Do something else'
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: ''
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something'
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar'
          }
        ];


       $scope.groups = [
         {
           heading: "Notification Tab 1",
           subHeading: "5 New Events",
           notifications: [
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ],
           isLoading: true
         },
         {
           heading: "Notification Tab 2",
           subHeading: "3 New Events",
           notifications: [
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ]
         },
         {
           heading: "Notification Tab 3",
           subHeading: "3 New Events",
           notifications: [
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ]
         },
         {
           heading: "Notification Tab 4",
           subHeading: "3 New Events",
           notifications: [
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ]
         },
         {
           heading: "Notification Tab 5",
           subHeading: "3 New Events",
           notifications: [
             {
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ]
         }
       ];

       $scope.actionsText = "";
       $scope.actionButtonCB = function (group) {
         $scope.actionsText = "Action Button clicked: " + group.heading + "\n" + $scope.actionsText;
       };

       //
       // Define customScope to contain anything that needs to be accessed from the included source
       // html files (heading, subheading, or notificaton body).
       //

       $scope.customScope = {};
       $scope.customScope.getNotficationStatusIconClass = function (notification) {
         var retClass = '';
         if (notification && notification.status) {
           if (notification.status === 'info') {
             retClass = "pficon pficon-info";
           } else if (notification.status === 'error') {
             retClass = "pficon pficon-error-circle-o";
           } else if (notification.status === 'warning') {
             retClass = "pficon pficon-warning-triangle-o";
           } else if (notification.status === 'ok') {
             retClass = "pficon pficon-ok";
           }
         }
         return retClass;
       };
       $scope.customScope.handleAction = function (notification, action) {
         if (action.isDisabled) {
           return;
         }
         var newText = notification.message + " - " + action.name;
         $scope.actionsText = newText + "\n" + $scope.actionsText;
       };

     }
   ]);
 </file>
</example>
*/
angular.module('patternfly.notification').directive('pfNotificationDrawer', function ($window, $timeout, $document) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      drawerHidden: '=?',
      drawerTitle: '@',
      notificationGroups: '=',
      actionButtonTitle: '@',
      actionButtonCallback: '=?',
      headingInclude: '@',
      subheadingInclude: '@',
      notificationBodyInclude: '@',
      customScope: '=?'
    },
    templateUrl: 'notification/notification-drawer.html',
    link: function (scope, element) {

      scope.$watch('notificationGroups', function () {
        var openFound = false;
        scope.notificationGroups.forEach(function (group) {
          if (group.open) {
            if (openFound) {
              group.open = false;
            } else {
              openFound = true;
            }
          }
        });
      });

      scope.$watch('drawerHidden', function () {
        $timeout(function () {
          angular.element($window).triggerHandler('resize');
        }, 100);
      });

      scope.toggleCollapse = function (selectedGroup) {
        if (selectedGroup.open) {
          selectedGroup.open = false;
        } else {
          scope.notificationGroups.forEach(function (group) {
            group.open = false;
          });
          selectedGroup.open = true;
        }
      };

      if (scope.groupHeight) {
        element.find('.panel-group').css("height", scope.groupHeight);
      }
      if (scope.groupClass) {
        element.find('.panel-group').addClass(scope.groupClass);
      }
    }
  };
});
