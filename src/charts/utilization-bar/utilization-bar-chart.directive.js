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
 * @param {object=} chart-title The title displayed on the left-hand side of the chart
 * @param {object=} layout Various alternative layouts the utilization bar chart may have:<br/>
 * <ul style='list-style-type: none'>
 * <li>.type - The type of layout to use.  Valid values are 'regular' (default) displays the standard chart layout,
 * and 'inline' displays a smaller, inline layout.</li>
 * <li>.titleLabelWidth - Width of the left-hand title label when using 'inline' layout. Example values are "120px", "20%", "10em", etc..</li>
 * <li>.usedLabelWidth - Width of the right-hand used label when using 'inline' layout. Example values are "120px", "20%", "10em", etc..</li>
 * </ul>
 * @param {string=} used-label-format The format of the used label on the right side of the bar chart. Values may be:<br/>
 * <ul style='list-style-type: none'>
 * <li>'actual' - (default) displays the standard label of '(n) of (m) (units) Used'.
 * <li>'percent' - displays a percentage label of '(n)% Used'.</li>
 * </ul>
 * @param {object=} units to be displayed on the chart. Examples: "GB", "MHz", "I/Ops", etc...
 * @param {string=} threshold-error Percent used to determine the usage error threshold fill color (red). Valid values are 1-100.
 * @param {string=} threshold-warning Percent used to determine the usage error threshold fill color (orange) Valid values are 1-100.
 *
 * @example
 <example module="patternfly.example">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div pf-utilization-bar-chart chart-data=data1 chart-title=title1 units=units1></div>
       <hr>
       <div pf-card head-title="Utilization Bar Chart">
         <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 units=units2 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 units=units3 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data4 chart-title=title4 units=units4 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 units=units5 threshold-error="85" threshold-warning="60"></div>
       </div>

       <hr>
       <label><strong>layout='inline'</strong></label>
       <div pf-card head-title="Utilization Bar Chart">
         <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 layout=layoutInline units=units2 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 layout=layoutInline units=units3 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data4 chart-title=title4 layout=layoutInline units=units4 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 layout=layoutInline units=units5 threshold-error="85" threshold-warning="60"></div>
       </div>

       <hr>
       <label><strong>layout='inline', used-label-format='percent', custom widths</strong></label>
       <div pf-card head-title="Utilization Bar Chart">
         <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 layout=layoutInlineWidths used-label-format='percent' units=units2 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 layout=layoutInlineWidths used-label-format='percent' units=units3 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data4 chart-title=title4 layout=layoutInlineWidths used-label-format='percent' units=units4 threshold-error="85" threshold-warning="60"></div>
         <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 layout=layoutInlineWidths used-label-format='percent' units=units5 threshold-error="85" threshold-warning="60"></div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.example', ['patternfly.charts', 'patternfly.card']);

   angular.module( 'patternfly.example' ).controller( 'ChartCtrl', function( $scope ) {

    $scope.title1 = 'RAM Usage';
    $scope.units1 = 'MB';

    $scope.data1 = {
      'used': '8',
      'total': '24'
    };

    $scope.title2 = 'Memory Utilization';
    $scope.units2 = 'GB';

    $scope.data2 = {
      'used': '25',
      'total': '100'
    };

    $scope.title3 = 'CPU Usage';
    $scope.units3 = 'MHz';

    $scope.data3 = {
      'used': '420',
      'total': '500',
    };

    $scope.title4 = 'Disk Usage';
    $scope.units4 = 'TB';
    $scope.data4 = {
      'used': '350',
      'total': '500',
    };

    $scope.title5 = 'Disk I/O';
    $scope.units5 = 'I/Ops';
    $scope.data5 = {
      'used': '450',
      'total': '500',
    };

    $scope.layoutInline = {
      'type': 'inline'
    };

    $scope.layoutInlineWidths = {
      'type': 'inline',
      'titleLabelWidth': '120px',
      'usedLabelWidth': '60px'
    };
   });
   </file>
 </example>
*/

angular.module('patternfly.charts').directive('pfUtilizationBarChart', function ($timeout) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartData: '=',
      chartTitle: '=',
      units: '=',
      thresholdError: '=?',
      thresholdWarning: '=?',
      usedLabelFormat: '@?',
      layout: '=?'
    },
    templateUrl: 'charts/utilization-bar/utilization-bar-chart.html',
    link: function (scope) {
      scope.$watch('chartData', function (newVal, oldVal) {
        if (typeof(newVal) !== 'undefined') {
          //Calculate the percentage used
          scope.chartData.percentageUsed = Math.round(100 * (scope.chartData.used / scope.chartData.total));

          if (scope.thresholdError || scope.thresholdWarning) {
            scope.isError = (scope.chartData.percentageUsed > scope.thresholdError);
            scope.isWarn  = (scope.chartData.percentageUsed > scope.thresholdWarning &&
                             scope.chartData.percentageUsed < scope.thresholdError);
            scope.isOk    = (scope.chartData.percentageUsed < scope.thresholdWarning);
          }

          //Animate in the chart load.
          scope.animate = true;
          $timeout(function () {
            scope.animate = false;
          }, 0);
        }
      });


    }
  };
});
