'use strict';
angular.module('patternfly.charts').directive('pfTrends', ['ChartsMixin', '$timeout',
    function(chartsMixin, $timeout) {
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '=',
        chartHeight: '=',
        id: '@'
      },
      replace: true,
      templateUrl: 'charts/trends/trends-chart.html',
      controller: ['$scope', '$rootScope',
                function($scope, $rootScope) {
          var me = this;
          if ($scope.chartHeight === undefined) {
            $scope.chartHeight = 71;
          }
          $scope.containerId = $scope.id.trim();
          $scope.chartId = $scope.containerId + 'Chart';
          this.chartColor = {
            pattern: ['#6ca100', '#0088ce']
          };
          var chartTooltip = function(scope) {
            return {
              contents: function(d) {
                return '<div id="container-group-trends-tooltip">' + '<table class="c3-tooltip">' + '  <tbody>' + '    <tr>' + '      <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' + '    </tr>' + '    <tr">' + '      <td class="name">' + '        <span style="background-color:' + me.chartColor.pattern[0] + '"></span>' + d[0].name + ':' + '      </td>' + '      <td class="value" style="white-space: nowrap;">' + '         +' + d[0].value + ' ' + scope.config.tooltipSuffixes[0] + '      </td>' + '    </tr>' + '    <tr">' + '      <div style="background-color:' + me.chartColor.pattern[1] + '"> </div>' + '      <td class="name">' + '        <span style="background-color:' + me.chartColor.pattern[1] + '"></span>' + d[1].name + ':' + '      </td>' + '      <td class="value" style="white-space: nowrap;">' + '         -' + d[1].value + ' ' + scope.config.tooltipSuffixes[1] + '      </td>' + '    </tr>' + '  </tbody>' + '</table>' + '</div>';
              },
              position: function(data, width, height, element) {
                var center = parseInt(element.getAttribute('x'));
                var top = parseInt(element.getAttribute('y'));
                var chartBox = document.querySelector('#' + scope.chartId).getBoundingClientRect();
                var graphOffsetX = document.querySelector('#' + scope.chartId + ' g.c3-axis-y').getBoundingClientRect().right;
                var x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));
                x = Math.min(x, chartBox.width - width);
                var y = top - height;
                return {
                  top: y,
                  left: x
                };
              }
            };
          };
          var chartAxis = {
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
          $scope.getChartData = function() {
            var id = $scope.id.trim();
            var trend1 = [$scope.config.labels[0]];
            var trend2 = [$scope.config.labels[1]];
            var dates = ['dates'];
            var data = this.data;
            if (data) {
              var dateLength = 0;
              var keys = [];
              for (var key in data) {
                keys.push(key);
              }
              trend1 = trend1.concat(data[keys[0]]);
              trend2 = trend2.concat(data[keys[1]]);
              dateLength = data[keys[0]].length;
              if (data.dates && data.dates.length > 0) {
                for (var i = 0; i < data.dates.length; i++) {
                  dates.push(new Date(data.dates[i]));
                }
              } else {
                // Use fake dates
                var today = new Date();
                for (var d = dateLength - 1; d >= 0; d--) {
                  dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
                }
              }
            }
            var retVal = {
              x: 'dates',
              columns: [
                dates,
                trend1,
                trend2
              ],
              type: 'area'
            };
            // seems like a hack, but I don't know c3 well enough to
            // make this generic
            if (id === 'imageTrends') {
              var axes = {};
              var imgs = $scope.config.labels[0];
              var totSize = $scope.config.labels[1];
              axes[imgs] = 'y';
              axes[totSize] = 'y2';
              retVal.axes = axes;
            }
            return retVal;
          };
          var chartPoint = {
            show: false
          };
          var chartSize = {
            height: $scope.chartHeight
          };
          $scope.chartConfig = {
            point: chartPoint,
            size: chartSize,
            axis: chartAxis,
            color: this.chartColor,
            tooltip: chartTooltip($scope),
            data: $scope.getChartData()
          };
        }
      ],
      link: function(scope, element, attrs) {
        attrs.$observe('data', function() {
          scope.chartConfig.data = scope.getChartData();
        });
      }
    };
  }
]);