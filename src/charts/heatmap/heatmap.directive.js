/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfHeatMap
 *
 * @description
 *   Directive for rendering a heatmap chart.
 *
 * @param {object} data data for the chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.id            - the id of the measurement
 * <li>.value         - the value of the measurement
 * <li>.tooltip       - message to be displayed on hover
 * </ul>
 *
 * @param {string=} height height of the chart (no units) - default: "200"
 * @param {string=} chartTitle title of the chart
 * @param {array=} legendLabels the labels for the legend - defaults: ['< 70%', '70-80%' ,'80-90%', '> 90%']
 * @param {array=} thresholds the threshold values for the heapmap - defaults: [0.7, 0.8, 0.9]
 * @param {array=} heatmapColorPattern the colors that correspond to the various threshold values (lowest to hightest value ex: <70& to >90%) - defaults: ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000']
 * @example
 <example module="patternfly.charts">
   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope) {
       $scope.title = 'Utilization - Using Defaults';
       $scope.data = [
       {'id': 9,'value': 0.96,'tooltip': 'Node 8 : My OpenShift Provider<br\>96% : 96 Used of 100 Total<br\>4 Available'},
       {'id': 44, 'value': 0.94, 'tooltip': 'Node 19 : My Kubernetes Provider<br\>94% : 94 Used of 100 Total<br\>6 Available'},
       {'id': 0, 'value': 0.91, 'tooltip': 'Node 9 : My OpenShift Provider<br\>91% : 91 Used of 100 Total<br\>9 Available'},
       {'id': 43, 'value': 0.9, 'tooltip': 'Node 18 : My Kubernetes Provider<br\>90% : 90 Used of 100 Total<br\>10 Available'},
       {'id': 7, 'value': 0.89, 'tooltip': 'Node 12 : My OpenShift Provider<br\>89% : 89 Used of 100 Total<br\>11 Available'},
       {'id': 41, 'value': 0.82, 'tooltip': 'Node 16 : My Kubernetes Provider<br\>82% : 82 Used of 100 Total<br\>18 Available'},
       {'id': 21, 'value': 0.81, 'tooltip': 'Node 21 : My OpenShift Provider<br\>81% : 81 Used of 100 Total<br\>19 Available'},
       {'id': 26, 'value': 0.8, 'tooltip': 'Node 1 : My Kubernetes Provider<br\>80% : 80 Used of 100 Total<br\>20 Available'},
       {'id': 48, 'value': 0.74, 'tooltip': 'Node 23 : My Kubernetes Provider<br\>74% : 74 Used of 100 Total<br\>26 Available'},
       {'id': 27, 'value': 0.72, 'tooltip': 'Node 2 : My Kubernetes Provider<br\>72% : 72 Used of 100 Total<br\>28 Available'},
       {'id': 42, 'value': 0.71, 'tooltip': 'Node 17 : My Kubernetes Provider<br\>71% : 71 Used of 100 Total<br\>29 Available'},
       {'id': 23, 'value': 0.71, 'tooltip': 'Node 23 : My OpenShift Provider<br\>71% : 71 Used of 100 Total<br\>29 Available'},
       {'id': 22, 'value': 0.69, 'tooltip': 'Node 22 : My OpenShift Provider<br\>69% : 69 Used of 100 Total<br\>31 Available'},
       {'id': 2, 'value': 0.66, 'tooltip': 'Node 2 : M8y OpenShift Provider<br\>66% : 66 Used of 100 Total<br\>34 Available'},
       {'id': 39, 'value': 0.66, 'tooltip': 'Node 14 : My Kubernetes Provider<br\>66% : 66 Used of 100 Total<br\>34 Available'},
       {'id': 3, 'value': 0.65, 'tooltip': 'Node 39 : My OpenShift Provider<br\>65% : 65 Used of 100 Total<br\>35 Available'},
       {'id': 29, 'value': 0.65, 'tooltip': 'Node 4 : My Kubernetes Provider<br\>65% : 65 Used of 100 Total<br\>35 Available'},
       {'id': 32, 'value': 0.56, 'tooltip': 'Node 7 : My Kubernetes Provider<br\>56% : 56 Used of 100 Total<br\>44 Available'},
       {'id': 13, 'value': 0.56, 'tooltip': 'Node 13 : My OpenShift Provider<br\>56% : 56 Used of 100 Total<br\>44 Available'},
       {'id': 49, 'value': 0.52, 'tooltip': 'Node 24 : My Kubernetes Provider<br\>52% : 52 Used of 100 Total<br\>48 Available'},
       {'id': 36, 'value': 0.5, 'tooltip': 'Node 11 : My Kubernetes Provider<br\>50% : 50 Used of 100 Total<br\>50 Available'},
       {'id': 6, 'value': 0.5, 'tooltip': 'Node 5 : My OpenShift Provider<br\>50% : 50 Used of 100 Total<br\>50 Available'},
       {'id': 38, 'value': 0.49, 'tooltip': 'Node 13 : My Kubernetes Provider<br\>49% : 49 Used of 100 Total<br\>51 Available'},
       {'id': 15, 'value': 0.48, 'tooltip': 'Node 15 : My OpenShift Provider<br\>48% : 48 Used of 100 Total<br\>52 Available'},
       {'id': 30, 'value': 0.48, 'tooltip': 'Node 5 : My Kubernetes Provider<br\>48% : 48 Used of 100 Total<br\>52 Available'},
       {'id': 11, 'value': 0.47, 'tooltip': 'Node 11 : My OpenShift Provider<br\>47% : 47 Used of 100 Total<br\>53 Available'},
       {'id': 17, 'value': 0.46, 'tooltip': 'Node 17 : My OpenShift Provider<br\>46% : 46 Used of 100 Total<br\>54 Available'},
       {'id': 25, 'value': 0.45, 'tooltip': 'Node 0 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 50, 'value': 0.45, 'tooltip': 'Node 25 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 46, 'value': 0.45, 'tooltip': 'Node 21 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 47, 'value': 0.45, 'tooltip': 'Node 22 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 1, 'value': 0.44, 'tooltip': 'Node 1 : My OpenShift Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 31, 'value': 0.44, 'tooltip': 'Node 6 : My Kubernetes Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 37, 'value': 0.44, 'tooltip': 'Node 12 : My Kubernetes Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 24, 'value': 0.44, 'tooltip': 'Node 24 : My OpenShift Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 40, 'value': 0.43, 'tooltip': 'Node 40 : My Kubernetes Provider<br\>43% : 43 Used of 100 Total<br\>57 Available'},
       {'id': 20, 'value': 0.39, 'tooltip': 'Node 20 : My OpenShift Provider<br\>39% : 39 Used of 100 Total<br\>61 Available'},
       {'id': 8, 'value': 0.39, 'tooltip': 'Node 8 : My OpenShift Provider<br\>39% : 39 Used of 100 Total<br\>61 Available'},
       {'id': 5, 'value': 0.38, 'tooltip': 'Node 5 : My OpenShift Provider<br\>38% : 38 Used of 100 Total<br\>62 Available'},
       {'id': 45, 'value': 0.37, 'tooltip': 'Node 20 : My Kubernetes Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 12, 'value': 0.37, 'tooltip': 'Node 12 : My OpenShift Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 34, 'value': 0.37, 'tooltip': 'Node 9 : My Kubernetes Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 33, 'value': 0.33, 'tooltip': 'Node 8 : My Kubernetes Provider<br\>33% : 33 Used of 100 Total<br\>67 Available'},
       {'id': 16, 'value': 0.32, 'tooltip': 'Node 16 : My OpenShift Provider<br\>32% : 32 Used of 100 Total<br\>68 Available'},
       {'id': 10, 'value': 0.29, 'tooltip': 'Node 10 : My OpenShift Provider<br\>28% : 29 Used of 100 Total<br\>71 Available'},
       {'id': 35, 'value': 0.28, 'tooltip': 'Node 35 : My Kubernetes Provider<br\>28% : 28 Used of 100 Total<br\>72 Available'},
       {'id': 18, 'value': 0.27, 'tooltip': 'Node 18 : My OpenShift Provider<br\>27% : 27 Used of 100 Total<br\>73 Available'},
       {'id': 4, 'value': 0.26, 'tooltip': 'Node 4 : My OpenShift Provider<br\>26% : 26 Used of 100 Total<br\>74 Available'},
       {'id': 19, 'value': 0.25, 'tooltip': 'Node 19 : My OpenShift Provider<br\>25% : 25 Used of 100 Total<br\>75 Available'},
       {'id': 28, 'value': 0.25, 'tooltip': 'Node 3 : My Kubernetes Provider<br\>25% : 25 Used of 100 Total<br\>75 Available'},
       {'id': 51, 'value': 0.22, 'tooltip': 'Node 26 : My Kubernetes Provider<br\>22% : 22 Used of 100 Total<br\>78 Available'},
       {'id': 14, 'value': 0.2, 'tooltip': 'Node 14 : My OpenShift Provider<br\>20% : 20 Used of 100 Total<br\>80 Available'}];

       $scope.titleAlt = 'Utilization - Overriding Defaults';
       $scope.legendLabels = ['< 60%','70%', '70-80%' ,'80-90%', '> 90%'];
       $scope.thresholds = [0.6, 0.7, 0.8, 0.9];
       $scope.heatmapColorPattern = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000', '#f00'];
     });
   </file>
   <file name="index.html">
     <div ng-controller="ChartCtrl" class="row">
       <div class="col-md-4">
         <div pf-heatmap id="id" chart-title="title" data="data"></div>
       </div>
       <div class="col-md-4">
         <div pf-heatmap id="id" chart-title="titleAlt" data="data" legend-labels="legendLabels" heatmap-color-pattern="heatmapColorPattern" thresholds="thresholds"></div>
       </div>
     </div>
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfHeatmap', function ($compile) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      data: '=',
      height: '=',
      chartTitle: '=?',
      legendLabels: '=?',
      thresholds: '=?',
      heatmapColorPattern: '=?'
    },
    replace: true,
    templateUrl: 'charts/heatmap/heatmap.html',
    link: function (scope, element, attrs) {
      var thisComponent = element[0].querySelector('.pf-heatmap-svg');
      var containerWidth, containerHeight, blockSize, numberOfRows;
      var thresholdDefaults = [0.7, 0.8, 0.9];
      var heatmapColorPatternDefaults = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000'];
      var legendLabelDefaults = ['< 70%', '70-80%' ,'80-90%', '> 90%'];
      var heightDefault = 200;

      var setSizes = function () {
        var parentContainer = element[0].querySelector('.heatmap-container');
        containerWidth = parentContainer.clientWidth;
        containerHeight = parentContainer.clientHeight;
        blockSize = determineBlockSize();
        numberOfRows = (blockSize === 0) ? 0 : Math.floor(containerHeight / blockSize);
      };

      var determineBlockSize = function () {
        var x = containerWidth;
        var y = containerHeight;
        var n = scope.data.length;
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

      var redraw = function () {
        var data = scope.data;
        var blockPadding = 1;
        var color = d3.scale.threshold().domain(scope.thresholds).range(scope.heatmapColorPattern);
        var component = thisComponent;
        var blocks;
        var highlightBlock = function (block, active) {
          block.style('fill-opacity', active ? 1 : 0.4);
        };
        var svg = window.d3.select(thisComponent);
        svg.selectAll('*').remove();

        blocks = svg.selectAll('rect').data(data).enter().append('rect');
        blocks.attr('x', function (d, i) {
          return (Math.floor(i / numberOfRows) * blockSize) + blockPadding;
        }).attr('y', function (d, i) {
          return (i % numberOfRows * blockSize) + blockPadding;
        }).attr('width', blockSize - (2 * blockPadding)).attr('height', blockSize - (2 * blockPadding)).style('fill', function (d) {
          return color(d.value);
        }).attr('tooltip-html-unsafe', function (d, i) { //tooltip-html is throwing an exception
          return d.tooltip;
        }).attr('tooltip-append-to-body', function (d, i) {
          return true;
        }).attr('tooltip-animation', function (d, i) {
          return false;
        });

        //Adding events
        blocks.on('mouseover', function () {
          blocks.call(highlightBlock, false);
          d3.select(this).call(highlightBlock, true);
        });
        blocks.on('click', function (d) {
          component.sendAction('click', d);
        });

        //Compiles the tooltips
        angular.forEach(angular.element(blocks), function (block) {
          var el = angular.element(block);
          $compile(el)(scope);
        });

        svg.on('mouseleave', function () {
          blocks.call(highlightBlock, true);
        });
      };

      //Allow overriding of defaults
      scope.thresholds = angular.extend([], thresholdDefaults, scope.thresholds);
      scope.heatmapColorPattern = angular.extend([], heatmapColorPatternDefaults, scope.heatmapColorPattern);
      scope.legendLabels = angular.extend([], legendLabelDefaults, scope.legendLabels);
      scope.height = scope.height || heightDefault;

      //Shows loading indicator
      scope.loadingDone = false;

      scope.$watch('data', function (newVal, oldVal) {
        if (typeof(newVal) !== 'undefined') {
          scope.loadingDone = true;
          setSizes();
          redraw();
        }
      });
    }
  };
});
