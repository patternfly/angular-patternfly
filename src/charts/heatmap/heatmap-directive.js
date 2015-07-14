angular.module('patternfly.charts').directive('pfHeatMap', ['ChartsMixin', '$timeout',
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
  }]);