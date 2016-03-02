/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfUtilizationTrendChart
 *
 * @description
 *   Directive for rendering a utilization trend chart. The utilization trend chart combines overall
 *   data with a pfDonutPctChart and a pfSparklineChart. Add the options for the pfDonutChart via
 *   the donutConfig parameter. Add the options for the pfSparklineChart via the sparklineConfig
 *   parameter.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration settings for the utilization trend chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.title        - title of the Utilization chart
 * <li>.units        - unit label for values, ex: 'MHz','GB', etc..
 * </ul>
 *
 * @param {object} donutConfig configuration settings for the donut pct chart, see pfDonutPctChart for specifics<br/>
 * @param {object} sparklineConfig configuration settings for the sparkline chart, see pfSparklineChart for specifics<br/>
 *
 * @param {object} chartData the data to be shown in the donut and sparkline charts<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * <li>.xData  - Array, X values for the data points, first element must be the name of the data
 * <li>.yData  - Array, Y Values for the data points, first element must be the name of the data
 * <li>.dataAvailable - Flag if there is data available - default: true
 * </ul>
 *
 * @param {string=} donutCenterLabel specifies the contents of the donut's center label.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'used'      - displays the Used amount in the center label (default)
 * <li> 'available' - displays the Available amount in the center label
 * <li> 'percent'   - displays the Usage Percent of the Total amount in the center label
 * <li> 'none'      - does not display the center label
 * </ul>
 * @param {int=} sparklineChartHeight   height of the sparkline chart
 * @param {boolean=} showSparklineXAxis override sparkline config settings for showing the X Axis
 * @param {boolean=} showSparklineYAxis override sparkline config settings for showing the Y Axis

 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
       <div class="col-md-12">
         <label class="label-title">Used Donut Center Label</label>
         <div pf-utilization-trend-chart config="config"
              chart-data="data" center-label="usedCenterLabel"
              donut-config="usedDonutConfig" sparkline-config="usedSparklineConfig"
              sparkline-chart-height="60">
         </div>
       </div>
       <div class="col-md-12">
         <br/>
         <label class="label-title">Available Donut Center Label</label>
         <div pf-utilization-trend-chart config="config"
              chart-data="data" center-label="availableCenterLabel"
              donut-config="availableDonutConfig" sparkline-config="availableSparklineConfig"
              sparkline-chart-height="60">
         </div>
       </div>
       <div class="col-md-12">
         <br/>
         <label class="label-title">Percent Donut Center Label</label>
         <div pf-utilization-trend-chart config="config"
              chart-data="data" center-label="percentCenterLabel"
              donut-config="percentDonutConfig" sparkline-config="percentSparklineConfig"
              sparkline-chart-height="60">
         </div>
       </div>
       <div class="col-md-12">
         <br/>
         <label class="label-title">No Donut Center Label</label>
         <div pf-utilization-trend-chart config="config"
              chart-data="data" center-label="noneCenterLabel"
              donut-config="noneDonutConfig" sparkline-config="noneSparklineConfig"
              sparkline-chart-height="60"
              show-sparkline-x-axis="true"
              show-sparkline-y-axis="true">
         </div>
       </div>
       <div class="col-md-12">
         <br/>
         <label class="label-title">No Data Available</label>
         <div pf-utilization-trend-chart config="config"
              chart-data="noData" center-label="noneCenterLabel"
              donut-config="noneDonutConfig" sparkline-config="noneSparklineConfig"
              sparkline-chart-height="60">
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
     $scope.config = {
       title: 'Memory',
       units: 'GB'
     };

     $scope.usedDonutConfig = {
       chartId: 'usedChart',
       thresholds: {'warning':'60','error':'90'}
     };
     $scope.availableDonutConfig = {
       chartId: 'availableChart',
       thresholds: {'warning':'60','error':'90'}
     };
     $scope.percentDonutConfig = {
       chartId: 'percentChart',
       thresholds: {'warning':'60','error':'90'}
     };
     $scope.noneDonutConfig = {
       chartId: 'noneChart',
       thresholds: {'warning':'60','error':'90'}
     };

     $scope.usedSparklineConfig = {
       'chartId': 'usedExampleSparkline',
       'tooltipType': 'default',
       'units': 'GB'
     };
     $scope.availableSparklineConfig = {
       'chartId': 'availableExampleSparkline',
       'tooltipType': 'default',
       'units': 'GB'
     };
     $scope.percentSparklineConfig = {
       'chartId': 'percentExampleSparkline',
       'tooltipType': 'default',
       'units': 'GB'
     };
     $scope.noneSparklineConfig = {
       'chartId': 'noneExampleSparkline',
       'tooltipType': 'default',
       'units': 'GB'
     };

    var today = new Date();
    var dates = ['dates'];
    for (var d = 20 - 1; d >= 0; d--) {
        dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }

     $scope.usedCenterLabel = 'used';
     $scope.availableCenterLabel = 'available';
     $scope.percentCenterLabel = 'percent';
     $scope.noneCenterLabel = 'none';

     $scope.data = {
         dataAvailable: true,
         used: 76,
         total: 100,
         xData: dates,
         yData: ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
     };
     $scope.noData = {
        dataAvailable: false,
     };
   });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfUtilizationTrendChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartData: '=',
      config: '=',
      centerLabel: '=?',
      donutConfig: '=',
      sparklineConfig: '=',
      sparklineChartHeight: '=?',
      showSparklineXAxis: '=?',
      showSparklineYAxis: '=?'
    },
    replace: true,
    templateUrl: 'charts/utilization-trend/utilization-trend-chart.html',
    controller: ['$scope',
      function ($scope) {
        if ($scope.centerLabel === undefined) {
          $scope.centerLabel = 'used';

        }
        if ($scope.donutConfig.units === undefined) {
          $scope.donutConfig.units = $scope.config.units;
        }
        if ($scope.chartData.available === undefined) {
          $scope.chartData.available = $scope.chartData.total - $scope.chartData.used;
        }
        $scope.config.units = $scope.config.units || $scope.units;
      }
    ],
    link: function (scope, element) {
      var setupCurrentValues = function () {
        if (scope.centerLabel === 'available') {
          scope.currentValue = scope.chartData.used;
          scope.currentText = 'Used';
        } else {
          scope.currentValue = scope.chartData.total - scope.chartData.used;
          scope.currentText = 'Available';
        }
      };
      scope.$watchGroup(['centerLabel', 'chartData.used', 'chartData.available', 'chartData.total'], function () {
        setupCurrentValues();
      });
    }
  };
});
