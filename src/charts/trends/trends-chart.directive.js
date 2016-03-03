/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfTrendsChart
 *
 * @description
 *   Directive for rendering a trend chart. The trend chart combines overall data with a
 *   pfSparklineChart.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.<br>
 *   See also: {@link patternfly.charts.directive:pfSparklineChart}
 *
 * @param {object} config configuration settings for the trends chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId    - the unique id of this trends chart
 * <li>.title      - (optional) title of the Trends chart
 * <li>.layout     - (optional) the layout and sizes of titles and chart. Values are 'large' (default), 'small', 'compact', and 'inline'
 * <li>.trendLabel - (optional) the trend label used in the 'inline' layout
 * <li>.timeFrame  - (optional) the time frame for the data in the pfSparklineChart, ex: 'Last 30 Days'
 * <li>.units      - unit label for values, ex: 'MHz','GB', etc..
 * <li>.valueType  - (optional) the format of the latest data point which is shown in the title. Values are 'actual'(default) or 'percentage'
 * </ul>
 *
 * @param {object} chartData the data to be shown in the sparkline charts<br/>
 * <ul style='list-style-type: none'>
 * <li>.total  - number representing the total amount
 * <li>.xData  - Array, X values for the data points, first element must be the name of the data
 * <li>.yData  - Array, Y Values for the data points, first element must be the name of the data
 * <li>.dataAvailable - Flag if there is data available - default: true
 * </ul>
 *
 * @param {int=} chartHeight   height of the sparkline chart
 * @param {boolean=} showXAxis override sparkline config settings for showing the X Axis
 * @param {boolean=} showYAxis override sparkline config settings for showing the Y Axis
 * @example
 <example module="demo">
 <file name="index.html">
   <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
     <div class="col-md-12">
       <label class="label-title">Large Layout</label>
       <div pf-trends-chart config="largeConfig" chart-data="data"></div>
     </div>
     <div class="col-md-12">
       <hr class="col-md-12">
       <label class="label-title">Small Layout</label>
       <div pf-trends-chart config="smallConfig" chart-data="data"></div>
     </div>
     <div class="col-md-12">
       <hr class="col-md-12">
       <label class="label-title">Compact Layout</label>
       <div pf-trends-chart config="compactConfig" chart-data="data"></div>
     </div>
     <div class="col-md-12">
       <hr class="col-md-12">
       <label class="label-title">Inline Layout</label>
       <div pf-trends-chart config="inlineConfig" chart-data="data"></div>
     </div>
     <div class="col-md-12">
       <hr class="col-md-12">
       <label class="label-title">No Data Available</label>
       <div pf-trends-chart config="inlineConfig" chart-data="noData"></div>
     </div>
   </div>
 </file>
 <file name="script.js">
 angular.module( 'demo', ['patternfly.charts', 'patternfly.card'] ).controller( 'ChartCtrl', function( $scope ) {

       $scope.largeConfig = {
         chartId      : 'exampleTrendsChartLarge',
         title        : 'Network Utilization Trends',
         layout       : 'large',
         trendLabel   : 'Virtual Disk I/O',
         valueType    : 'actual',
         timeFrame    : 'Last 15 Minutes',
         units        : 'MHz',
         tooltipType  : 'percentage'
       };

       $scope.smallConfig = {
         chartId      : 'exampleTrendsChartSmall',
         title        : 'Network Utilization Trends',
         layout       : 'small',
         trendLabel   : 'Virtual Disk I/O',
         valueType    : 'percentage',
         timeFrame    : 'Last 15 Minutes',
         units        : 'MHz',
         tooltipType  : 'percentage'
       };

       $scope.compactConfig = {
         chartId      : 'exampleTrendsChartCompact',
         title        : 'Network Utilization Trends',
         layout       : 'compact',
         trendLabel   : 'Virtual Disk I/O',
         valueType    : 'percentage',
         timeFrame    : 'Last 15 Minutes',
         units        : 'MHz',
         tooltipType  : 'percentage'
       };

       $scope.inlineConfig = {
         chartId      : 'exampleTrendsChartInline',
         title        : 'Network Utilization Trends',
         layout       : 'inline',
         trendLabel   : 'Virtual Disk I/O',
         valueType    : 'percentage',
         timeFrame    : 'Last 15 Minutes',
         units        : 'MHz',
         tooltipType  : 'percentage'
       };

      var today = new Date();
      var dates = ['dates'];
      for (var d = 20 - 1; d >= 0; d--) {
          dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
      }

       $scope.data = {
           dataAvailable: true,
           total: 250,
           xData: dates,
           yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
       };
       $scope.noData = {
          dataAvailable: false,
       };
     });
 </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfTrendsChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=',
      chartData: '=',
      chartHeight: '=?',
      showXAxis: '=?',
      showYAxis: '=?'
    },
    replace: true,
    templateUrl: 'charts/trends/trends-chart.html',
    controller: function ($scope) {
      var SMALL = 30, LARGE = 60;

      $scope.getPercentageValue = function () {
        var pctValue = 0;

        if ($scope.chartData.dataAvailable !== false && $scope.chartData.total > 0) {
          pctValue = Math.round($scope.getLatestValue() / $scope.chartData.total * 100.0);
        }
        return pctValue;
      };
      $scope.getLatestValue = function () {
        var latestValue = 0;
        if ($scope.chartData.yData && $scope.chartData.yData.length > 0) {
          latestValue = $scope.chartData.yData[$scope.chartData.yData.length - 1];
        }
        return latestValue;
      };
      $scope.getChartHeight = function () {
        var retValue = LARGE;
        if ($scope.chartHeight) {
          retValue = $scope.chartHeight;
        } else if ($scope.config.layout === 'small') {
          retValue = SMALL;
        }
        return retValue;
      };
    },
    link: function (scope) {
      scope.$watch('config', function () {
        scope.showLargeCardLayout = (!scope.config.layout || scope.config.layout === 'large');
        scope.showSmallCardLayout = (scope.config.layout === 'small');
        scope.showActualValue = (!scope.config.valueType || scope.config.valueType === 'actual');
        scope.showPercentageValue = (scope.config.valueType === 'percentage');
      }, true);
    }
  };
});
