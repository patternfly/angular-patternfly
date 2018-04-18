describe('Component: pfTopologyMap', function () {
  var $compile;
  var $scope;
  var $httpBackend;
  var element;
  var controller;

  beforeEach(module(
    'patternfly.charts',
    'charts/topology-map/topology-map.html'
  ));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
    $scope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope.nodes = [
      {
        id: 1,
        title: 'foo',
        size: 16,
        x: 30,
        y: 30,
        fonticon: "fa fa-cog",
      },
      {
        id: 2,
        title: 'foo2',
        x: 150,
        y: 150,
        size: 32,
      }
    ];
    $scope.tooltipStyle = {
      background: 'rgba(0, 0, 0, .5)',
      size: 50,
    };
    $scope.edges = [
      {
        source: 1,
        target: 2,
      }
    ];
    $scope.selectNode = function (node) {};
    $scope.nodeMultiSelect = function (nodes) {};
    compileChart('<pf-topology-map nodes="nodes" edges="edges" select-node="selectNode" node-multi-select="nodeMultiSelect"></pf-topology-map>', $scope);
  }));

  var compileChart = function (markup, scope) {
    element = $compile(angular.element(markup))(scope);
    scope.$apply();
    controller = element.controller('pfTopologyMap');
    controller.canvasW = 200;
    controller.canvasH = 200;
    return element;
  };

  it('Should render canvas element', function () {
    expect(element.find('canvas')).not.toBe(undefined);
  });

  it('Component controller should be defined', function () {
    expect(controller).toBeDefined();
  });

  it('Component should have nodes', function () {
    expect(controller.nodes).toBeDefined();
    expect(controller.nodes.length).toBe($scope.nodes.length);
  });

  it('method findNode() should find correct node', function () {
    expect(controller.findNode(30,30)).toBeDefined();
    expect(controller.findNode(30,30).id).toBe(1);
    expect(controller.findNode(100, 3100)).toBeUndefined();
  });

  it('normalizeNode should add node size', function () {
    var node = {};
    controller.normalizeNode(node);
    expect(node.size).toBe(17);
    node.size = 32;
    controller.normalizeNode(node);
    expect(node.size).toBe(32);
  });

  it('normalizeNode should prevent node to get out of bounds', function () {
    var node = {x: -10, y: 25};
    controller.normalizeNode(node);
    expect(node.x).toBe(node.size + 1);
    expect(node.y).toBe(25);

    node.x = 500;
    node.y = 500;
    controller.normalizeNode(node);
    expect(node.x).toBe(controller.canvasW - node.size - 1);
    expect(node.y).toBe(controller.canvasH - node.size - 1);

    node.x = 50;
    node.y = 500;
    controller.normalizeNode(node);
    expect(node.x).toBe(50);
    expect(node.y).toBe(controller.canvasH - node.size - 1);
  });

  it('getRealCoordinates should return correct point coordinates', function () {
    var x = 10;
    var y = 10;
    var coordinates = controller.getRealCoordinates(x, y);
    expect(coordinates[0]).toBe(10);
    expect(coordinates[1]).toBe(10);

    controller.transform.k = 1.25;
    coordinates = controller.getRealCoordinates(x, y);
    expect(coordinates[0]).toBe(8);
    expect(coordinates[1]).toBe(8);

    controller.transform.k = 1.25;
    controller.transform.x = 33;
    controller.transform.y = -16;
    coordinates = controller.getRealCoordinates(x, y);
    expect(coordinates[0]).toBe(-18.4);
    expect(coordinates[1]).toBe(20.8);
  });

  it('should return if node is colliding', function () {
    var node = {x: 10, y: 35, size: 17};
    var collision = controller.collide(node);
    expect(collision).toBeTruthy();
  });

  it('point over edge should return edge', function () {
    var x = 30;
    var y = 30;
    var edge = controller.pointOverEdge(x, y);
    expect(edge).toBeDefined();

    x = 30;
    y = 150;edge = controller.pointOverEdge(x, y);
    expect(edge).toBeUndefined();
  });

  it ('should correctly select node', function () {
    var node = controller.nodes[0];

    spyOn(controller, 'selectNode');
    spyOn(controller, 'multiSelectNodes');
    controller.assignNode(node, false);
    expect(controller.selectedNode).toBe(node);
    expect(controller.selectNode).toHaveBeenCalled();
    expect(controller.multiSelectNodes).toHaveBeenCalled();
  });
});
