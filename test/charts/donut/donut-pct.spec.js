describe('Directive: pfDonutPctChart', function() {
  var $scope, isoScope, $compile, $timeout, element;

  beforeEach(module(
    'patternfly.charts',
    'charts/donut/donut-pct-chart.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    $scope.config = {
      'units': 'MHz',
      'thresholds':{'warning':'75.0','error':'90.00'}
    };

    $scope.data = {
      "used": 950,
      "total": 1000
    };

    element = compileDonut('<div pf-donut-pct-chart config="config" data="data"></div>', $scope);
  });

  var compileDonut = function (markup, scope) {
    var el = $compile(angular.element(markup))(scope);
    $scope.$apply();
    isoScope = el.isolateScope();
    return el;
  };

  it("should trigger error threshold", function() {
    expect(isoScope.statusDonutColor(isoScope).pattern[0]).toBe('#CC0000');  //red
  });

  it("should trigger warning threshold", function() {
    $scope.data.used = 850;
    $scope.$digest();
    expect(isoScope.statusDonutColor(isoScope).pattern[0]).toBe('#EC7A08');  //orange
  });

  it("should trigger no threshold", function() {
    $scope.data.used = 550;
    $scope.$digest();
    expect(isoScope.statusDonutColor(isoScope).pattern[0]).toBe('#0088CE');  //blue
  });
});
