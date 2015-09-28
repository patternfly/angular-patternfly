
describe('Directive: pfHeatmap', function() {
  var $scope, $compile, element, block, tooltip, color;

  beforeEach(module(
    'patternfly.charts',
    'charts/heatmap/heatmap.html',
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
    $scope.title = 'Utilization';
    $scope.data = [
      {'id': 9,'value': 0.96,'tooltip': 'Node 8 : My OpenShift Provider<br>96% : 96 Used of 100 Total<br>4 Available'},
      {'id': 44, 'value': 0.94, 'tooltip': 'Node 19 : My Kubernetes Provider<br>94% : 94 Used of 100 Total<br>6 Available'},
      {'id': 0, 'value': 0.91, 'tooltip': 'Node 9 : My OpenShift Provider<br>91% : 91 Used of 100 Total<br>9 Available'},
      {'id': 43, 'value': 0.9, 'tooltip': 'Node 18 : My Kubernetes Provider<br>90% : 90 Used of 100 Total<br>10 Available'},
      {'id': 7, 'value': 0.89, 'tooltip': 'Node 12 : My OpenShift Provider<br>89% : 89 Used of 100 Total<br>11 Available'},
      {'id': 41, 'value': 0.82, 'tooltip': 'Node 16 : My Kubernetes Provider<br>82% : 82 Used of 100 Total<br>18 Available'},
      {'id': 21, 'value': 0.81, 'tooltip': 'Node 21 : My OpenShift Provider<br>81% : 81 Used of 100 Total<br>19 Available'}];
  });


  it("should set the heatmap title", function() {
    element = compileChart('<div pf-heatmap chart-title="title" data="data"></div>',$scope);

    expect(angular.element(element).find('h3').html()).toBe('Utilization');
  });

  it("should generate 7 blocks", function() {
    element = compileChart('<div pf-heatmap chart-title="title" data="data"></div>',$scope);

    expect(angular.element(element).find('.pf-heatmap-svg').find('rect').size()).toBe(7);
  });

  it("should set color and tooltip of the block based on defaults", function() {
    element = compileChart('<div pf-heatmap chart-title="title" data="data"></div>',$scope);

    block = angular.element(element).find('.pf-heatmap-svg').children().first();
    tooltip = block.attr('tooltip-html-unsafe');

    expect(tooltip).toBe('Node 8 : My OpenShift Provider<br>96% : 96 Used of 100 Total<br>4 Available');

    color = block.attr('style');
    expect(color.trim()).toBe('fill: #ce0000;');
  });

  it("should block color based on color pattern overrides", function() {
    $scope.legendLabels = ['< 60%','70%', '70-80%' ,'80-90%', '> 90%'];
    $scope.thresholds = [0.6, 0.7, 0.8, 0.9];
    $scope.heatmapColorPattern = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000', '#ff0000'];

    element = compileChart('<div pf-heatmap chart-title="title" data="data" legend-labels="legendLabels" heatmap-color-pattern="heatmapColorPattern" thresholds="thresholds"></div>',$scope);

    block = angular.element(element).find('.pf-heatmap-svg').children().first();

    color = block.attr('style');
    expect(color.trim()).toBe('fill: #ff0000;');
  });

  it("should set color based on threshold overrides", function() {
    $scope.legendLabels = ['< 60%','70%', '70-80%' ,'80-90%', '> 98%'];
    $scope.thresholds = [0.6, 0.7, 0.8, 0.98];
    $scope.heatmapColorPattern = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000', '#ff0000'];

    element = compileChart('<div pf-heatmap chart-title="title" data="data" legend-labels="legendLabels" heatmap-color-pattern="heatmapColorPattern" thresholds="thresholds"></div>',$scope);
    block = angular.element(element).find('.pf-heatmap-svg').children().first();
    color = block.attr('style');
    expect(color.trim()).toBe('fill: #ce0000;');
  });

});
