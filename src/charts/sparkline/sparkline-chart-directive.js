angular.module('patternfly.charts').directive('pfSparklineChart', ['ChartsMixin', '$timeout',
  function(chartsMixin, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '=',
      },
      replace: true,
      templateUrl: 'charts/sparkline/sparkline-chart.html',
      controller: ['$scope',
        function($scope) {
          $scope.sparklineChartId = 'sparklineChart';
          if ($scope.config.chartId) {
            $scope.sparklineChartId = $scope.config.chartId + $scope.sparklineChartId;
          }
          var utilizationSparklineTooltip = function(scope) {
            return {
              contents: function(d) {
                var percentUsed = Math.round(d[0].value / scope.data.total * 100.0);
                return '<div id="utilization-sparkline-tooltip" class="module-triangle-bottom">' + '<table class="c3-tooltip">' + '  <tbody>' + '    <tr>' + '      <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' + '    </tr>' + '    <tr>' + '      <td class="name">' + percentUsed + '%:' + '      </td>' + '      <td class="value" style="white-space: nowrap;">' + d[0].value + ' ' + scope.config.totalUnits + '_' + d[0].name + '</td>' + '    </tr>' + '  </tbody>' + '</table>' + '</div>';
              },
              position: function(data, width, height, element) {
                try {
                  var center = parseInt(element.getAttribute('x'));
                  var top = parseInt(element.getAttribute('y'));
                  var chartBox = document.querySelector('#sparklineChart').getBoundingClientRect();
                  var graphOffsetX = document.querySelector('#sparklineChart g.c3-axis-y').getBoundingClientRect().right;
                  var x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));
                  x = Math.min(x, chartBox.width - width);
                  var y = top - height;
                  return {
                    top: y,
                    left: x
                  };
                } catch (TypeError) {}
              }
            };
          };
          var utilizationSparklineAxis = {
            x: {
              show: false,
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d'
              }
            },
            y: {
              show: false
            }
          };
          $scope.getSparklineData = function(scope) {
            var usage = [scope.config.usageDataName];
            var dates = ['dates'];
            if (scope.data) {
              usage = usage.concat(usage, scope.data.data);
              if ($scope.data.dates && scope.data.dates.length > 0) {
                for (var i = 0; i < scope.data.dates.length; i++) {
                  dates.push(new Date(scope.data.dates[i]));
                }
              } else {
                // Use fake dates
                var today = new Date();
                for (var d = scope.data.data.length - 1; d >= 0; d--) {
                  dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
                }
              }
            }
            return {
              x: 'dates',
              columns: [
                dates,
                usage
              ],
              type: 'area'
            };
          };
          $scope.defaultSparklineConfig = chartsMixin.getDefaultSparklineConfig($scope.config.totalUnits);
          $scope.defaultSparklineConfig.axis = utilizationSparklineAxis;
          $scope.defaultSparklineConfig.tooltip = utilizationSparklineTooltip($scope);
          $scope.config.sparklineConfig = $.extend(true, angular.copy($scope.defaultSparklineConfig), $scope.config.sparklineConfig);
          $scope.config.sparklineConfig.data = $scope.getSparklineData($scope);
        }],
      link: function(scope, element, attrs) {
        attrs.$observe('config', function() {
          scope.config.sparklineConfig = $.extend(true, angular.copy(scope.defaultSparklineConfig), scope.config.sparklineConfig);
          scope.config.sparklineConfig.data = scope.getSparklineData(scope);
        });
      }
    };
  }]);