(function () {
  'use strict';

  angular.module('patternfly.charts').constant('c3ChartDefaults', {
    getDefaultDonut: function (title) {
      return {
        title: title,
        label: {
          show: false
        },
        width: 10
      };
    },
    getDefaultDonutSize: function () {
      return {
        height: 130
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
    }
  });

})();
