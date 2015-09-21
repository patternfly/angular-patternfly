/**
 * @ngdoc directive
 * @name patternfly.card.directive:pfCard
 * @restrict A
 * @element ANY
 * @param {string} headTitle Title for the card
 * @param {string=} subTitle Sub-Title for the card
 * @param {boolean=} showTopBorder Show/Hide the blue top border. True shows top border, false (default) hides top border
 * @param {boolean=} showBottomBorder Show/Hide the bottom grey line between the title and sub-title.
 * True (default) shows the line, false hides the line
 *
 * @description
 * Directive for easily displaying a card with html content
 *
 * @example
 <example module="test">

 <file name="index.html">
    <div pf-card head-title="My Card Title" sub-title="My card subtitle">
      <button>Click Me</button>
    </div>

    <div pf-card head-title="Card With Top Border" sub-title="My card subtitle" show-top-border="true">
      <button>Click Me</button>
    </div>

    <div ng-controller="ChartCtrl">
      <div pf-card head-title="Performance" sub-title="Last 30 Days" show-top-border="false"
           show-bottom-border="false" style="width: 60%">
        <div pf-trends-chart config="configVirtual" chart-data="dataVirtual"></div>
        <div pf-trends-chart config="configPhysical" chart-data="dataPhysical"></div>
        <div pf-trends-chart config="configMemory" chart-data="dataMemory"></div>
      </div>
    </div>
 </file>
 <file name="script.js">
 angular.module( 'test', ['patternfly.charts', 'patternfly.card'] ).controller( 'ChartCtrl', function( $scope ) {

       var today = new Date();
       var dates = ['dates'];
       for (var d = 20 - 1; d >= 0; d--) {
         dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
       }

       $scope.configVirtual = {
         'chartId'      : 'virtualTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Virtual Disk I/O',
         'units'        : 'GB',
         'tooltipType'  : 'percentage'
       };

       $scope.dataVirtual = {
           'total': '250',
           'xData': dates,
           'yData': ['used', '90', '20', '30', '20', '20', '10', '14', '20', '25', '68', '44', '56', '78', '56', '67', '88', '76', '65', '87', '76']
       };

       $scope.configPhysical = {
         'chartId'      : 'physicalTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Physical Disk I/O',
         'units'        : 'MHz',
         'tooltipType'  : 'percentage'
       };

       $scope.dataPhysical = {
           'total': '250',
           'xData': dates,
           'yData': ['used', '20', '20', '35', '20', '20', '87', '14', '20', '25', '28', '44', '56', '78', '56', '67', '88', '76', '65', '87', '16']
       };

       $scope.configMemory = {
         'chartId'      : 'memoryTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Memory Utilization',
         'units'        : 'GB',
         'tooltipType'  : 'percentage'
       };

       $scope.dataMemory = {
           'total': '250',
           'xData': dates,
           'yData': ['used', '20', '20', '35', '70', '20', '87', '14', '95', '25', '28', '44', '56', '66', '16', '67', '88', '76', '65', '87', '56']
       };
     });
 </file>
 </example>
 */
angular.module('patternfly.card').directive('pfCard', function () {
  'use strict';

  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headTitle: '@',
      subTitle: '@?',
      showTopBorder: '@?',
      showBottomBorder: '@?'
    }
  };
});


