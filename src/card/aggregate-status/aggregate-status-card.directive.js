/**
 * @ngdoc directive
 * @name patternfly.card:pfAggregateStatusCard
 * @restrict A
 * @element ANY
 * @param {object} status Status configuration information<br/>
 * <ul style='list-style-type: none'>
 * <li>.title         - the main title of the aggregate status card
 * <li>.count         - the number count of the main statuses
 * <li>.href          - the href to navigate to if one clicks on the title or count
 * <li>.iconClass     - an icon to display to the left of the count
 * <li>.notifications - an array of status icons & counts
 *   <ul style='list-style-type: none'>
 *   <li>.iconClass   - an icon to display to the right of the notification count
 *   <li>.count         - the number count of the notification status
 *   <li>.href          - href to navigate to if one clicks on the notification status icon or count
 *   <li>.id            - unique id of the notificaiton status, appended to the .href
 *   </ul>
 * </ul>
 * @param {boolean=} show-top-border Show/hide the top border, true shows top border, false (default) hides top border
 * @param {boolean=} alt-layout Display the aggregate status card in a 'alternate tall' layout.  false (default) displays normal layout, true displays tall layout
 *
 * @description
 * Directive for easily displaying status information
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
   <div ng-controller="CardDemoCtrl">
     <h4>Aggregate Status Card - With Top Border<h4>
     <div pf-aggregate-status-card status="status" show-top-border="true"></div>
     <h4>Aggregate Status Card - No Top Border<h4>
     <div pf-aggregate-status-card status="status"></div>
     <h4>Aggregate Status Card - Alternate Layout<h4>
     <div pf-aggregate-status-card status="aggStatus" show-top-border="true" alt-layout="true"></div>
   </div>
 </file>

 <file name="script.js">
   angular.module( 'patternfly.card' ).controller( 'CardDemoCtrl', function( $scope ) {
    $scope.status = {
      "title":"Nodes",
      "count":793,
      "href":"#",
      "iconClass": "fa fa-shield",
      "notifications":[
        {
          "iconClass":"pficon pficon-error-circle-o",
          "count":4,
          "href":"#"
        },
        {
          "iconClass":"pficon pficon-warning-triangle-o",
          "count":1
        }
      ]
    };

    $scope.aggStatus = {
      "title":"Providers",
      "count":3,
      "notifications":[
        {
          "iconClass":"pficon pficon-openshift",
          "count":1,
          "href":"#"
        },
        {
          "iconClass":"pficon pficon-kubernetes",
          "count":2,
          "href":"#"
        }
      ]
     };
   });
 </file>

 </example>
 */

angular.module( 'patternfly.card' ).directive('pfAggregateStatusCard', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      status: '=',
      showTopBorder: '@?',
      altLayout: '@?'
    },
    templateUrl: 'card/aggregate-status/aggregate-status-card.html',
    link: function (scope) {
      scope.shouldShowTopBorder = (scope.showTopBorder === 'true');
      scope.isAltLayout = (scope.altLayout === 'true');
    }
  };
});
