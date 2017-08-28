(function (window, patternfly) {
  'use strict';

  var patternflyDefaults;

  var fallbackC3ChartDefaults = function () {
    console.error('patternfly.c3ChartDefaults unavailable.\nhttps://github.com/patternfly/angular-patternfly');
    return {};
  };

  window.patternfly = patternfly || {};
  window.patternfly.c3ChartDefaults = patternfly.c3ChartDefaults || fallbackC3ChartDefaults;

  patternflyDefaults = patternfly.c3ChartDefaults();

  angular.module('patternfly.charts').constant('c3ChartDefaults', {
    getDefaultColors: patternflyDefaults.getDefaultColors,
    getDefaultDonut: patternflyDefaults.getDefaultDonut,
    getDefaultDonutSize: patternflyDefaults.getDefaultDonutSize,
    getDefaultDonutColor: patternflyDefaults.getDefaultDonutColors,
    getDefaultDonutLegend: patternflyDefaults.getDefaultDonutLegend,
    getDefaultDonutConfig: patternflyDefaults.getDefaultDonutConfig,
    getDefaultSparklineArea: patternflyDefaults.getDefaultSparklineArea,
    getDefaultSparklineSize: patternflyDefaults.getDefaultSparklineSize,
    getDefaultSparklineAxis: patternflyDefaults.getDefaultSparklineAxis,
    getDefaultSparklineColor: patternflyDefaults.getDefaultColors,
    getDefaultSparklineLegend: patternflyDefaults.getDefaultSparklineLegend,
    getDefaultSparklinePoint: patternflyDefaults.getDefaultSparklinePoint,
    getDefaultSparklineTooltip: patternflyDefaults.getDefaultSparklineTooltip,
    getDefaultSparklineConfig: patternflyDefaults.getDefaultSparklineConfig,
    getDefaultLineConfig: patternflyDefaults.getDefaultLineConfig
  });

})(window, patternfly);

