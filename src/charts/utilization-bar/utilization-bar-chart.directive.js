/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfUtilizationBarChart
 *
 * @description
 *   Directive for rendering a utilization bar chart
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *
 * @param {object} chartData the data to be shown in the utilization bar chart<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @param {description=} description chart description
 * @param {units=} units to be displayed on the chart
 * @param {tooltip-title=} tooltip-title to be displayed on the used portion of the bar chart
 * @param {thresholds=} thresholds warning and error percentage thresholds used to determine the Usage Percentage fill color (optional)
 *
 * @example
 <example module="patternfly.example">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div pf-utilization-bar-chart chart-data=data1 description=title1 units=units1 tooltip-text=tooltip1 thresholds=thresholds></div>
       <hr>
       <div pf-card head-title="Utilization Bar Chart Card">
         <div pf-utilization-bar-chart chart-data=data1 description=title1 units=units1 tooltip-text=tooltip1></div>
         <div pf-utilization-bar-chart chart-data=data1 description=title1 units=units1 tooltip-text=tooltip1 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data2 description=title2 units=units2 tooltip-text=tooltip2 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data3 description=title3 units=units3 thresholds=thresholds></div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.example', ['patternfly.charts', 'patternfly.card']);

   angular.module( 'patternfly.example' ).controller( 'ChartCtrl', function( $scope ) {

    $scope.thresholds = {'warning':'60','error':'85'};

    $scope.data1 = {
      'used': '8',
      'total': '24'
    };
    $scope.title1 = 'Usage';
    $scope.units1 = 'GB';
    $scope.tooltip1 = '8 GB Used';

    $scope.data2 = {
      'used': '75',
      'total': '100'
    };
    $scope.title2 = 'CPU Usage';
    $scope.units2 = '%';
    $scope.tooltip2 = '75% Used';

    $scope.data3 = {
      'used': '450',
      'total': '500',
    };
    $scope.title3 = 'Disk Usage';
    $scope.units3 = 'TB';
   });
   </file>
 </example>
*/

angular.module('patternfly.charts').directive('pfUtilizationBarChart',
  function ($timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        chartData: '=',
        description: '=',
        units: '=',
        thresholds: '=?',
        tooltipText: '=?',
      },
      replace: true,
      templateUrl: 'charts/utilization-bar/utilization-bar-chart.html',
      link: function (scope) {
        var getStatusColor = function (used, thresholds) {
          var color = '#0088CE';
          if (thresholds) {
            color = '#3f9c35';
            if (used >= thresholds.error) {
              color = '#CC0000';
            } else if (used >= thresholds.warning) {
              color = '#EC7A08';
            }
          }
          return color;
        };

        scope.$watch('chartData', function (newVal, oldVal) {
          if (typeof(newVal) !== 'undefined') {
            //Calculate the percentage used
            scope.chartData.percentageUsed = 100 * (scope.chartData.used / scope.chartData.total);

            //Get the color for the chart
            scope.chartColor = getStatusColor(scope.chartData.percentageUsed, scope.thresholds);

            //Animate in the chart load.
            scope.animate = true;
            $timeout(function () {
              scope.animate = false;
            }, 0);
          }
        });


      }
    };
  }
);
