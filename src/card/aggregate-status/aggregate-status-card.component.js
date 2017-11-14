/**
 * @ngdoc directive
 * @name patternfly.card.component:pfAggregateStatusCard
 * @restrict E
 *
 * @param {object} status Status configuration information<br/>
 * <ul style='list-style-type: none'>
 * <li>.title         - the main title of the aggregate status card
 * <li>.count         - the number count of the main statuses
 * <li>.href          - the href to navigate to if one clicks on the title or count
 * <li>.iconClass     - an icon to display to the left of the count
 * <li>.iconImage     - an image to display to the left of the count
 * <li>.notifications - an array of status icons & counts
 *   <ul style='list-style-type: none'>
 *   <li>.iconClass   - an icon to display to the right of the notification count
 *   <li>.iconImage   - an image to display to the left of the notification count
 *   <li>.count         - the number count of the notification status
 *   <li>.href          - href to navigate to if one clicks on the notification status icon or count
 *   </ul>
 * </ul>
 * When layout='mini', only one notification can be specified:<br>
 * <ul style='list-style-type: none'>
 * <li>...
 * <li><strong>.notification</strong>  - an <em>object</em> of containing a single notification icon & count
 *   <ul style='list-style-type: none'>
 *   <li>.iconClass   - an icon to display to the right of the notification count
 *   <li>.iconImage   - an image to display to the left of the notification count
 *   <li>.count         - the number count of the notification status
 *   <li>.href          - href to navigate to if one clicks on the notification status icon or count
 *   </ul>
 * </ul>
 * @param {boolean=} show-top-border Show/hide the top border, true shows top border, false (default) hides top border
 * @param {boolean=} showSpinner Show/Hide the spinner for loading state. True shows the spinner, false (default) hides the spinner
 * @param {string=} spinnerText Text for the card spinner
 * @param {string=} spinnerCardHeight Height to set for the card when data is loading and spinner is shown
 * @param {string=} layout Various alternative layouts the aggregate status card may have:<br/>
 * <ul style='list-style-type: none'>
 * <li>'mini' displays a mini aggregate status card.  Note: when using 'mini' layout, only one notification can be specified in the status object
 * <li>'tall' displays a tall aggregate status card.  This equals the depreciated 'alt-layout' param.</li>
 * </ul>
 * @deprecated {boolean=} alt-layout Display the aggregate status card in a 'alternate tall' layout.  false (default) displays normal layout, true displays tall layout
 *
 * @description
 * Component for easily displaying status information
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
   <div ng-controller="CardDemoCtrl" class="container-fluid">
     <div class="row">
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>With Top Border</label>
         <pf-aggregate-status-card status="status" show-top-border="true" show-spinner="dataLoading" spinner-text="Loading" spinner-card-height="90"></pf-aggregate-status-card>
       </div>
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>No Top Border</label>
         <pf-aggregate-status-card status="status2"></pf-aggregate-status-card>
       </div>
     </div>
     <div class="row">
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>layout = "mini"</label>
         <pf-aggregate-status-card status="miniAggStatus" show-top-border="true" layout="mini"></pf-aggregate-status-card>
         <pf-aggregate-status-card status="miniAggStatus2" show-top-border="true" layout="mini"></pf-aggregate-status-card>
       </div>
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>layout = "tall"</label>
         <pf-aggregate-status-card status="aggStatusAlt" show-top-border="true" layout="tall"></pf-aggregate-status-card>
       </div>
     </div>
     <div class="row">
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>Alternate Layout</label>
         <br>
         <i>(depreciated, use layout = 'tall' instead)</i>
         <pf-aggregate-status-card status="aggStatusAlt" show-top-border="true" alt-layout="true"></pf-aggregate-status-card>
       </div>
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>Loading State</label>
         <br>
         <br>
         <pf-aggregate-status-card status="aggStatusAlt2" spinner-card-height="140" show-top-border="true" show-spinner="dataLoading" spinner-text="Loading" layout="tall"></pf-aggregate-status-card>
       </div>
     </div>
   </div>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.card' ).controller( 'CardDemoCtrl', function( $scope, $window, $timeout ) {
    var imagePath = $window.IMAGE_PATH || "img";

    $scope.dataLoading = true;

    $scope.status = {
      "title":"Nodes",
      "href":"#",
      "iconClass": "fa fa-shield",
      "notifications":[]
    };

      $scope.status2 = {
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
    $scope.aggStatusAlt = {
      "title":"Providers",
      "count":3,
      "notifications":[
        {
          "iconImage": imagePath + "/kubernetes.svg",
          "count":1,
          "href":"#"
        },
        {
          "iconImage": imagePath + "/OpenShift-logo.svg",
          "count":2,
          "href":"#"
        }
      ]
    };

      $scope.aggStatusAlt2 = {
        "title":"Providers",
        "notifications":[]
      };

    $timeout(function () {
      $scope.dataLoading = false;

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

      $scope.aggStatusAlt2 = {
        "title":"Providers",
        "count":3,
        "notifications":[
          {
            "iconImage": imagePath + "/kubernetes.svg",
            "count":1,
            "href":"#"
          },
          {
            "iconImage": imagePath + "/OpenShift-logo.svg",
            "count":2,
            "href":"#"
          }
        ]
      };
    }, 6000 );

    $scope.miniAggStatus = {
      "iconClass":"pficon pficon-container-node",
      "title":"Nodes",
      "count":52,
      "href":"#",
      "notification": {
        "iconClass":"pficon pficon-error-circle-o",
        "count":3
      }
    };

    $scope.miniAggStatus2 = {
      "iconClass":"pficon pficon-cluster",
      "title":"Adipiscing",
      "count":9,
      "href":"#",
      "notification":{
        "iconClass":"pficon pficon-ok"
      }
    };
   });
 </file>

 </example>
 */

angular.module( 'patternfly.card' ).component('pfAggregateStatusCard', {
  bindings: {
    status: '=',
    showTopBorder: '@?',
    showSpinner: '<?',
    spinnerText: '@?',
    spinnerCardHeight: '@?',
    altLayout: '@?',
    layout: '@?'
  },
  templateUrl: 'card/aggregate-status/aggregate-status-card.html',
  controller: function () {
    'use strict';
    var ctrl = this;
    ctrl.$onInit = function () {
      ctrl.shouldShowTopBorder = (ctrl.showTopBorder === 'true');
      ctrl.isAltLayout = (ctrl.altLayout === 'true' || ctrl.layout === 'tall');
      ctrl.isMiniLayout = (ctrl.layout === 'mini');
      ctrl.showSpinner = ctrl.showSpinner === true;

      if (ctrl.spinnerCardHeight) {
        ctrl.spinnerHeight = {'height': ctrl.spinnerCardHeight};
      }
    };
  }
});
