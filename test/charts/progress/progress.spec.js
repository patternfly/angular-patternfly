describe('Directive: pfPercentageUsed', function() {
  var $scope, $compile, element;

  beforeEach(module(
    'patternfly.charts',
    'charts/progress/progress-chart.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  beforeEach(function() {
    $scope.quotas = [{ "title":"CPU", "start":"8", "end":"16" }];

    element = ' <div pf-percentage-used charts="quotas"></div>';
    element = $compile(element)($scope);
    $scope.$digest();
  });

  it("should set the used amount and percentage", function() {
    expect(angular.element(element).find('.used').html()).toBe("8 of 16");
    var usedChart = angular.element(element).find('.percentageUsedBarFilled');
    expect(usedChart.attr("style")).toBe("width:50%");
  });

  it("should update the used amount and percentage", function() {
    $scope.quotas = [{ "title":"CPU", "start":"4", "end":"16" }];
    $scope.$digest();

    expect(angular.element(element).find('.used').html()).toBe("4 of 16");
    var usedChart = angular.element(element).find('.percentageUsedBarFilled');
    expect(usedChart.attr("style")).toBe("width:25%");
  });
});
