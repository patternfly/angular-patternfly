/**
 * @ngdoc directive
 * @name patternfly.notification.component:pfNotificationDrawer
 * @restrict E
 *
 * @description
 *   Component for rendering a notification drawer. This provides a common mechanism to handle how the notification
 *   drawer should look and behave without mandating the look of the notification group heading or notification body.
 *   <br><br>
 *   The notification groups must be passed to create each group in the drawer. Each notification
 *   group must include a collection of notifications to be shown for that group, the collection MUST be called 'notifications'.
 *   Each notification should have an 'unread' field in order to style unread notifications and hide/show the Mark All Unread button if desired.
 *   You must provide the source for the heading, sub-heading, and notification body to show the content you desire for each.
 *   Pass a customScope object containing any scope variables/functions you need to access from the included source, access these
 *   via handlers.<your handler> in your included source.
 *
 *   Each notification group can add a 'noNotificationsText' field to override the text specifically for that group. If not supplied the overall
 *   text given will be used for the group if that is supplied. Otherwise, the default empty message is displayed.
 *
 *   <br><br>
 *     The pfNotificationDrawer has stylings pre-set from Patternfly (http://www.patternfly.org/) for use within the
 *     navbar-pf and navbar-pf-vertical containers. If neither is being used, the top and height should be set such that the
 *     drawer will take up the entire viewport vertically. For instance:<br>
 *     <p style="margin-left: 20px;">
 *       .my-nav-container .drawer-pf {<br>
 *       &nbsp;&nbsp;height: calc(~"100vh - 46px");<br>
 *       &nbsp;&nbsp;top: 26px;</br>
 *       }
 *     </p>
 *     Note, this should be bottom aligned with the trigger, and leave a 20px at the bottom of the viewport.
 *   <br><br>
 *
 * @param {boolean} drawerHidden Flag if the drawer is currently hidden
 * @param {boolean} allowExpand Flag if the drawer can be expanded. Optional, default: false
 * @param {boolean} drawerExpanded Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
 * @param {string}  drawerTitle  Title to display for the drawer (leaving this blank will remove the provided expand capability)
 * @param {object} notificationGroups Collection notification groups to add to the drawer. Alternatively, a single group object can be given if categorization is not used.
 * @param {string} notificationTrackField Optional field from the notifications to use to track by in the notifications listing ($index used otherwise).
 * @param {function} onClose function() Callback for the close button. Close button is shown if this callback is supplied. Callback should set drawerHidden to true to close the drawer.
 * @param {boolean} showMarkAllRead Flag if the mark all read button should be shown, optional, default is false
 * @param {function} onMarkAllRead function(notificationGroup) Callback method for the mark all read button (Optional)
 * @param {boolean} showClearAll Flag if the clear all button should be shown, optional, default is false
 * @param {function} onClearAll function(notificationGroup) Callback method for the clear all button (Optional)
 * @param {string} actionButtonTitle Text for the lower action button of the drawer (optional, if not specified there will be no action button)
 * @param {function} actionButtonCallback function(notificationGroup) Callback method for action button for each group, the notificationGroup is passed (Optional)
 * @param {string} titleInclude Include src for the title area for the notification drawer, use this to customize the drawer title area
 * @param {string} headingInclude Include src for the heading area for each notification group, access the group via notificationGroup
 * @param {string} subheadingInclude Include src for the sub-heading area for each notification group, access the group via notificationGroup
 * @param {string} notificationBodyInclude Include src for the notification body for each notification, access the notification via notification
 * @param {string} notificationFooterInclude Include src for the notification footer for each notification, access the notification via notification
 * @param {string} noNotificationsText Text to show when there are no notifications. Optional.
 * @param {object} customScope Object containing any variables/functions used by the included src, access via $ctrl.customScope.<xxx>
 *
 * @example
 <example module="patternfly.notification.demo" deps="patternfly.utils, patternfly.filters, patternfly.sort, patternfly.views">
 <file name="index.html">
   <div ng-controller="DrawerCtrl" class="row example-container">
     <div class="col-md-12 pre-demo-text">
       <label>Click the notifications indicator to show the Notification Drawer: </label>
     </div>
     <div class="navbar-pf-vertical">
       <nav class="collapse navbar-collapse">
         <ul class="nav navbar-nav navbar-left navbar-iconic">
           <li class="drawer-pf-trigger dropdown" ng-class="{'open': !hideDrawer}">
             <a class="nav-item-iconic drawer-pf-trigger-icon" ng-click="toggleShowDrawer()">
               <span class="fa fa-bell" title="Notifications"></span>
               <span ng-if="unreadNotifications" class="badge badge-pf-bordered"> </span>
             </a>
           </li>
         </ul>
       </nav>
     </div>
     <div class="layout-pf-fixed">
       <div class="navbar-pf-vertical">
         <pf-notification-drawer drawer-hidden="hideDrawer" drawer-title="Notifications Drawer" allow-expand="true"
              notification-groups="groups" on-close="closeDrawer"
              show-mark-all-read="true" on-mark-all-read="markAllRead"
              show-clear-all="true" on-clear-all="clearAll"
              heading-include="heading.html" subheading-include="subheading.html" notification-body-include="notification-body.html"
              notification-footer-include="notification-footer.html" custom-scope="customScope" notification-track-field="uid">
         </pf-notification-drawer>
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
 <file name="notification-footer.html">
 </file>
 <file name="notification-body.html">
   <div uib-dropdown class="dropdown pull-right dropdown-kebab-pf" ng-if="notification.actions && notification.actions.length > 0">
     <button uib-dropdown-toggle class="btn btn-link dropdown-toggle" type="button" id="dropdownKebabRight" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
       <span class="fa fa-ellipsis-v"></span>
     </button>
     <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebabRight">
       <li ng-repeat="action in notification.actions"
           role="{{action.isSeparator === true ? 'separator' : 'menuitem'}}"
           ng-class="{'divider': action.isSeparator === true, 'disabled': action.isDisabled === true}">
         <a ng-if="action.isSeparator !== true" class="secondary-action" title="{{action.title}}" ng-click="$ctrl.customScope.handleAction(notification, action)">
           {{action.name}}
         </a>
       </li>
     </ul>
   </div>
   <span ng-if="notification.status" class="{{'pull-left ' + $ctrl.customScope.getNotficationStatusIconClass(notification)}}" ng-click="$ctrl.customScope.markRead(notification)"></span>
   <div class="drawer-pf-notification-content" ng-click="$ctrl.customScope.markRead(notification)">
     <span class="drawer-pf-notification-message" tooltip-append-to-body="true" tooltip-popup-delay="500" tooltip-placement="bottom" tooltip="{{notification.message}}">
      {{notification.message}}
     </span>
     <div class="drawer-pf-notification-info" ng-click="$ctrl.customScope.markRead(notification)">
       <span class="date">{{notification.timeStamp | date:'MM/dd/yyyy'}}</span>
       <span class="time">{{notification.timeStamp | date:'h:mm:ss a'}}</span>
     </div>
   </div>
 </file>
 <file name="modules.js">
   angular.module('patternfly.notification.demo', ['patternfly.notification','patternfly.views']);
 </file>

 <file name="script.js">
   angular.module('patternfly.notification.demo').controller('DrawerCtrl', ['$scope',
     function ($scope) {
       var currentTime = (new Date()).getTime();

       var updateUnreadStatus = function() {
         $scope.unreadNotifications = _.find($scope.groups, function(group) {
           return _.find(group.notifications, {unread: true});
         });
       };

       $scope.hideDrawer = true;
       $scope.toggleShowDrawer = function () {
         $scope.hideDrawer = !$scope.hideDrawer;
       };

       $scope.closeDrawer = function() {
         $scope.hideDrawer = true;
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
               uid: 1,
               unread: true,
               message: "A New Event! Huzzah! Bold.",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               uid: 2,
               unread: true,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               uid: 3,
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               uid: 4,
               unread: false,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               uid: 5,
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               uid: 6,
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               uid: 7,
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               uid: 8,
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               uid: 9,
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
               uid: 10,
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'info',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               uid: 11,
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               uid: 12,
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               uid: 13,
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               uid: 14,
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
           subHeading: "0 New Events",
           notifications: [],
           noNotificationsText: "No Tab 3 notifications found."
         },
         {
           heading: "Notification Tab 4",
           subHeading: "3 New Events",
           notifications: [
             {
               uid: 15,
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               uid: 16,
               unread: true,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               uid: 17,
               unread: false,
               message: "Another Event Notification",
               status: 'ok',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               uid: 18,
               unread: false,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               uid: 19,
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
               uid: 20,
               unread: true,
               message: "A New Event! Huzzah! Bold",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (1 * 60 * 60 * 1000)
             },
             {
               uid: 21,
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (2 * 60 * 60 * 1000)
             },
             {
               uid: 22,
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (10 * 60 * 60 * 1000)
             },
             {
               uid: 23,
               unread: false,
               message: "Another Event Notification",
               status: 'warning',
               actions: menuActions,
               timeStamp: currentTime - (12 * 60 * 60 * 1000)
             },
             {
               uid: 24,
               unread: true,
               message: "Another Event Notification",
               status: 'error',
               actions: menuActions,
               timeStamp: currentTime - (240 * 60 * 60 * 1000)
             }
           ]
         },
         {
           heading: "Notification Tab 6",
           subHeading: "0 New Events",
           notifications: []
         },
       ];

       updateUnreadStatus();
       $scope.actionsText = "";

       $scope.markAllRead = function (group) {
         $scope.actionsText = "Mark all read: " + group.heading + "\n" + $scope.actionsText;
         angular.forEach(group.notifications, function(nextNotification) {
           nextNotification.unread = false;
         });
         group.subHeading =  "0 New Events";
         updateUnreadStatus();
       };

       $scope.clearAll = function (group) {
         $scope.actionsText = "Clear all: " + group.heading + "\n" + $scope.actionsText;
         group.notifications = [];
         group.subHeading = "0 New Events";
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

       $scope.customScope.markRead = function (notification) {
         if (notification.unread) {
           notification.unread = false;
           $scope.actionsText = "Mark notification read" + "\n" + $scope.actionsText;
           var notificationGroup = $scope.groups.find(function(group) {
             return group.notifications.find(function(nextNotification) {
               return notification === nextNotification;
             });
           });
           var unread = notificationGroup.notifications.filter(function(nextNotification) {
             return nextNotification.unread;
           });
           notificationGroup.subHeading =  unread.length + " New Events";
           updateUnreadStatus();
         }
       };

     }
   ]);
 </file>
</example>
*/
