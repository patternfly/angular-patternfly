describe('Directive: pfUtilizationBarChart', function() {
  var $scope, $compile, element, utilizationBar, title, subTitle;

  beforeEach(module(
    'patternfly.charts',
    'charts/utilization-bar/utilization-bar-chart.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  beforeEach(function() {

    $scope.data = {
      'used': '8',
      'total': '16'
    };

    $scope.title = 'CPU Usage';
    $scope.units = 'GB';

    element = compileChart('<div pf-utilization-bar-chart chart-data=data description=title units=units></div>', $scope);

  });

  var compileChart = function (markup, scope) {
    var el = $compile(markup)(scope);
    scope.$digest();
    return el;
  };

  it("should set the width of the inner bar to be 50%", function() {
    utilizationBar = angular.element(element).find('.progress-bar').css('width');
    expect(utilizationBar).toBe("50%");
  });

  it("should set the charts titles", function() {
    title = angular.element(element).find('.progress-description').html();
    expect(title).toBe("CPU Usage");

    subTitle = angular.element(element).find('.progress-bar span').html();
    expect(subTitle).toBe("8 of 16 GB");
  });

});
