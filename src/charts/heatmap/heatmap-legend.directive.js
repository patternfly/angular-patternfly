angular.module('patternfly.charts').directive('pfHeatmapLegend',
  function () {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        legend: '=',
        legendColors: '='
      },
      replace: true,
      templateUrl: 'charts/heatmap/heatmap-legend.html',
      link: function ($scope) {
        var buildLegend = function () {
          var items = [];
          var index;
          for (index = $scope.legend.length - 1; index >= 0; index--) {
            items.push({
              text: $scope.legend[index],
              color: $scope.legendColors[index]
            });
          }
          $scope.legendItems = items;
        };

        buildLegend();
      }
    };
  }
);
