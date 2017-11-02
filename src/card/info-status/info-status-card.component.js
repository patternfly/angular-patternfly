/**
 * @ngdoc directive
 * @name patternfly.card.component:pfInfoStatusCard
 * @restrict E
 *
 * @param {object} status Status configuration information<br/>
 * <ul style='list-style-type: none'>
 * <li>.title         - the main title of the info status card
 * <li>.href          - the href to navigate to if one clicks on the title or count
 * <li>.iconClass     - an icon to display to the left of the count
 * <li>.iconImage     - an image to display to the left of Infrastructure
 * <li>.info          - an array of strings to display, each element in the array is on a new line, accepts HTML content
 * </ul>
 * @param {boolean=} show-top-border Show/hide the top border, true shows top border, false (default) hides top border
 * @param {boolean} htmlContent Flag to allow HTML content within the info options
 * @param {boolean=} showSpinner Show/Hide the spinner for loading state. True shows the spinner, false (default) hides the spinner
 * @param {string=} spinnerText Text for the card spinner
 * @param {string=} spinnerCardHeight Height to set for the card when data is loading and spinner is shown
 *
 * @description
 * Component for easily displaying textual information
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
   <div ng-controller="CardDemoCtrl" class="container-fluid">
     <div class="row">
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>With Top Border, Icon Class, Href</label>
         <pf-info-status-card status="infoStatus" show-top-border="true"></pf-info-status-card>
       </div>
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>No Top Border, Icon Image, No Title</label>
         <pf-info-status-card status="infoStatusTitless"></pf-info-status-card>
       </div>
     </div>
     <div class="row">
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>With HTML</label>
         <pf-info-status-card status="infoStatusAlt" html-content="true" show-spinner="dataLoading" spinner-card-height="145" spinner-text="Loading"></pf-info-status-card>
       </div>
       <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
         <label>Loading State</label>
         <pf-info-status-card status="infoStatus2" show-top-border="true" spinner-card-height="165" show-spinner="dataLoading" spinner-text="Loading"></pf-info-status-card>
       </div>
     </div>
   </div>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.card' ).controller( 'CardDemoCtrl', function( $scope, $window, $timeout ) {
    var imagePath = $window.IMAGE_PATH || "img";

    $scope.dataLoading = true;

    $scope.infoStatus = {
      "title":"TinyCore-local",
      "href":"#",
      "iconClass": "fa fa-shield",
      "info":[
        "VM Name: aapdemo002",
        "Host Name: localhost.localdomian",
        "IP Address: 10.9.62.100",
        "Power status: on"
      ]
    };

    $scope.infoStatus2 = {
        "title":"TinyCore-local",
        "iconClass": "fa fa-shield"
    };

    $scope.infoStatusTitless = {
      "iconImage": imagePath + "/OpenShift-logo.svg",
      "info":[
        "Infastructure: VMware",
        "Vmware: 1 CPU (1 socket x 1 core), 1024 MB",
        "12 Snapshots",
        "Drift History: 1"
        ]
    };

    $scope.infoStatusAlt = {};

    $timeout(function () {
      $scope.dataLoading = false;

      $scope.infoStatus2 = {
        "title":"TinyCore-local",
        "href":"#",
        "iconClass": "fa fa-shield",
        "info":[
          "VM Name: aapdemo002",
          "Host Name: localhost.localdomian",
          "IP Address: 10.9.62.100",
          "Power status: on"
        ]
      };

      $scope.infoStatusAlt = {
        "title":"Favorite Things",
        "iconClass":"fa fa-heart",
        "info":[
          "<i class='fa fa-coffee'>",
          "<i class='fa fa-motorcycle'>",
          "<b>Tacos</b>"
        ]
      };
    }, 6000 );
   });
 </file>

 </example>
 */

angular.module( 'patternfly.card' ).component('pfInfoStatusCard', {
  bindings: {
    status: '=',
    showTopBorder: '@?',
    showSpinner: '<?',
    spinnerText: '@?',
    spinnerCardHeight: '@?',
    htmlContent: '@?'
  },
  templateUrl: 'card/info-status/info-status-card.html',
  controller: function ($sce) {
    'use strict';
    var ctrl = this;
    ctrl.$onInit = function () {
      ctrl.shouldShowTopBorder = (ctrl.showTopBorder === 'true');
      ctrl.shouldShowHtmlContent = (ctrl.htmlContent === 'true');
      ctrl.showSpinner = ctrl.showSpinner === true;
      ctrl.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
      };

      if (ctrl.spinnerCardHeight) {
        ctrl.spinnerHeight = {'height': ctrl.spinnerCardHeight};
      }
    };
  }
});
