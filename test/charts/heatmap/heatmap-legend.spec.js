describe('Directive: pfHeatmapLegend', function() {
  var $scope, $compile, element, legendItem, legendText, legendColor;

  beforeEach(module(
    'patternfly.charts',
    'charts/heatmap/heatmap-legend.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileChart = function (markup, scope) {
    var el = $compile(markup)(scope);
    scope.$digest();
    return angular.element(el);
  };

  beforeEach(function() {
    $scope.legendLabels = ['< 70%', '70-80%' ,'80-90%', '> 90%'];
    $scope.heatmapColorPattern = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000'];

    element = compileChart('<div pf-heatmap-legend legend="legendLabels" legend-colors="heatmapColorPattern"></div>',$scope);
  });


  it("should set the legend text and colors", function() {
    expect(angular.element(element).find('li').size()).toBe(4);

    legendItem = angular.element(element).find('li')[0];
    legendColor = legendItem.querySelector('.pf-legend-color-box');
    legendText = legendItem.querySelector('.pf-legend-text');

    expect(legendText.innerHTML).toBe("&gt; 90%");
    expect(legendColor.getAttribute('style')).toBe("background: #CE0000");
  });

});
