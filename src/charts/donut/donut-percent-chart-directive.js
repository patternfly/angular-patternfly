/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfDonutPctChart
 *
 * @description
 *   Directive for rendering a percentage used donut/radial chart.  The Used Percentage fill starts at 12 o’clock and
 *   moves clockwise.  Whatever portion of the donut not Used, will be represented as Available, and rendered as a
 *   gray fill.
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *   The directive will calculate the Available Percentage (Total - Used), and display it as a grey radial fill.
 *
 * @param {object} config configuration settings for the donut chart:<br/>
 * <strong>config</strong>
 * <ul style='list-style-type: none'>
 * <li>.chartId       - the ID iof the container that the chart should bind to
 * <li>.totalUnits    - unit label for values, ex: 'MHz','GB', etc..
 * <li>.usageDataName - suffix used in label inside of donut, ex: 'Used','Allocated', etc..
 * <li>.thresholds    - warning and error percentage thresholds used to determine the Usage Percentage fill color
 * </ul>
 *
 * @param {object} data the Total and Used values for the donut chart.  Available is calculated as Total - Used.<br/>
 * <strong>data</strong>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @example
 <example module="patternfly.charts">
 <file name="index.html">
   <div ng-controller="ChartCtrl">
     <div pf-donut-pct-chart config="config" data="data"></div>
   </div>
 </file>

 <file name="script.js">
   function ChartCtrl($scope) {
        $scope.config = {
           'chartId': 'cpuUsageChart',
           'totalUnits': 'MHz',
           'usageDataName': 'Used',
           'thresholds':{'warning':'75.0','error':'90.00'}
       };

       $scope.data = {
           'used': '950',
           'total': '1000'
       };

   };
 </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfDonutPctChart', ['ChartsMixin', '$timeout',
  function(chartsMixin, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '=',
      },
      replace: true,
      templateUrl: 'charts/donut/donut-percent-chart.html',
      controller: ['$scope',
        function($scope) {
          $scope.donutChartId = 'donutChart';
          if ($scope.config.chartId) {
            $scope.donutChartId = $scope.config.chartId + $scope.donutChartId;
          }
          if ($scope.data.available === undefined) {
            $scope.data.available = $scope.data.total - $scope.data.used;
          }
          $scope.getStatusColor = function(used, thresholds) {
            if (!thresholds){
              return '#0088CE';
            } else {
              if (used >= thresholds.error) {
                return '#CC0000';
              } else if (used >= thresholds.warning) {
                return '#EC7A08';
              } else {
                return '#0088CE';
              }
            }
          };
          $scope.statusDonutColor = function(scope) {
            var color = {
              pattern: []
            };
            var percentUsed = scope.data.used / scope.data.total * 100.0;
            color.pattern[0] = scope.getStatusColor(percentUsed, scope.config.thresholds);
            color.pattern[1] = '#D1D1D1';
            return color;
          };
          var donutTooltip = {
            contents: function(d) {
              return '<span class="c3-tooltip-sparkline" style="white-space: nowrap;">' + Math.round(d[0].ratio * 100) + '%:</span>' + '<span class="c3-tooltip-sparkline" style="white-space: nowrap;">' + d[0].value + ' ' + $scope.config.totalUnits + ' ' + d[0].name + '</span>';
            }
          };
          $scope.getDonutData = function(scope) {
            return {
              columns: [
                ['Used', scope.data.used],
                ['Available', scope.data.available]
              ],
              type: 'donut',
              donut: {
                label: {
                  show: false
                }
              },
              groups: [
                ['used', 'available']
              ],
              order: null
            };
          };
          $scope.defaultDonutConfig = chartsMixin.getDefaultRadialConfig($scope.config.totalUnits);
          $scope.defaultDonutConfig.color = $scope.statusDonutColor($scope);
          $scope.defaultDonutConfig.tooltip = donutTooltip;
          $scope.config.donutConfig = $.extend(true, angular.copy($scope.defaultDonutConfig), $scope.config.donutConfig);
          $scope.config.donutConfig.data = $scope.getDonutData($scope);
        }],
      link: function(scope, element, attrs) {
        attrs.$observe('config', function() {
          scope.config.donutConfig = $.extend(true, angular.copy(scope.defaultDonutConfig), scope.config.donutConfig);
          scope.config.donutConfig.data = scope.getDonutData(scope);
          setupDonutChartTitle();
        });
        attrs.$observe('donutConfig', function() {
          scope.config.donutConfig = $.extend(true, angular.copy(scope.defaultDonutConfig), scope.config.donutConfig);
          scope.config.donutConfig.data = scope.getDonutData(scope);
          setupDonutChartTitle();
        });
        attrs.$observe('data', function() {
          scope.config.donutConfig.data = scope.getDonutData(scope);
          setupDonutChartTitle();
        });

        var setupDonutChartTitle = function() {
          $timeout(function() {
            var donutChartTitle = element[0].querySelector('text.c3-chart-arcs-title');
            donutChartTitle.innerHTML = '<tspan dy="0" x="0" class="utilization-chart-title-big">' + scope.data.used + '</tspan>' + '<tspan dy="20" x="0" class="utilization-chart-title-small">' + scope.config.totalUnits + ' ' + scope.config.usageDataName + '</tspan>';
          }, 100);
        };
      }
    };
  }]);
