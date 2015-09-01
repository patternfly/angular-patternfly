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
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration properties for the donut chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId       - the unique id of the donut chart
 * <li>.units         - unit label for values, ex: 'MHz','GB', etc..
 * <li>.thresholds    - warning and error percentage thresholds used to determine the Usage Percentage fill color (optional)
 * <li>.tooltipFn     - user defined function to customize the tool tip (optional)
 * <li>.centerLabelFn - user defined function to customize the center label (optional)
 * </ul>
 *
 * @param {object} data the Total and Used values for the donut chart.  Available is calculated as Total - Used.<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @param {string=} center-label specifies the contents of the donut's center label.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'used'      - displays the Used amount in the center label (default)
 * <li> 'available' - displays the Available amount in the center label
 * <li> 'percent'   - displays the Usage Percent of the Total amount in the center label
 * <li> 'none'      - does not display the center label
 * </ul>
 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <style>
       hr {
         display: block;
         height: 1px;
         border: 0;
         border-top: 1px solid #525252;
         margin: 1em 0;
         padding: 0;
       }
     </style>
     <div ng-controller="ChartCtrl" style="display:inline-block;">

       <div class="col-md-4">
         </br> <div pf-donut-pct-chart config="config" data="data"></div>
       </div>

       <div class="col-md-8">
         Total = {{data.total}}, Used = {{data.used}}, Available = {{data.available}}<br/>
         Percent Used = {{(data.used / data.total) * 100;}} %</br>
         Thresholds:</br>
         <div class="col-md-2">
           Error:</br>
           Warning:</br>
           Ok:
         </div>
         <div class="col-md-10">
           {{config.thresholds.error}}% Used (red)</br>
           {{config.thresholds.warning}}% Used (orange)</br>
           Not reached a threshold (blue)
         </div>

         <form role="form" style="width:200px">
           <div class="form-group">
             <label>Show</label>
             </br>
             <label class="radio-inline">
               <input type="radio" ng-model="newUsed" value="950">Error</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="newUsed" value="650">Warning</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="newUsed" value="350">Ok</input>
             </label>
           </div>
         </form>
       </div>

       <div class="col-md-12">
         <hr>
       </div>

       <div class="col-md-3">
         <div pf-donut-pct-chart config="usedConfig" data="usedData" center-label="usedLabel"></div>
         center-label =<br> 'used'
       </div>
       <div class="col-md-3">
         <div pf-donut-pct-chart config="availConfig" data="availData" center-label="availLabel"></div>
         center-label =<br> 'available'
       </div>
       <div class="col-md-3">
         <div pf-donut-pct-chart config="pctConfig" data="pctData" center-label="pctLabel"></div>
         center-label =<br> 'percent'
       </div>
       <div class="col-md-3">
         <div pf-donut-pct-chart config="noneConfig" data="noneData" center-label="noLabel"></div>
         center-label =<br> ' none'
       </div>

       <div class="col-md-12">
         <hr>
       </div>

       <div class="col-md-12">
         Custom Tooltip and Center Label
         <div pf-donut-pct-chart config="custConfig" data="custData"></div>
       </div>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
       $scope.config = {
         'chartId': 'chartA',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.data = {
         'used': '950',
         'total': '1000'
       };

       $scope.newUsed = $scope.data.used;

       $scope.$watch('newUsed', function (val) {
         $scope.data.used = val;
       });

       $scope.usedConfig = {
         'chartId': 'usedChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.usedData = {
         'used': '350',
         'total': '1000'
       };

       $scope.usedLabel = "used";

       $scope.availConfig = {
         'chartId': 'availChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.availData = {
           'used': '350',
            'total': '1000'
        };

       $scope.availLabel = "available";

       $scope.pctConfig = {
         'chartId': 'pctChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.pctData = {
         'used': '350',
         'total': '1000'
       };

       $scope.pctLabel = "percent";

       $scope.noneConfig = {
         'chartId': 'noneChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.noneData = {
         'used': '350',
         'total': '1000'
       };

       $scope.noLabel = "none";

       $scope.custConfig = {
         'chartId': 'custChart',
         'units': 'MHz',
         'thresholds':{'warning':'60','error':'90'},
         "legend":{"show":true},
         'tooltipFn': function (d) {
           return '<span class="donut-tooltip-pf"style="white-space: nowrap;">' +
                    d[0].value + ' ' + d[0].name +
                  '</span>';
           },
         'centerLabelFn': function () {
           return '<tspan dy="0" x="0" class="donut-title-big-pf">' + $scope.custData.available + '</tspan>' +
                    '<tspan dy="20" x="0" class="donut-title-small-pf">Free</tspan>';
           }
         };

       $scope.custData = {
         'used': '670',
         'total': '1000'
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfDonutPctChart', function (c3ChartDefaults, $timeout) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      config: '=',
      data: '=',
      centerLabel: '=?'
    },
    replace: true,
    templateUrl: 'charts/donut/donut-pct-chart.html',
    controller: ['$scope',
      function ($scope) {
        var donutTooltip;

        $scope.donutChartId = 'donutChart';
        if ($scope.config.chartId) {
          $scope.donutChartId = $scope.config.chartId + $scope.donutChartId;
        }

        $scope.updateAvailable = function () {
          $scope.data.available = $scope.data.total - $scope.data.used;
        };

        if ($scope.data.available === undefined) {
          $scope.updateAvailable();
        }

        $scope.getStatusColor = function (used, thresholds) {
          var color = '#0088CE';

          if (thresholds) {
            if (used >= thresholds.error) {
              color = '#CC0000';
            } else if (used >= thresholds.warning) {
              color = '#EC7A08';
            }
          }

          return color;
        };

        $scope.statusDonutColor = function (scope) {
          var color, percentUsed;

          color = { pattern: [] };
          percentUsed = scope.data.used / scope.data.total * 100.0;
          color.pattern[0] = $scope.getStatusColor(percentUsed, scope.config.thresholds);
          color.pattern[1] = '#D1D1D1';
          return color;
        };

        donutTooltip = function (scope) {
          return {
            contents: function (d) {
              var tooltipHtml;

              if (scope.config.tooltipFn) {
                tooltipHtml = '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                                scope.config.tooltipFn(d) +
                             '</span>';
              } else {
                tooltipHtml = '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                          Math.round(d[0].ratio * 100) + '%' + ' ' + $scope.config.units + ' ' + d[0].name +
                       '</span>';
              }

              return tooltipHtml;
            }
          };
        };

        $scope.getDonutData = function (scope) {
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

        $scope.getCenterLabelText = function () {
          var centerLabelText;

          // default to 'used' info.
          centerLabelText = { bigText: $scope.data.used,
                              smText:  $scope.config.units + ' Used' };

          if ($scope.config.centerLabelFn) {
            centerLabelText.bigText = $scope.config.centerLabelFn();
            centerLabelText.smText = '';
          } else if ($scope.centerLabel === 'none') {
            centerLabelText.bigText = '';
            centerLabelText.smText = '';
          } else if ($scope.centerLabel === 'available') {
            centerLabelText.bigText = $scope.data.available;
            centerLabelText.smText = $scope.config.units + ' Available';
          } else if ($scope.centerLabel === 'percent') {
            centerLabelText.bigText = Math.round($scope.data.used / $scope.data.total * 100.0) + '%';
            centerLabelText.smText = 'of ' + $scope.data.total + ' ' + $scope.config.units;
          }

          return centerLabelText;
        };

        $scope.updateAll = function (scope) {
          $scope.updateAvailable();
          $scope.config.data = $scope.getDonutData($scope);
          $scope.config.color = $scope.statusDonutColor($scope);
          $scope.config.tooltip = donutTooltip(scope);
        };

        $scope.config = $.extend(true, c3ChartDefaults.getDefaultDonutConfig(), $scope.config);
        $scope.updateAll($scope);
      }
    ],
    link: function (scope, element) {
      var setupDonutChartTitle = function () {
        $timeout(function () {
          var donutChartTitle, centerLabelText;

          donutChartTitle = element[0].querySelector('text.c3-chart-arcs-title');
          if (!donutChartTitle) {
            return;
          }

          centerLabelText = scope.getCenterLabelText();

          if (centerLabelText.bigText && !centerLabelText.smText) {
            donutChartTitle.innerHTML = centerLabelText.bigText;
          } else {
            donutChartTitle.innerHTML =
              '<tspan dy="0" x="0" class="donut-title-big-pf">' +
              centerLabelText.bigText +
              '</tspan>' +
              '<tspan dy="20" x="0" class="donut-title-small-pf">' +
              centerLabelText.smText +
              '</tspan>';
          }
        }, 300);
      };

      scope.$watch('config', function () {
        scope.updateAll(scope);
        setupDonutChartTitle();
      }, true);

      scope.$watch('data', function () {
        scope.updateAll(scope);
        setupDonutChartTitle();
      }, true);

      scope.$watch('centerLabel', function () {
        setupDonutChartTitle();
      });
    }
  };
});
