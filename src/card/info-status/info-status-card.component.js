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
 *
 * @description
 * Component for easily displaying textual information
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
   <div ng-controller="CardDemoCtrl" style="display:inline-block;">
     <div class="col-md-10">
       <label>With Top Border, Icon Class, Href</label>
       <pf-info-status-card status="infoStatus" show-top-border="true"></pf-info-status-card>
       <br/>
       <label>No Top Border, Icon Image, No Title</label>
       <pf-info-status-card status="infoStatusTitless"></pf-info-status-card>
       <br/>
       <label>With HTML</label>
       <pf-info-status-card status="infoStatusAlt" html-content="true"></pf-info-status-card>
     </div>
   </div>
 </file>

 <file name="script.js">
   angular.module( 'patternfly.card' ).controller( 'CardDemoCtrl', function( $scope ) {
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

    $scope.infoStatusTitless = {
      "iconImage":"img/OpenShift-logo.svg",
      "info":[
        "Infastructure: VMware",
        "Vmware: 1 CPU (1 socket x 1 core), 1024 MB",
        "12 Snapshots",
        "Drift History: 1"
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
   });
 </file>

 </example>
 */

angular.module( 'patternfly.card' ).component('pfInfoStatusCard', {
  bindings: {
    status: '=',
    showTopBorder: '@?',
    htmlContent: '@?'
  },
  templateUrl: 'card/info-status/info-status-card.html',
  controller: function ($sce) {
    'use strict';
    var ctrl = this;
    ctrl.$onInit = function () {
      ctrl.shouldShowTopBorder = (ctrl.showTopBorder === 'true');
      ctrl.shouldShowHtmlContent = (ctrl.htmlContent === 'true');
      ctrl.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
      };
    };
  }
});
