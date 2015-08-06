describe('Directive: pfDonutPctChart', function() {
  var $scope, $compile, $timeout, element;

  beforeEach(module(
    'patternfly.charts',
    'charts/donut/donut-percent-chart.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    $scope.config = {
      'chartId': 'cpuUsageChart',
      'totalUnits': 'MHz',
      'usageDataName': 'Used',
      'thresholds':{'warning':'75.0','error':'90.00'}
    };

    $scope.data = {
      "used": 950,
      "total": 1000
    };
  });

  var compileDonut = function (markup, scope) {
    var el = $compile(markup)(scope);
    scope.$digest();
    return el;
  };

  it("should set the middle label", function() {
    element = compileDonut('<div pf-donut-pct-chart config="config" data="data"></div>', $scope);
    //$timeout.flush();

    // Unit Test fails at this point with "MutationObserver is not defined"
    // Need to upgrade to PhantomJS 2.0  which has MutationObserver support built in
    // we are currently using PhantomJS 1.9.8.


    //expect(angular.element(element).find('.utilization-chart-title-big').html()).toBe("950");
  });
});
