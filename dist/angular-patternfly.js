/**
 * @name  patternfly card
 *
 * @description
 *   Card module for patternfly.
 *
 */
angular.module('patternfly.card', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Charts module for patternfly. Must Include d3.js and c3.js to use
 *
 */
angular.module('patternfly.charts', []);

;/**
 * @name  patternfly.form
 *
 * @description
 *   Module for formting related functionality, primarily filters.
 */
angular.module('patternfly.form', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Base module for patternfly.
 */
angular.module('patternfly', [
  'patternfly.autofocus',
  'patternfly.card',
  'patternfly.form',
  'patternfly.notification',
  'patternfly.select',
  'patternfly.validation'
]);
;/**
 * @ngdoc directive
 * @name patternfly.autofocus:pfFocused
 * @restrict A
 * @element ANY
 * @param {expression=} pfFocused If the expression is true, the element is focused and selected (if possible).
 *
 * @description
 * The focus on element is evaluated from given expression. If the expression provided as an attribute to this directive
 * is evaluated as true, the element is selected (and focused).
 *
 * @example
 <example module="patternfly.autofocus">

 <file name="index.html">
   <div>
   <form class="form-horizontal">

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i1">Focus next input:</label>
       <div class="col-sm-10">
         <input class="form-control" id="i1" ng-model="isFocus" type="checkbox"></input>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i2">Focused input:</label>
       <div class="col-sm-10">
         <input class="form-control" id="i1" ng-model="i2" pf-focused="isFocus" placeholder="This will be selected after checking the box above."></input>
       </div>
     </div>

   </form>
   </div>
 </file>

 </example>
 */

angular.module('patternfly.autofocus', []).directive('pfFocused', function($timeout) {
  'use strict';
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.pfFocused, function(newValue) {
        $timeout(function () {
          if (newValue) {
            element[0].focus();
            if (element[0].select) {
              element[0].select();
            }
          }
        });
      });
    }
  };
});
;angular.module( 'patternfly.card' ).directive('pfAggregateTypeCard', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      types: '='
    },
    templateUrl: 'card/aggregatetype/aggregate-type.html'
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.card:pfCard
 * @restrict A
 * @element ANY
 * @param {headtitle=} Title for the card - required
 * @param {subtitle=} Subtitle for the card - optional
 * @param {hidetopborder=} Hide Top Border, true hides top border, false (default) shows top border - optional
 *
 * @description
 * Directive for easily displaying a card with transcluded content
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
    <div pf-card headtitle="My Card Title" subtitle="My card subtitle" hidetopborder="false">Inner content goes here</div>
 </file>

 </example>
 */
angular.module('patternfly.card').directive('pfCard', function() {
  'use strict';
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headtitle: '@',
      subtitle: '@',
      hidetopborder: '@'
    },
    controller: ['$scope',
      function($scope) {
        $scope.getClasses = function() {
          if($scope.hidetopborder) {
            return $scope.hidetopborder.toString() === 'true' ? 'card-pf' : 'card-pf card-pf-accented';
          } else {
            return 'card-pf card-pf-accented';
          }
        };
      }]
  };
});
;angular.module( 'patternfly.card' ).directive('pfObjStatus', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      objectType: '=type',
      url: '='
    },
    templateUrl: 'card/objectstatus/object-status-tile.html'
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:c3Chart
 *
 * @description
 *   Directive for wrapping c3 library
 *
 *
 * @param {expression} chartConfig the c3 configuration options for the chart
 * @param {string} id the ID iof the container that the chart should bind to
 *
 * @example
<file name="index.html">
  <div id="chartId">
    <div c3-chart id="chartId"  config="chartConfig"></div>
  </div>
 </file>

<file name="script.js">
 function ChartCtrl () {
    var vm = this;
    vm.chartId = 'myChartId';
    vm.chartConfig = { 'labels': ['Created','Deleted'], 'tooltipSuffixes': ['Container Group','Container Group'] };
 }
 </file>
 */
(function(c3){
  'use strict';

  angular.module('patternfly.charts')
  .directive('c3Chart', ['$timeout', function($timeout) {

    return {
      restrict: 'A',
      scope: {
        config: '='
      },
      template: '<div id=""></div>',
      replace: true,
      link: function(scope, element, attrs) {
        //generate c3 chart data
        var chartData = scope.config;
        chartData.bindto = '#' + attrs.id;

        //Generating the chart
        $timeout(function() {
          c3.generate(chartData);
        }, 100);
      }
    };
  }]);
}(c3));;angular.module('patternfly.charts').factory('ChartsMixin', function() {
    'use strict';
    var getDefaultPoint = function() {
        return {
            show: true,
            r: 5
          };
      };

    // Radial Chart Defaults
    var getDefaultRadialDonut = function(title) {
        return {
            title: title,
            label: {
                show: false
              },
              width: 10
            };
      };

    var getDefaultRadialSize = function() {
        return {
            height: 130
          };
      };

    var getDefaultRadialColor = function() {
        return {
            pattern: ['#0088CE', '#D1D1D1']
          };
      };

    var getDefaultRadialTooltip = function() {
        return {
            show: false
          };
      };

    var getDefaultRadialLegend = function() {
        return {
            show: false
          };
      };

    var getDefaultRadialConfig = function(title) {
        return {
            donut: getDefaultRadialDonut(title),
            size: getDefaultRadialSize(),
            legend: getDefaultRadialLegend(),
            color: getDefaultRadialColor(),
            tooltip: getDefaultRadialTooltip()
          };
      };

    // Area Chart Defaults
    var getDefaultAreaArea = function() {
        return {
            zerobased: true
          };
      };

    var getDefaultAreaSize = function() {
        return {
            height: 100
          };
      };

    var getDefaultAreaPoint = function() {
        return {
            r: 1,
            focus: {
                expand: {
                    r: 4
                  }
                }
              };
      };

    var getDefaultAreaColor = function() {
        return {
            pattern: ['#3f9c35', '#ec7a08', '#0088ce', '#00659c', '#cc0000']
          };
      };

    var getDefaultAreaLegend = function() {
        return {
            show: false
          };
      };

    var getDefaultAreaTooltip = function() {
        return {
            show: false
          };
      };

    var getDefaultAreaConfig = function() {
        return {
            area: getDefaultAreaArea(),
            size: getDefaultAreaSize(),
            point: getDefaultAreaPoint(),
            color: getDefaultAreaColor(),
            legend: getDefaultAreaLegend(),
            tooltip: getDefaultRadialTooltip()
          };
      };

    // Sparkline Chart Defaults
    var getDefaultSparklineArea = function() {
        return {
            zerobased: true
          };
      };

    var getDefaultSparklineSize = function() {
        return {
            height: 40
          };
      };

    var getDefaultSparklineAxis = function() {
        return {
            x: {
                show: false
              },
              y: {
                  show: false
                }
              };
      };

    var getDefaultSparklineColor = function() {
        return {
            pattern: ['#0088ce', '#00659c', '#3f9c35', '#ec7a08', '#cc0000']
          };
      };

    var getDefaultSparklineLegend = function() {
        return {
            show: false
          };
      };

    var getDefaultSparklinePoint = function() {
        return {
            show: false
          };
      };

    var getDefaultSparklineTooltip = function(tooltipTextFn) {
        tooltipTextFn = tooltipTextFn || function(data) {
            return data.value;
          };
        return {
            // because a sparkline should only contain a single data column, the tooltip will only work for a single data column
            contents: function(d) {
                return '<span class="c3-tooltip-sparkline">' + tooltipTextFn(d[0]) + '</span>';
              }
          };
      };

    var getDefaultSparklineConfig = function(tooltipTextFn) {
        return {
            area: getDefaultSparklineArea(),
            size: getDefaultSparklineSize(),
            axis: getDefaultSparklineAxis(),
            color: getDefaultSparklineColor(),
            legend: getDefaultSparklineLegend(),
            point: getDefaultSparklinePoint(),
            tooltip: getDefaultSparklineTooltip(tooltipTextFn)
          };
      };

    // Heat Maps
    var getDefaultHeatmapColorPattern = function() {
        return ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000'];
      };

    var defaultHeatmapBlockPadding = 1;
    var getDefaultHeatmapColor = function() {
        return d3.scale.threshold().domain([0.7, 0.8, 0.9]).range(this.getDefaultHeatmapColorPattern());
      };

    return {
        getDefaultPoint: getDefaultPoint,
        getDefaultRadialConfig: getDefaultRadialConfig,
        getDefaultRadialDonut: getDefaultRadialDonut,
        getDefaultRadialSize: getDefaultRadialSize,
        getDefaultRadialColor: getDefaultRadialColor,
        getDefaultRadialTooltip: getDefaultRadialTooltip,
        getDefaultRadialLegend: getDefaultRadialLegend,
        getDefaultAreaConfig: getDefaultAreaConfig,
        getDefaultAreaArea: getDefaultAreaArea,
        getDefaultAreaSize: getDefaultAreaSize,
        getDefaultAreaPoint: getDefaultAreaPoint,
        getDefaultAreaColor: getDefaultAreaColor,
        getDefaultAreaLegend: getDefaultAreaLegend,
        getDefaultAreaTooltip: getDefaultAreaTooltip,
        getDefaultSparklineConfig: getDefaultSparklineConfig,
        getDefaultSparklineArea: getDefaultSparklineArea,
        getDefaultSparklineAxis: getDefaultSparklineAxis,
        getDefaultSparklineColor: getDefaultSparklineColor,
        getDefaultSparklineLegend: getDefaultSparklineLegend,
        getDefaultSparklinePoint: getDefaultSparklinePoint,
        getDefaultSparklineSize: getDefaultSparklineSize,
        getDefaultSparklineTooltip: getDefaultSparklineTooltip,
        getDefaultHeatmapColorPattern: getDefaultHeatmapColorPattern,
        defaultHeatmapBlockPadding: defaultHeatmapBlockPadding,
        getDefaultHeatmapColor: getDefaultHeatmapColor
      };
  });;/**
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
;angular.module('patternfly.charts').directive('pfHeatMap', ['ChartsMixin', '$timeout',
  function(chartsMixin, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        parentid: '@',
        data: '='
      },
      replace: true,
      template: '<svg style="width:100%; height: 100%;"></svg>',
      controller: ['$scope', '$rootScope',
        function($scope, $rootScope) {
          $scope.blockPadding = chartsMixin.defaultHeatmapBlockPadding;
          $scope.heatmapColor = chartsMixin.getDefaultHeatmapColor();
          $scope.heatmapColorPattern = chartsMixin.getDefaultHeatmapColorPattern();
          $scope.determineBlockSize = function() {
            var x = $scope.width;
            var y = $scope.height;
            var n = $scope.data.length;
            var px = Math.ceil(Math.sqrt(n * x / y));
            var py = Math.ceil(Math.sqrt(n * y / x));
            var sx, sy;
            if (Math.floor(px * y / x) * px < n) {
              sx = y / Math.ceil(px * y / x);
            } else {
              sx = x / px;
            }
            if (Math.floor(py * x / y) * py < n) {
              sy = x / Math.ceil(x * py / y);
            } else {
              sy = y / py;
            }
            return Math.max(sx, sy);
          };
        }],
      link: function(scope, element, attrs) {
        var thisComponent = element[0];
        var updateSizes = function() {
          var parentDiv = document.querySelector('#' + scope.parentid);
          scope.width = parentDiv.clientWidth;
          scope.height = parentDiv.clientHeight;
          scope.blockSize = scope.determineBlockSize();
          scope.rows = (scope.blockSize === 0) ? 0 : Math.floor(scope.height / scope.blockSize);
        };
        $timeout(function() {
          updateSizes();
          scope.redraw();
        }, 100);

        scope.didInsertElement = function() {
          updateSizes();
          scope.redraw();
          this.resizeNotificationService.on('windowResizedLowLatency', this, this.handleResize);
        };

        scope.willDestroyElement = function() {
          this.resizeNotificationService.off('windowResizedLowLatency', this, this.handleResize);
        };

        scope.handleResize = function() {
          updateSizes();
          scope.redraw();
        };
        
        scope.redraw = function() {
          var data = scope.data;
          var rows = scope.rows;
          var blockSize = scope.blockSize;
          var blockPadding = scope.blockPadding;
          var color = scope.heatmapColor;
          var component = thisComponent;

          function highlightBlock(block, active) {
            block.style('fill-opacity', active ? 1 : 0.4);
          }
          var svg = window.d3.select(thisComponent);
          svg.selectAll('*').remove();
          var blocks = svg.selectAll('rect').data(data).enter().append('rect');
          blocks.attr('x', function(d, i) {
            return (Math.floor(i / rows) * blockSize) + blockPadding;
          }).attr('y', function(d, i) {
            return (i % rows * blockSize) + blockPadding;
          }).attr('width', blockSize - (2 * blockPadding)).attr('height', blockSize - (2 * blockPadding)).style('fill', function(d) {
            return color(d.value);
          });
          blocks.on('mouseover', function() {
            blocks.call(highlightBlock, false);
            d3.select(this).call(highlightBlock, true);
          });
          blocks.on('click', function(d) {
            component.sendAction('click', d);
          });
          blocks.each(function(d) {
            $(this).tooltip({
              container: 'body',
              animation: false,
              placement: 'top',
              trigger: 'hover',
              html: true,
              title: d.tooltip
            });
          });
          svg.on('mouseleave', function() {
            blocks.call(highlightBlock, true);
          });
        };
      }
    };
  }]);;angular.module('patternfly.charts').directive('pfHeatMapLegend', ['ChartsMixin', '$timeout',
  function(chartsMixin, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        legend: '='
      },
      replace: true,
      templateUrl: 'charts/heatmap/heatmap-legend.html',
      controller: ['$scope', '$rootScope',
        function($scope, $rootScope) {
          var items = [];
          var legendColors = chartsMixin.getDefaultHeatmapColorPattern();
          if ($scope.legend) {
            for (var i = $scope.legend.length - 1; i >= 0; i--) {
              items.push({
                text: $scope.legend[i],
                color: legendColors[i]
              });
            }
          }
          $scope.legendItems = items;
        }]
    };
  }]);;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfPercentageUsed
 *
 * @description
 *   Directive for rendering a percentage used progress chart. Will render one or more
 *   bars based on data
 *
 *
 * @param {string} charts model data to be displayed
 * @param {string} id the ID iof the container that the chart should bind to
 *
 * @example
 <example module="patternfly.charts">
 <file name="index.html">
    <div pf-percentage-used charts="vm.quotas"></div>
 </file>

 <file name="script.js">
 function ChartCtrl () {
    var vm = this;
    vm.quotas = { "data":[
        { "title":"CPU", "start":"25", "end":"46" },
        { "title":"Memory", "start":"8", "end":"16" }
      ]
    }
 }
 </file>
 </example>
 */

angular.module('patternfly.charts')
    .directive('pfPercentageUsed', ['$timeout', function($timeout) {
	'use strict';

  return {
    restrict: 'A',
    scope: {
      charts: '=',
    },
    replace: true,
    templateUrl: 'charts/progress/progress-chart.html',
    link: function($scope) {
      $scope.$watch('charts', function(newVal, oldVal){
        if (typeof(newVal) !== 'undefined') {
          //Calculate the percentage used
          angular.forEach($scope.charts, function(chart, index) {
            chart.percentageUsed = 100 * (chart.start/chart.end);
          }, $scope.charts);

          //Animate in the chart load.
          $scope.animate = true;
		      $timeout(function(){
                $scope.animate = false;
              }, 0);
        }
      });
    }
  };
}]);
;angular.module('patternfly.charts').directive('pfSparklineChart', ['ChartsMixin', '$timeout',
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
  }]);;'use strict';
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
]);;angular.module('patternfly.charts').directive('pfUtilizationChart', ['ChartsMixin', '$timeout',
  function(chartsMixin, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '='
      },
      replace: true,
      templateUrl: 'charts/utilization/utilization-chart.html',
      controller: ['$scope',
        function($scope) {
          if ($scope.data.available === undefined) {
            $scope.data.available = $scope.data.total - $scope.data.used;
          }
          $scope.config.availableUnits = $scope.config.availableUnits || $scope.totalUnits;
        }]
    };
  }]);;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormButtons
 *
 * @description
 *   Encapsulates the standard structure and styling for create and cancel buttons
 *   when used with a form.
 *
 *   This directive creates new scope.
 *
 * @param {function} pfHandleCancel function to call when the user clicks cancel.
 * @param {function} pfHandleSave function to call when the user clicks save.
 * @param {expression} pfWorking the model to store the working status in.
 * @param {string} pfButtonClass the class of the button container.
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <div ng-controller="FormButtonCtrl">
       <p>Saved?</p>
       <p>{{ status }}</p>
       <form>
         <div class="form-group>
           <label class="control-label col-sm-2">Input</label>
           <input class="form-control col-sm-5" name="item" ng-model="input" type="text">
         </div>
         <div pf-form-buttons pf-on-cancel="cancel()" pf-on-save="save(item)" pf-working="working"></div>
       </form>
     </div>
   </file>

   <file name="script.js">
     function FormButtonCtrl ($scope, $timeout) {
       $scope.status = 'Not yet Saved'
       $scope.working = false;

       $scope.save = function (item) {
         $scope.status = 'saved';
         $scope.working = true;

         $timeout(function () {
           $scope.working = false;
         }, 1000);
       };

       $scope.cancel = function () {
         $scope.status = 'cancelled';
         $scope.input = null;
       };
     }
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormButtons', function () {
  'use strict';
  return {
    replace: true,
    require: '^form',
    templateUrl: 'form/form-buttons/views/form-buttons.html',
    scope: {
      pfHandleCancel: '&pfOnCancel',
      pfHandleSave: '&pfOnSave',
      pfWorking: '=',
      pfButtonContainerClass: '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      if (scope.pfWorking === undefined) {
        scope.pfWorking = false;
      }

      scope.isInvalid = function () {
        var invalid = controller.$invalid;

        angular.forEach(controller, function (value) {
          if (value && value.$error) {
            if (value.$error.server) {
              invalid = false;
            }
          }
        });

        return invalid;
      };
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormGroup
 *
 * @description
 *  Encapsulates the structure and styling for a label + input used within a
 *  Bootstrap3 based form.
 *
 *  This directive creates new scope.
 *
 * @param {string} pfLabel the text for the <label> element.
 * @param {string} pfFieldId the id of the form field. Default value is id of the form field element.
 * @param {string} pfLabelClass the class of the label element. Default value is "col-sm-2".
 * @param {string} pfInputClass the class of the input element. Default value is "col-sm-5".
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <form class="form-horizontal" ng-controller="FormDemoCtrl">

       <p>Name: {{ item.name }}</p>
       <p>Description: {{ item.description }}</p>
       <div pf-form-group pf-label="Name" required>
         <input id="name" name="name"
                ng-model="item.name" type="text" required/>
       </div>

       <div pf-form-group pf-input-class="col-sm-9" pf-label="Description">
         <textarea id="description" name="description" ng-model="item.description">
           {{ item.description }}
         </textarea>
       </div>
     </form>
   </file>

   <file name="script.js">
     function FormDemoCtrl ($scope) {
        $scope.item = {
          name: 'Homer Simpson',
          description: 'I like donuts and Duff.  Doh!'
        };
      }
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormGroup', function () {
  'use strict';
  
  function getInput(element) {
    // table is used for bootstrap3 date/time pickers
    var input = element.find('table');

    if (input.length === 0) {
      input = element.find('input');

      if (input.length === 0) {
        input = element.find('select');

        if (input.length === 0) {
          input = element.find('textarea');
        }
      }
    }
    return input;
  }

  return {
    transclude: true,
    replace: true,
    require: '^form',
    templateUrl: 'form/form-group/views/form-group.html',
    scope: {
      'pfLabel': '@',
      'pfField': '@',
      'pfLabelClass': '@',
      'pfInputClass': '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      var input = getInput(iElement),
        type = input.attr('type'),
        field;

      if (!iAttrs.pfLabelClass) {
        iAttrs.pfLabelClass = 'col-sm-2';
      }

      if (!iAttrs.pfInputClass) {
        iAttrs.pfInputClass = 'col-sm-5';
      }
      
      if (!scope.pfField) {
        scope.pfField = input.attr('id');
      }
      field = scope.pfField;

      if (['checkbox', 'radio', 'time'].indexOf(type) === -1) {
        input.addClass('form-control');
      }

      if (input.attr('required')) {
        iElement.addClass('required');
      }

      if (controller[field]) {
        scope.error = controller[field].$error;
      }

      scope.hasErrors = function () {
        return controller[field] && controller[field].$invalid && controller[field].$dirty;
      };
    }
  };
});
;/**
 * @ngdoc service
 * @name patternfly.notification.Notification
 * @requires $rootScope
 *
 * @description
 * Notification service used to notify user about important events in the application.
 *
 * ## Configuring the service
 *
 * You can configure the service with: setDelay, setVerbose and setPersist.
 *
 * ### Notifications.setDelay
 * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
 * delay is 5000 ms.
 *
 * ### Notifications.setVerbose
 * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console,
 * too. This is done using the default angular.js $log service.
 *
 * ### Notifications.setPersist
 * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
 * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
 * The input is an object in format {mode: persistValue}.
 *
 * ## Configuration Example
 * ```js
 * angular.module('myApp', []).config(function(NotificationsProvider){
 *   NotificationsProvider.setDelay(10000).setVerbose(false).setPersist({'error': true, 'httpError': true, 'warn': true});
 * });
 * ```
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">
     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
angular.module('patternfly.notification', []).provider('Notifications', function() {
  'use strict';
  // time (in ms) the notifications are shown

  this.delay = 5000;
  this.verbose = true;
  this.notifications = {};
  this.persist = {'error': true, 'httpError': true};

  this.setDelay = function(delay){
    this.delay = delay;
    return this;
  };

  this.setVerbose = function(verbose){
    this.verbose = verbose;
    return this;
  };

  this.setPersist = function(persist){
    this.persist = persist;
  };

  this.$get = ['$rootScope', '$timeout', '$log', function($rootScope, $timeout, $log) {

    var delay = this.delay;
    var notifications = this.notifications;
    var verbose = this.verbose;
    var persist = this.persist;

    $rootScope.notifications = {};
    $rootScope.notifications.data = [];

    $rootScope.notifications.remove = function(index){
      $rootScope.notifications.data.splice(index,1);
    };

    var scheduleMessagePop = function() {
      $timeout(function() {
        for (var i = 0; i < $rootScope.notifications.data.length; i++){
          if (!$rootScope.notifications.data[i].isPersistent){
            $rootScope.notifications.data.splice(i,1);
          }
        }
      }, delay);
    };

    if (!$rootScope.notifications) {
      $rootScope.notifications.data = [];
    }

    notifications.message = function(type, header, message, isPersistent) {
      $rootScope.notifications.data.push({
        type : type,
        header: header,
        message : message,
        isPersistent: isPersistent
      });

      scheduleMessagePop();
    };

    var modes = {
      info: { type: 'info', header: 'Info!', log: 'info'},
      success: { type: 'success', header: 'Success!', log: 'info'},
      error: { type: 'danger', header: 'Error!', log: 'error'},
      warn: { type: 'warning', header: 'Warning!', log: 'warn'}
    };

    function createNotifyMethod(mode){
      return function (message) {
        notifications.message(modes[mode].type, modes[mode].header, message, persist[mode]);
        if (verbose) {
          $log[modes[mode].log](message);
        }
      };
    }

    for (var mode in modes) {
      notifications[mode] = createNotifyMethod(mode);
    }

    notifications.httpError = function(message, httpResponse) {
      message += ' (' + (httpResponse.data.message || httpResponse.data.cause || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
      notifications.message('danger', 'Error!', message, persist.httpError);
      if (verbose) {
        $log.error(message);
      }
    };

    return notifications;
  }];

})

/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotification
 * @restrict E
 * @scope
 *
 * @param {expression=} pfNotificationType The type of the notification message. Allowed value is one of these: 'success','info','danger', 'warning'.
 * @param {expression=} pfNotificationMessage The main text message of the notification.
 * @param {expression=} pfNotificationHeader The header text of the notification.
 * @param {expression=} pfNotificationPersistent The notification won't disappear after delay timeout, but has to be closed manually with the close button.
 *
 * @description
 * The main visual element of the notification message.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification pf-notification-type="type"
                      pf-notification-header="header"
                      pf-notification-message="message"
                      pf-notification-persistent="isPersistent">
     </pf-notification>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="header">Header:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="header" id="header"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Persistent:</label>
         <div class="col-sm-10">
          <input type="checkbox" ng-model="isPersistent"></input>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope) {
    $scope.types = ['success','info','danger', 'warning'];
    $scope.type = $scope.types[0];
    $scope.isPersistent = false;

    $scope.header = 'Default Header.';
    $scope.message = 'Default Message.';
  }
 </file>

 </example>
 */
.directive('pfNotification', function () {
  'use strict';
  return {
    scope: {
      'pfNotificationType': '=',
      'pfNotificationMessage': '=',
      'pfNotificationHeader': '=',
      'pfNotificationPersistent': '=',
      'pfNotificationIndex': '='
    },
    restrict: 'E',
    templateUrl: 'notification/views/notification.html'
  };
})
/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotificationList
 * @restrict E
 *
 * @description
 * Using this directive automatically creates a list of notifications generated by the {@link api/patternfly.notification.Notification notification} service.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification - Click me several times</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    $scope.message = 'Default Message.';

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
.directive('pfNotificationList', function () {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: 'notification/views/notification-list.html'
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.select:pfSelect
 * @element select
 *
 * @param {string} ngModel Model binding using the {@link https://docs.angularjs.org/api/ng/type/ngModel.NgModelController/ NgModelController} is mandatory.
 * @param {string=} ngOptions The `{@link https://docs.angularjs.org/api/ng/directive/select/ ngOptions}` attribute can be used to dynamically generate a list of `<option>`
 * elements for the `<select>` element.
 *
 * @description
 * An AngularJS wrapper for the {@link http://silviomoreto.github.io/bootstrap-select/ Bootstrap-select} jQuery plugin which is used
 * as a default select decorator in {@link https://www.patternfly.org/widgets/#bootstrap-select Patternfly}.
 *
 * @example
 <example module="patternfly.select">

 <file name="index.html">
 <div ng-controller="SelectDemoCtrl">

 <form>
   <div class="form-group">
     <label class="col-sm-2 control-label" for="pet">Preferred pet:</label>
     <div class="col-sm-10">
      <select pf-select ng-model="pet" id="pet" ng-options="o as o for o in pets"></select>
     </div>
   </div>

   <div class="form-group">
     <label class="col-sm-2 control-label" for="fruit">Preferred fruit:</label>
     <div class="col-sm-10">
       <select pf-select ng-model="fruit" id="fruit">
         <option value="orange">Orange</option>
         <option value="apple" ng-selected="true" selected>Apple</option>
         <option value="banana">Banana</option>
       </select>
     </div>
   </div>

   <div class="form-group">
     <label class="col-sm-2 control-label" for="drink">Preferred drink:</label>
     <div class="col-sm-10">
       <select pf-select="{ noneSelectedText: 'None' }" ng-model="drink" id="drink" ng-options="o as o for o in drinks">
         <option value="">No drink selected</option>
       </select>
     </div>
   </div>

 </form>

 <p>Your preferred pet is {{pet}}.</p>

 </div>
 </file>

 <file name="script.js">
 function SelectDemoCtrl($scope) {
    $scope.drinks = ['tea', 'coffee', 'water'];
    $scope.pets = ['Dog', 'Cat', 'Chicken'];
    $scope.pet = $scope.pets[0];
  }
 </file>

 </example>
 */
angular.module('patternfly.select', []).directive('pfSelect', function($timeout) {
  'use strict';
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      selectPickerOptions: '=pfSelect'
    },
    link: function (scope, element, attrs, ngModel) {
      element.selectpicker(scope.selectPickerOptions);

      var $render = ngModel.$render;

      ngModel.$render = function(){
        $render.apply(this, arguments);
        $timeout(function() {
          element.selectpicker('refresh');
        },0,false);
      };

      if (attrs.ngOptions){
        var optionCollectionList = attrs.ngOptions.split('in ');
        var optionCollection = optionCollectionList[optionCollectionList.length - 1];

        scope.$watchCollection(optionCollection, function() {
          element.selectpicker('refresh');
        });
      }

      attrs.$observe('disabled', function() {
        element.selectpicker('refresh');
      });
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.validation:pfValidation
 * @restrict E
 * @element INPUT
 * @scope
 *
 * @description
 * Directive used for input validation based on custom function.
 *
 * @param {expression=} pfValidationDisabled If true, the validation is disabled, it is enabled otherwise.
 *
 * @example
 <example module="patternfly.validation">

 <file name="index.html">
   <div ng-controller="ValidationDemoCtrl">
   <form class="form-horizontal">

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Initially valid:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValueValid" pf-validation="isNumber(input)"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Fixed Number:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Number:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)" pf-validation-disabled="isValidationDisabled"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Validation disabled:</label>
       <div class="col-sm-10">
         <input class="form-control" type="checkbox" ng-model="isValidationDisabled"/>
       </div>
     </div>
   </form>
   </div>
 </file>

 <file name="script.js">
 function ValidationDemoCtrl($scope) {
    $scope.myValue = "Change this value to be a number";
    $scope.myValueValid = 42;
    $scope.isValidationDisabled = false;

    $scope.isNumber = function(value) {
      if (isNaN(value)){
        return false;
      }

      return true;
    }
  }
 </file>

 </example>
 */
angular.module('patternfly.validation', []).directive('pfValidation', function($timeout) {
  'use strict';
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      pfValidation: '&',
      pfValidationDisabled: '='
    },
    link: function (scope, element, attrs, ctrl) {

      scope.inputCtrl = ctrl;
      scope.valEnabled = !attrs.pfValidationDisabled;

      scope.$watch('pfValidationDisabled', function(newVal){
        scope.valEnabled = !newVal;
        if (newVal) {
          scope.inputCtrl.$setValidity('pfValidation',true);
          toggleErrorClass(false);
        } else {
          validate();
        }
      });

      // If validation function is set
      if (attrs.pfValidation) {
        // using $timeout(0) to get the actual $modelValue
        $timeout(function () {
          validate();
        }, 0);
      } else if (!scope.inputCtrl.$valid && scope.inputCtrl.$dirty){
        toggleErrorClass(true);
      }

      scope.$watch('inputCtrl.$valid', function(isValid){
        if (isValid) {
          toggleErrorClass(false);
        } else {
          toggleErrorClass(true);
        }
      });

      scope.$watch('inputCtrl.$modelValue', function(){
        validate();
      });

      function validate() {
        var val = scope.inputCtrl.$modelValue;

        var valFunc = scope.pfValidation({'input':val});

        if(!attrs.pfValidation){
          valFunc = true;
        }
        var valid = !val || valFunc  || val === '';

        if (scope.valEnabled && !valid){
          toggleErrorClass(true);
        } else {
          toggleErrorClass(false);
        }
      }

      function toggleErrorClass(add) {
        var messageElement = element.next();
        var parentElement = element.parent();
        var hasErrorM = parentElement.hasClass('has-error');
        var wasHidden = messageElement.hasClass('ng-hide');

        scope.inputCtrl.$setValidity('pf-validation', !add);

        if (add){
          if (!hasErrorM) {
            parentElement.addClass('has-error');
          }
          if (wasHidden){
            messageElement.removeClass('ng-hide');
          }
        }

        if (!add){
          if(hasErrorM) {
            parentElement.removeClass('has-error');
          }
          if (!wasHidden) {
            messageElement.addClass('ng-hide');
          }
        }
      }
    }
  };
});;angular.module('patternfly.card').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('card/aggregatetype/aggregate-type.html',
    "<div class=\"card-pf card-pf-accented card-pf-status card-pf-providers\"><h2 class=card-pf-title ng-if=\"types.count > 1\"><span class=card-pf-status-count>{{types.count}}</span> <span class=card-pf-status-type>{{types.name}}</span><div class=\"indicator providers\"><span ng-repeat=\"type in types.types\"><a class=count href={{type.href}}{{type.id}}><i class=\"provider-icon {{type.iconClass}}\">{{ type.count }}</a></span></div></h2><h2 class=card-pf-title ng-if=\"types.count == 0\">No Types</h2><h2 class=card-pf-title ng-if=\"types.count == 1\"><i class=\"provider-icon provider-icon-large {{types.types[0].iconClass}}\"></h2></div>"
  );


  $templateCache.put('card/basic/card.html',
    "<div ng-class=getClasses() id=cardcontainer><div class=card-pf-heading><h2 class=card-pf-title id=headtitle>{{headtitle}}</h2></div><span ng-if=subtitle class=card-pf-subtitle id=subtitle>{{subtitle}}</span><div class=card-pf-body><ng-transclude></ng-transclude></div></div>"
  );


  $templateCache.put('card/objectstatus/object-status-tile.html',
    "<div class=\"card-pf card-pf-accented card-pf-status\"><h2 class=card-pf-title><span class=\"fa pficon {{objectType.iconClass}} container-font-color\"></span> <a href=#{{url}}/{{objectType.type}} ng-if=objectType.type><span class=card-pf-status-count>{{objectType.count}}</span> <span class=card-pf-status-type>{{objectType.name}}</span></a> <span ng-if=!objectType.type><span class=card-pf-status-count>{{objectType.count}}</span> <span class=card-pf-status-type>{{objectType.name}}</span></span><div class=\"indicator status\"><span ng-repeat=\"status in objectType.status\"><i class=\"fa-status-icon {{status.iconClass}}\"><span class=count>{{status.count}}</span></span></div></h2></div>"
  );

}]);
;angular.module('patternfly.charts').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('charts/donut/donut-percent-chart.html',
    "<div id=radial-chart-container class=radial-chart><div c3-chart id={{donutChartId}} config=config.donutConfig></div></div>"
  );


  $templateCache.put('charts/heatmap/heatmap-legend.html',
    "<div class=\"heatmap-legend heatmap-legend-container\"><div ng-repeat=\"item in legendItems\" class=heatmap-legend-container><li class=color-box style=\"background-color: {{item.color}}\"></li><li class=legend-text>{{item.text}}</li></div></div>"
  );


  $templateCache.put('charts/progress/progress-chart.html',
    "<div class=percentageUsedBarChartWrapper><div class=perentageUsedBarChart ng-repeat=\"chart in charts\"><div class=percentageUsedBarTitle><span>{{ chart.title }}</span> <span class=used>{{chart.start}} of {{chart.end}}</span></div><div class=percentageUsedBar><div class=percentageUsedBarFilled ng-class=\"{'animate': animate}\" style=width:{{chart.percentageUsed}}%></div><div class=percentageUsedBarUnused></div></div></div></div>"
  );


  $templateCache.put('charts/sparkline/sparkline-chart.html',
    "<div class=sparkline-chart><div c3-chart id={{sparklineChartId}} config=config.sparklineConfig></div></div>"
  );


  $templateCache.put('charts/trends/trends-chart.html',
    "<div id={{id}}><div c3-chart id={{chartId}} config=chartConfig></div></div>"
  );


  $templateCache.put('charts/utilization/utilization-chart.html',
    "<div class=utilization-chart><h3 class=\"h4 count-title\">{{config.title}}</h3><div class=\"count-utilization col-xs-12\"><div class=\"available-text left col-xs-4\"><span>{{data.total - data.used}} {{config.availableUnits}}</span></div><div class=\"available-text right col-xs-8\"><div class=\"available-text col-xs-12 title-small title-small-upper\"><span>Available</span></div><div class=\"available-text col-xs-12 title-small title-small-lower\"><span>of {{data.total}} {{config.totalUnits}}</span></div></div></div><div pf-donut-pct-chart config=config data=data></div><div pf-sparkline-chart config=config data=data></div><p class=\"pull-left legend-text\">{{config.legendLeftText}}</p><p class=\"pull-right legend-text\">{{config.legendRightText}}</p></div>"
  );

}]);
;angular.module('patternfly.form').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form/form-buttons/views/form-buttons.html',
    "<div class=form-group><div class=\"{{ pfButtonContainerClass }}\"><div class=\"control-group buttons\"><button class=\"btn btn-default\" type=button ng-click=pfHandleCancel() ng-disabled=pfWorking translate>Cancel</button> <button class=\"btn btn-primary\" ng-click=\"pfHandleSave(); pfWorking = true\" ng-disabled=\"isInvalid() || pfWorking\"><i class=\"icon-spinner icon-spin\" ng-show=pfWorking></i> <span ng-show=pfWorking translate>Saving...</span> <span ng-hide=pfWorking translate>Save</span></button></div></div></div>"
  );


  $templateCache.put('form/form-group/views/form-group.html',
    "<div class=form-group ng-class=\"{ 'has-error' : hasErrors() }\"><label for=\"{{ pfField }}\" class=\"control-label {{ pfLabelClass }}\">{{ pfLabel }}</label><div class=\"{{ pfInputClass }}\"><span ng-transclude></span> <span class=help-block ng-show=error.messages><ul><li ng-repeat=\"message in error.messages\">{{ message }}</li></ul></span></div></div>"
  );

}]);
;angular.module('patternfly.notification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('notification/views/notification-list.html',
    "<div data-ng-show=\"notifications.data.length > 0\"><div ng-repeat=\"notification in notifications.data\"><pf-notification pf-notification-type=notification.type pf-notification-header=notification.header pf-notification-message=notification.message pf-notification-persistent=notification.isPersistent pf-notification-index=$index></pf-notification></div></div>"
  );


  $templateCache.put('notification/views/notification.html',
    "<div class=\"alert alert-{{pfNotificationType}}\"><button ng-show=pfNotificationPersistent type=button class=close ng-click=$parent.notifications.remove($index)><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button> <span class=\"pficon pficon-ok\" ng-show=\"pfNotificationType == 'success'\"></span> <span class=\"pficon pficon-info\" ng-show=\"pfNotificationType == 'info'\"></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'danger'\"><span class=\"pficon pficon-error-octagon\"></span> <span class=\"pficon pficon-error-exclamation\"></span></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'warning'\"><span class=\"pficon pficon-warning-triangle\"></span> <span class=\"pficon pficon-warning-exclamation\"></span></span> <strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}</div>"
  );

}]);
