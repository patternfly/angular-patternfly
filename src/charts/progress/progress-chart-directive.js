/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfPercentageUsed
 *
 * @description
 *   Directive for rendering a percentage used progress chart. Will render one or more
 *   bars based on data 
 *
 *
 * @param {string} charts model data to be displalayed
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
          //Calculate the perentage used  
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
