/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfTrendChart
 *
 * @description
 *   Directive for rendering a trend chart. The trend chart combines overall data with a
 *   pfSparklineChart.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.<br>
 *   See also: {@link patternfly.charts.directive:pfSparklineChart}
 *
 * @param {object} config configuration settings for the trend chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId    - the unique id of this trend chart
 * <li>.title      - (optional) title of the trend chart
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
 * </ul>
 *
 * @param {int=} chartHeight   height of the sparkline chart
 * @param {boolean=} showXAxis override sparkline config settings for showing the X Axis
 * @param {boolean=} showYAxis override sparkline config settings for showing the Y Axis
 * @example
 <example module="patternfly.charts">
 <file name="index.html">
   <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
     <div class="col-md-12">
       <div pf-trend-chart config="config" chart-data="data"
            show-x-axis="custShowXAxis" show-y-axis="custShowYAxis"></div>
     </div>
     <hr class="col-md-12">
     <div class="col-md-12">
     <div class="row">
       <div class="col-md-4">
         <form role="form"">
           <div class="form-group">
             <label>Show</label></br>
             <label class="checkbox-inline">
               <input type="checkbox" ng-model="custShowXAxis">X Axis</input>
             </label>
             <label class="checkbox-inline">
               <input type="checkbox" ng-model="custShowYAxis">Y Axis</input>
             </label>
           </div>
         </form>
       </div>
       <div class="col-md-3">
         <form role="form" >
           <div class="form-group">
             <label>Layout</label></br>
             <select pf-select class="pf-select-sm" ng-model="layout" id="layout">
               <option value="large" ng-selected="true" selected>Large</option>
               <option value="small">Small</option>
               <option value="compact">Compact</option>
               <option value="inline">Inline</option>
             </select>
           </div>
         </form>
       </div>
       <div class="col-md-3">
         <form role="form" ng-hide="layout == 'inline'">
           <div class="form-group">
             <label>Title Value Type</label></br>
             <select pf-select class="pf-select-sm" ng-model="valueType" id="valueType">
               <option value="actual" ng-selected="true" selected>Actual</option>
               <option value="percentage">Percentage</option>
             </select>
           </div>
         </form>
       </div>
       <div class="col-md-2">
         <button ng-click="addDataPoint()">Add Data Point</button>
       </div>
     </div>
   </div>
 </file>
 <file name="script.js">
 angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {

       $scope.config = {
         'chartId'      : 'exampleTrendChart',
         'title'        : 'Network Utilization Trend',
         'layout'       : 'large',
         'trendLabel'   : 'Virtual Disk I/O',
         'valueType'    : 'actual',
         'timeFrame'    : 'Last 15 Minutes',
         'units'        : 'MHz',
         'tooltipType'  : 'percentage'
       };

      var today = new Date();
      var dates = ['dates'];
      for (var d = 20 - 1; d >= 0; d--) {
          dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
      }

       $scope.data = {
           'total': '250',
           'xData': dates,
           'yData': ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
       };

       $scope.custShowXAxis = false;
       $scope.custShowYAxis = false;

       $scope.addDataPoint = function () {
         $scope.data.xData.push(new Date($scope.data.xData[$scope.data.xData.length - 1].getTime() + (24 * 60 * 60 * 1000)));
         $scope.data.yData.push(Math.round(Math.random() * 100));
       };

       $scope.$watch('valueType', function (newValue) {
         $scope.config.valueType = newValue;
       });

       $scope.$watch('layout', function (newValue) {
         $scope.config.layout = newValue;
       });

     });
 </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfTrendChart',
  function () {
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
      templateUrl: 'charts/trend/trend-chart.html',
      controller: function ($scope) {
        var SMALL = 30, LARGE = 60;

        $scope.getPercentageValue = function () {
          return Math.round($scope.getLatestValue() / $scope.chartData.total * 100.0);
        };
        $scope.getLatestValue = function () {
          return $scope.chartData.yData[$scope.chartData.yData.length - 1];
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
  }
);
