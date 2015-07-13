/**
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
      template: '<div></div>',
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
}(c3));