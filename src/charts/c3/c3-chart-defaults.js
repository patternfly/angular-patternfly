(function () {
  'use strict';

  angular.module('patternfly.charts').constant('c3ChartDefaults', {
    getDefaultDonut: function (title) {
      return {
        title: title,
        label: {
          show: false
        },
        width: 11
      };
    },
    getDefaultDonutSize: function () {
      return {
        height: 171 // produces a diameter of 150 and a centered chart
      };
    },
    getDefaultDonutColor: function () {
      return {
        pattern: ['#0088CE', '#D1D1D1']
      };
    },
    getDefaultDonutTooltip: function () {
      return {
        show: false
      };
    },
    getDefaultDonutLegend: function () {
      return {
        show: false
      };
    },
    getDefaultDonutConfig: function (title) {
      return {
        donut: this.getDefaultDonut(title),
        size: this.getDefaultDonutSize(),
        legend: this.getDefaultDonutLegend(),
        color: this.getDefaultDonutColor(),
        tooltip: this.getDefaultDonutTooltip()
      };
    },
    getDefaultSparklineArea: function () {
      return {
        zerobased: true
      };
    },
    getDefaultSparklineSize: function () {
      return {
        height: 60
      };
    },
    getDefaultSparklineAxis: function () {
      return {
        x: {
          show: false
        },
        y: {
          show: false
        }
      };
    },
    getDefaultSparklineColor: function () {
      return {
        pattern: ['#0088ce', '#00659c', '#3f9c35', '#ec7a08', '#cc0000']
      };
    },
    getDefaultSparklineLegend: function () {
      return {
        show: false
      };
    },
    getDefaultSparklinePoint: function () {
      return {
        r: 1,
        focus: {
          expand: {
            r: 4
          }
        }
      };
    },
    getDefaultSparklineTooltip: function () {
      return {
        // because a sparkline should only contain a single data column, the tooltip will only work for a single data column
        contents: function (d) {
          return '<span class="c3-tooltip-sparkline">' + d[0].value + ' ' + d[0].name + '</span>';
        }
      };
    },
    getDefaultSparklineConfig: function () {
      return {
        area: this.getDefaultSparklineArea(),
        size: this.getDefaultSparklineSize(),
        axis: this.getDefaultSparklineAxis(),
        color: this.getDefaultSparklineColor(),
        legend: this.getDefaultSparklineLegend(),
        point: this.getDefaultSparklinePoint(),
        tooltip: this.getDefaultSparklineTooltip()
      };
    }
  });
})();
