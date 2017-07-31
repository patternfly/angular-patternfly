describe('Component: pfC3Chart', function() {
  var $scope, $compile, element;

  beforeEach(module(
    'patternfly.charts'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  beforeEach(function() {
    $scope.myChart = "myChartId";
    $scope.chartConfig = {};
    element = '<pf-c3-chart id="myChart" config="chartConfig"></pf-c3-chart>';
    element = $compile(element)($scope);
    $scope.$digest();
  });

  it("should have access to a global PatternFly object & method", function() {
    expect(window.patternfly).toBeDefined();
    expect(window.patternfly.c3ChartDefaults()).toBeDefined();
  });

  it("chart should find empty template", function() {
    expect(angular.element(element).html()).toBe('<div id=""></div>');
  });

});
