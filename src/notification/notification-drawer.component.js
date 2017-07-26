angular.module('patternfly.notification').component('pfNotificationDrawer', {
  bindings: {
    drawerHidden: '<',
    allowExpand: '=?',
    drawerExpanded: '=?',
    drawerTitle: '@',
    notificationGroups: '<',
    onClose: '=?',
    showMarkAllRead: '<?',
    onMarkAllRead: '=?',
    showClearAll: '<?',
    onClearAll: '=?',
    actionButtonTitle: '@',
    actionButtonCallback: '=?',
    titleInclude: '@',
    headingInclude: '@',
    subheadingInclude: '@',
    notificationBodyInclude: '@',
    notificationFooterInclude: '@',
    noNotificationsText: '@',
    customScope: '=?'
  },
  templateUrl: 'notification/notification-drawer.html',
  controller: function ($window, $timeout, $element) {
    'use strict';
    var ctrl = this;

    var setupGroups = function () {
      var openFound = false;

      if (angular.isDefined(_.get(ctrl.notificationGroups, 'notifications'))) {
        ctrl.notificationGroups = [ctrl.notificationGroups];
      }
      ctrl.singleGroup = _.size(ctrl.notificationGroups) < 2;

      angular.forEach(ctrl.notificationGroups, function (group) {
        group.emptyStateConfig = {
          icon: 'pficon-info',
          title: group.noNotificationsText || ctrl.noNotificationsText || "There are no notifications to display."
        };
      });

      angular.forEach(ctrl.notificationGroups, function (group) {
        if (group.open) {
          if (openFound) {
            group.open = false;
          } else {
            openFound = true;
          }
        }
      });
    };

    ctrl.toggleCollapse = function (selectedGroup) {
      if (selectedGroup.open) {
        selectedGroup.open = false;
      } else {
        angular.forEach(ctrl.notificationGroups, function (group) {
          group.open = false;
        });
        selectedGroup.open = true;
      }
    };

    ctrl.toggleExpandDrawer = function () {
      ctrl.drawerExpanded = !ctrl.drawerExpanded;
    };

    ctrl.$onInit = function () {
      if (!ctrl.allowExpand || angular.isUndefined(ctrl.drawerExpanded)) {
        ctrl.drawerExpanded = false;
      }

      ctrl.emptyStateConfig = {
        icon: 'pficon-info',
        title: ctrl.noNotificationsText || "There are no notifications to display."
      };

      setupGroups();
    };

    ctrl.$onChanges = function (changesObj) {
      if (changesObj.notificationGroups) {
        setupGroups();
      }

      if (changesObj.drawerHidden) {
        $timeout(function () {
          angular.element($window).triggerHandler('resize');
        }, 100);
      }
    };

    ctrl.$postLink = function () {
      if (ctrl.groupHeight) {
        $element.find('.panel-group').css("height", ctrl.groupHeight);
      }
      if (ctrl.groupClass) {
        $element.find('.panel-group').addClass(ctrl.groupClass);
      }
    };

    ctrl.hasNotifications = function (notificationGroup) {
      return _.size(_.get(notificationGroup, 'notifications')) > 0;
    };

    ctrl.hasUnread = function (notificationGroup) {
      return _.size(_.filter(_.get(notificationGroup, 'notifications'), {'unread': true})) > 0;
    };
  }
});
