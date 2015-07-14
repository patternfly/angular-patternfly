angular.module('patternfly.charts').factory('ChartsMixin', function() {
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
  });