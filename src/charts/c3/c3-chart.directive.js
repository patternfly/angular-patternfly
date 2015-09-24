/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfC3Chart
 *
 * @description
 *   Directive for wrapping c3 library
 *
 *   Note: The 'patternfly.charts' module is not a dependency in the default angular 'patternfly' module.
 *   In order to use patternfly charts you must add 'patternfly.charts' as a dependency in your application.
 *
 *
 * @param {string} id the ID of the container that the chart should bind to
 * @param {expression} config the c3 configuration options for the chart
 *
 * @example

 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
        <div pf-c3-chart id="chartId"  config="chartConfig"></div>

        <form role="form" style="width:300px">
          Total = {{total}}, Used = {{used}}, Available = {{available}}
          <div class="form-group">
            <label>Used</label>
            <input type="text" class="form-control" ng-model="newUsed">
          </div>
          <input type="button" ng-click="submitform(newUsed)" value="Go" />
        </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
       $scope.used = 950;
       $scope.total = 1000;
       $scope.available =  $scope.total - $scope.used;

       $scope.chartConfig = {
         type: "donut",
         donut: {
           title: "MHz Used",
           label: {show: false},
           width: 10
          },
          size: {
            height: 130
          },
          legend: {
            show: false
            },
          color: {
            pattern: ["#0088CE","#D1D1D1"]
          },
          tooltip: {},
          data: {
            type: "donut",
            columns: [
              ["Used", $scope.used],
              ["Available", $scope.total - $scope.used]
            ],
            groups: [
              ["used", "available"]
            ],
            order: null
          }
       };

       $scope.updateAvailable = function (val) {
         $scope.available =  $scope.total - $scope.used;
       }

       $scope.submitform = function (val) {
         $scope.used = val;
         $scope.updateAvailable();
         $scope.chartConfig.data.columns = [["Used",$scope.used],["Available",$scope.available]];
       };
     });
   </file>
 </example>
 */
(function () {
  'use strict';

  angular.module('patternfly.charts').directive('pfC3Chart', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        config: '='
      },
      template: '<div id=""></div>',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$watch('config', function () {
          $timeout(function () {
            //generate c3 chart data
            var chartData = scope.config;
            chartData.bindto = '#' + attrs.id;
            c3.generate(chartData);
          });
        }, true);
      }
    };
  });
}());
