angular.module('patternfly.charts').component('pfTopologyMap', {
  bindings: {
    nodes: '<',
    edges: '<',
    selectNode: '&',
    multiSelectNodes: '&',
    tooltipStyle: '<?',
    showNodeLabels: '<?',
    showEdgeLabels: '<?',
    selectEdge: '&',
    multiSelectEdges: '&',
  },
  templateUrl: 'charts/topology-map/topology-map.html',
  controller: function  ($element, pfUtils, $scope, $window, $q) {
    'use strict';
    var ctrl = this;
    ctrl.canvas = null;
    ctrl.showNodeLabels = false;
    ctrl.showEdgeLabels = false;
    ctrl.scale = 1;
    ctrl.cachedIcons = {};
    ctrl.nodeMultiSelect = [];
    ctrl.edgeMultiSelect = [];
    ctrl.IE11 = !!window.MSInputMethodContext && !!document.documentMode;

    this.$onInit = function () {
      ctrl.zoom = d3.behavior.zoom()
        .scale(1)
        .scaleExtent([1, 8]);
      ctrl.transform = {
        x: ctrl.zoom.translate()[0],
        y: ctrl.zoom.translate()[1],
        k: ctrl.zoom.scale(),
      };
      ctrl.rules = ctrl.findRules();
      ctrl.loadIcons();
      ctrl.setUpCanvas();
      ctrl.setUpForce();
      ctrl.setUpDrag();
      ctrl.setUpSelection();
      ctrl.setUpSemanticZoom();
      ctrl.setUpTooltips();
    };

    this.$onChanges = function (changes) {
      if (ctrl.force) {
        if (changes.showNodeLabels
          && !changes.showNodeLabels.isFirstChange()
          && changes.showNodeLabels.previousValue !== ctrl.showNodeLabels) {
          ctrl.force.on('tick')();
        } else if (changes.showEdgeLabels
          && !changes.showEdgeLabels.isFirstChange()
          && changes.showEdgeLabels.previousValue !== ctrl.showEdgeLabels) {
          ctrl.force.on('tick')();
        } else {
          ctrl.loadIcons();
          ctrl.setUpForce();
        }
      }
    };

    ctrl.setUpTooltips = function () {
      var canvas = d3.select(ctrl.canvas);
      if (ctrl.tooltipStyle) {
        ctrl.tooltipStyle = {
          size: ctrl.tooltipStyle.size || 12,
          font: ctrl.tooltipStyle.font || '"Open Sans", Helvetica, Arial, sans-serif',
          textColor: ctrl.tooltipStyle.textColor || '#FFFFFF',
          background: ctrl.tooltipStyle.background || 'rgba(0, 0 , 0, 0.5)',
          borderColor: ctrl.tooltipStyle.borderColor || 'transparent',
          borderWidth: ctrl.tooltipStyle.borderWidth || 0,
        };
      } else {
        ctrl.tooltipStyle = {
          size: 12,
          font: '"Open Sans", Helvetica, Arial, sans-serif',
          textColor: '#FFFFFF',
          background: 'rgba(0, 0 , 0, 0.5)',
          borderColor: 'transparent',
          borderWidth: 0,
        };
      }

      canvas.on('mousemove', mouseMove);
      function mouseMove () {
        var node;
        var edge;
        if (d3.event.defaultPrevented  || ctrl.draggedNode) {
          return;
        }
        ctrl.tooltip = ctrl.findNode.apply(this, ctrl.getRealCoordinates(d3.event.offsetX, d3.event.offsetY));
        if (!ctrl.tooltip) {
          ctrl.highlightEdge = ctrl.pointOverEdge.apply(this, ctrl.getRealCoordinates(d3.event.offsetX, d3.event.offsetY));
        }
        if (ctrl.tooltip || ctrl.highlightEdge) {
          ctrl.canvas.style.cursor = 'pointer';
        } else {
          ctrl.canvas.style.cursor = 'auto';
        }
        ctrl.force.on('tick')();
      }
    };

    this.ctrlKey = function () {
      var platform = $window.navigator.platform;
      if (platform === 'MacIntel') {
        return d3.event.shiftKey;
      }
      return d3.event.ctrlKey || d3.event.shiftKey;
    };

    ctrl.assignNode = function (node, addKey) {
      ctrl.selectedNode = ctrl.selectedNode && ctrl.selectedNode.id === node.id ? null : node;
      node.fixed = ! node.fixed;
      if (addKey) {
        _.find(ctrl.nodeMultiSelect, function(n) {
          return n.id === node.id;
        }) ? _.remove(ctrl.nodeMultiSelect, function (n) {
          return n.id === node.id;
        }) : ctrl.nodeMultiSelect.push(node);
      }
      if (ctrl.nodeMultiSelect.length === 0 || !addKey) {
        ctrl.nodeMultiSelect = [node];
      }
      if (ctrl.selectNode) {
        ctrl.selectNode({node: node});
      }
      if (ctrl.multiSelectNodes) {
        ctrl.multiSelectNodes({array: ctrl.nodeMultiSelect});
      }
      ctrl.force.on('tick')();
    };

    ctrl.setUpSelection = function () {
      var canvas = d3.select(ctrl.canvas);
      canvas.on('click', click);
      function click () {
        var node;
        var edge;
        var addKey = ctrl.ctrlKey();
        if (d3.event.defaultPrevented) {
          return;
        }
        node = ctrl.findNode.apply(this, ctrl.getRealCoordinates(d3.event.offsetX, d3.event.offsetY));
        if (node && (ctrl.selectNode || ctrl.multiSelectNodes)) {
          ctrl.assignNode(node, addKey);
        } else {
          edge = ctrl.pointOverEdge.apply(this, ctrl.getRealCoordinates(d3.event.offsetX, d3.event.offsetY));
          if (edge && (ctrl.selectEdge || ctrl.multiSelectEdges)) {
            if (addKey) {
              _.find(ctrl.edgeMultiSelect, function(e) {
                return _.isEqual(e, edge);
              }) ? _.remove(ctrl.edgeMultiSelect, function (e) {
                return _.isEqual(e, edge);
              }) : ctrl.edgeMultiSelect.push(edge);
            }
            if (ctrl.edgeMultiSelect.length === 0 || !addKey) {
              ctrl.edgeMultiSelect = [edge];
            }
            ctrl.selectedEdge = ctrl.selectedEdge ? _.isEqual(ctrl.selectedEdge, edge) ? null : edge : edge;
            if (ctrl.selectEdge) {
              ctrl.selectEdge({edge: edge});
            }
            if (ctrl.multiSelectEdges) {
              ctrl.multiSelectEdges({array: ctrl.edgeMultiSelect});
            }
            ctrl.force.on('tick')();
          }
        }
      }
    };

    $window.onresize = function (event) {
      ctrl.setUpCanvas();
      ctrl.force.on('tick')();
    };

    ctrl.setUpCanvas = function () {
      var coords;
      ctrl.canvas = $element[0].querySelector('canvas.topology-graph');
      coords = ctrl.canvas.getBoundingClientRect();
      ctrl.canvasW = ctrl.canvas.clientWidth;
      ctrl.canvasH = ctrl.canvas.clientHeight;
      ctrl.canvas.width = ctrl.canvasW;
      ctrl.canvas.height = ctrl.canvasH;
      ctrl.canvasX = coords.left;
      ctrl.canvasY = coords.top;
      ctrl.context = ctrl.canvas.getContext('2d');
    };

    ctrl.findNode = function (x, y) {
      var result = undefined;
      var size;
      ctrl.force.nodes().forEach(function (node) {
        if (Math.pow((x - node.x), 2) + Math.pow((y - node.y), 2) < Math.pow(node.size / ctrl.transform.k, 2)) {
          size = ctrl.force.nodes().length - 1;
          ctrl.force.nodes()[size].index = node.index;
          ctrl.force.nodes()[node.index] = ctrl.force.nodes()[size];
          node.index = size;
          ctrl.force.nodes()[size] = node;
          result = node;
        }
      });
      return result;
    };

    // NOTE: formula https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
    ctrl.pointOverEdge = function(x, y) {
      return _.find(ctrl.edges, function(edge) {
        var x1 = edge.source.x;
        var x2 = edge.target.x;
        var y1 = edge.source.y;
        var y2 = edge.target.y;
        var distance = Math.abs((y - y2) * x1 - (x - x2) * y1 + x * y2 - y * x2) / Math.sqrt(Math.pow((y - y2),2) + Math.pow((x - x2),2));
        var dotproduct = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
        var tolerance = 10;
        var squaredlengthba = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (distance > tolerance) {
          return false;
        }
        //test if the point c is between a and b
        if (dotproduct < 0) {
          return false;
        }

        if (dotproduct > squaredlengthba) {
          return false;
        }
        return true;
      });
    };

    ctrl.getRealCoordinates = function (x, y) {
      return [
        (x - ctrl.transform.x) / ctrl.transform.k,
        (y - ctrl.transform.y) / ctrl.transform.k,
      ];
    };

    ctrl.setUpDrag = function () {
      var drag = d3.behavior.drag();
      var canvas = d3.select(ctrl.canvas);
      canvas.call(drag.on('dragstart', onDragStart).on('drag', onDrag).on('dragend', onDragEnd));
      function onDragStart () {
        ctrl.tooltip = undefined;
        d3.event.sourceEvent.stopPropagation();
        ctrl.draggedNode = ctrl.findNode.apply(this, ctrl.getRealCoordinates(d3.event.sourceEvent.offsetX, d3.event.sourceEvent.offsetY));
      }
      function onDrag () {
        var newCoordinates = ctrl.getRealCoordinates(d3.event.sourceEvent.offsetX, d3.event.sourceEvent.offsetY);
        if (ctrl.draggedNode) {
          d3.event.sourceEvent.stopPropagation();
          ctrl.draggedNode.px = newCoordinates[0];
          ctrl.draggedNode.py = newCoordinates[1];
          ctrl.draggedNode.fixed = true;
          ctrl.force.start();
        }
      }
      function onDragEnd () {
        d3.event.sourceEvent.stopPropagation();
        ctrl.draggedNode = undefined;
      }
    };

    ctrl.setUpSemanticZoom = function () {
      var canvas = d3.select(ctrl.canvas)
        .call(ctrl.zoom.on("zoom", semanticZoom));
      function semanticZoom () {
        var translateX;
        var translateY;
        if (ctrl.draggedNode) {
          return;
        }
        if (ctrl.zoom.scale() === 1) {
          translateY = 0;
          translateX = 0;
        } else {
          translateX = Math.min(0, Math.max(ctrl.zoom.translate()[0], ctrl.canvasW - ctrl.canvasW * ctrl.zoom.scale()));
          translateY = Math.min(0, Math.max(ctrl.zoom.translate()[1], ctrl.canvasH - ctrl.canvasH * ctrl.zoom.scale()));
        }
        ctrl.zoom.translate([translateX, translateY]);
        ctrl.transform = {
          x: translateX,
          y: translateY,
          k: ctrl.zoom.scale(),
        };
        ctrl.draw();
      }
    };

    //return coordinates after canvas transformation
    ctrl.transformApply = function (x, y) {
      return {
        x: x * ctrl.transform.k + ctrl.transform.x,
        y: y * ctrl.transform.k  + ctrl.transform.y,
      };
    };

    ctrl.draw = function () {
      ctrl.context.clearRect(0, 0, ctrl.canvasW, ctrl.canvasH, d3.scale.linear());
      ctrl.drawEdges();
      ctrl.drawNodes();
      if (!ctrl.showNodeLabels && ctrl.tooltip && ctrl.tooltip.title) {
        ctrl.drawNodeTooltip(ctrl.tooltip);
      }
      if (!ctrl.showEdgeLabels && ctrl.highlightEdge && ctrl.highlightEdge.title) {
        ctrl.drawEdgeTooltip(ctrl.highlightEdge);
      }
      if (ctrl.transform.scale !== 1) {
        ctrl.drawMiniMap();
      }
    };

    ctrl.setUpForce = function () {
      ctrl.force = d3.layout.force()
        .charge(function (d, i) {
          return i ? -500 : -2500;
        })
        .friction(0.5)
        .chargeDistance(400)
        .gravity(0)
        .linkDistance(100)
        .linkStrength(1)
        .size([ctrl.canvasW, ctrl.canvasH]);

      ctrl.edges.forEach(function (edge) {
        edge.source = _.findIndex(ctrl.nodes, function (node) {
          return node.id === edge.source;
        });
        edge.target = _.findIndex(ctrl.nodes, function (node) {
          return node.id === edge.target;
        });
      });

      ctrl.force.nodes(ctrl.nodes)
        .links(ctrl.edges)
        .on('tick', tick)
        .start();

      function tick () {
        ctrl.draw();
      }
    };

    ctrl.shouldHighlightEdge = function(edge) {
      return _.isEqual(edge, ctrl.highlightEdge) || _.find(ctrl.edgeMultiSelect, function(e) {
        return _.isEqual(edge, e);
      });
    };

    ctrl.drawEdges = function () {
      var quadtree = d3.geom.quadtree(ctrl.force.nodes());
      ctrl.context.strokeStyle = 'rgba(150, 150, 150, 0.6)';
      ctrl.context.lineWidth = 1;
      ctrl.edges.forEach(function (d) {
        var sourceCoords;
        var targetCoords;
        var highlight = ctrl.shouldHighlightEdge(d);
        ctrl.context.strokeStyle = highlight ? 'rgba(0, 0, 0, .5)' : 'rgba(150, 150, 150, 0.6)';
        quadtree.visit(ctrl.collide(d.source));
        quadtree.visit(ctrl.collide(d.target));
        sourceCoords = ctrl.transformApply(d.source.x, d.source.y);
        targetCoords = ctrl.transformApply(d.target.x, d.target.y);
        ctrl.context.beginPath();
        ctrl.context.setLineDash([]);
        if (d.lineStyle === 'dashed') {
          ctrl.context.setLineDash([10, 5]);
        }
        ctrl.context.moveTo(sourceCoords.x, sourceCoords.y);
        ctrl.context.lineTo(targetCoords.x, targetCoords.y);
        if (highlight) {
          ctrl.context.shadowBlur = 15;
          ctrl.context.shadowOffsetX = 3;
          ctrl.context.shadowOffsetY = 3;
          ctrl.context.shadowColor = "rgba(0, 0, 0, 0.5)";
        } else {
          ctrl.context.shadowColor = 'transparent';
        }
        ctrl.context.stroke();
        ctrl.context.shadowColor = 'transparent';
        if (ctrl.showEdgeLabels && d.title) {
          ctrl.drawEdgeTooltip(d);
        }
      });
    };

    ctrl.normalizeNode = function (node) {
      node.size = node.size || 17;
      node.x = Math.max(node.size + 1, Math.min(ctrl.canvasW - node.size - 1, node.x));
      node.y = Math.max(node.size + 1, Math.min(ctrl.canvasH - node.size - 1, node.y));
    };

    ctrl.shouldHighlightNode = function(node) {
      return (ctrl.tooltip && ctrl.tooltip.id === node.id) || _.find(ctrl.nodeMultiSelect, function(n) {
        return n.id === node.id;
      });
    };

    ctrl.drawNodes = function () {
      var coordinates;
      ctrl.nodes.forEach(function (node) {
        var imgR = node.size * 0.7;
        var highlight = ctrl.shouldHighlightNode(node);
        ctrl.normalizeNode(node);
        ctrl.context.globalAlpha = node.opacity || 1;
        coordinates = ctrl.transformApply(node.x, node.y);
        ctrl.context.beginPath();
        ctrl.context.fillStyle = node.fill || "#FFFFFF";
        ctrl.context.strokeStyle = node.borderColor || '#000000';
        ctrl.context.lineWidth = highlight ? 3 : 1;
        ctrl.context.arc(coordinates.x, coordinates.y, node.size, 0, 2 * Math.PI);
        if (highlight) {
          ctrl.context.shadowBlur = 20;
          ctrl.context.shadowOffsetX = 5;
          ctrl.context.shadowOffsetY = 5;
          ctrl.context.shadowColor = "rgba(0, 0, 0, 0.5)";
        } else {
          ctrl.context.shadowColor = 'transparent';
        }
        ctrl.context.fill();
        ctrl.context.shadowColor = 'transparent';
        ctrl.context.stroke();

        if (node.utilization) {
          ctrl.context.beginPath();
          ctrl.context.lineWidth = 5;
          ctrl.context.arc(coordinates.x, coordinates.y, node.size, 0, ((node.utilization / 100) * 2) * Math.PI);
          ctrl.context.strokeStyle = pfUtils.utilizationToColor(node.utilization);
          ctrl.context.stroke();
        }

        //draw icon
        ctrl.context.beginPath();
        ctrl.context.fillStyle = node.iconColor || '#000000';
        ctrl.context.textAlign = 'center';
        ctrl.context.textBaseline = 'middle';
        if (node.fonticon) {
          ctrl.context.font = 'normal normal normal ' + node.size + 'px FontAwesome';
          ctrl.context.fillText(ctrl.cachedIcons[node.fonticon].char, coordinates.x, coordinates.y);
        } else if (node.fileicon) {
          ctrl.context.drawImage(ctrl.cachedIcons[node.fileicon].img, coordinates.x - imgR, coordinates.y - imgR, 2 * imgR, 2 * imgR);
        } else {
          ctrl.context.font = 2 * imgR + 'px ' + ctrl.cachedIcons.unknown.font;
          ctrl.context.fillText(ctrl.cachedIcons.unknown.char, coordinates.x, coordinates.y);
        }
        ctrl.context.globalAlpha = 1;
        if (ctrl.showNodeLabels && node.title) {
          ctrl.drawNodeTooltip(node);
        }
      });
    };

    ctrl.drawMiniMap = function () {
      var mapX = 0.9 * ctrl.canvasW - 10,
        mapY = 10,
        mapW = 0.1 * ctrl.canvasW,
        mapH = 0.1 * ctrl.canvasH;
      ctrl.context.lineWidth = 1;
      ctrl.context.beginPath();
      ctrl.context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctrl.context.fillStyle = 'rgba(252, 252, 252, 0.3)';

      ctrl.context.rect(mapX, mapY, mapW, mapH);
      ctrl.context.stroke();
      ctrl.context.fill();

      ctrl.context.beginPath();
      ctrl.context.fillStyle = 'rgba(224, 224, 224, 0.3)';
      ctrl.context.rect(
        mapX - ctrl.transform.x / ctrl.transform.k * 0.1,
        mapY - ctrl.transform.y / ctrl.transform.k * 0.1,
        mapW / ctrl.transform.k,
        mapH / ctrl.transform.k
      );
      ctrl.context.stroke();
      ctrl.context.fill();
    };

    ctrl.drawEdgeTooltip = function (edge) {
      var sourceCoordinates = ctrl.transformApply(edge.source.x, edge.source.y);
      var targetCoordinates = ctrl.transformApply(edge.target.x, edge.target.y);
      var midX = sourceCoordinates.x + (targetCoordinates.x - sourceCoordinates.x) * 0.50;
      var midY = sourceCoordinates.y + (targetCoordinates.y - sourceCoordinates.y) * 0.50;
      var tmp = document.createElement('span');
      var tooltipWidth;

      tmp.innerHTML = edge.title;
      tmp.style.padding = '10px';
      tmp.style.visibility = 'hidden';
      tmp.style.display = 'inline-block';
      //to measure width, element must be in the actual DOM
      document.body.appendChild(tmp);
      tooltipWidth = tmp.clientWidth;ctrl.context.beginPath();

      ctrl.context.fillStyle = "#000000";
      ctrl.context.font = ctrl.tooltipStyle.size + 'px ' + ctrl.tooltipStyle.font;
      ctrl.context.fillText(edge.title, midX, midY + 5);

      //clean the temp element
      document.body.removeChild(tmp);
    };

    ctrl.drawNodeTooltip = function (node) {
      var coordinates = ctrl.transformApply(node.x, node.y);
      var tooltipWidth = 0;
      var offsetY = coordinates.y + node.size + ctrl.tooltipStyle.size + 5;
      //to determine the width of tooltip, we will use actual widt of html element, because the measureText function return inconsistent values
      var tmp = document.createElement('span');
      tmp.innerHTML = node.title;
      tmp.style.padding = '10px';
      tmp.style.visibility = 'hidden';
      tmp.style.display = 'inline-block';
      //to measure width, element must be in the actual DOM
      document.body.appendChild(tmp);
      tooltipWidth = tmp.clientWidth;

      ctrl.context.beginPath();
      ctrl.context.rect(coordinates.x - tooltipWidth / 2 - 5, offsetY - ctrl.tooltipStyle.size, tooltipWidth + 10, ctrl.tooltipStyle.size + 10);
      ctrl.context.fillStyle = ctrl.tooltipStyle.background;
      ctrl.context.fill();

      ctrl.context.lineWidth = ctrl.tooltipStyle.borderWidth;
      ctrl.context.strokeStyle = ctrl.tooltipStyle.borderColor;
      ctrl.context.stroke();

      ctrl.context.fillStyle = ctrl.tooltipStyle.textColor;
      ctrl.context.font = ctrl.tooltipStyle.size + 'px ' + ctrl.tooltipStyle.font;
      ctrl.context.fillText(node.title, coordinates.x, offsetY);

      //clean the temp element
      document.body.removeChild(tmp);
    };

    ctrl.loadIcons = function () {
      var tmp = document.createElement('i');
      var char = '';
      var promises = [];
      var questionCode = ctrl.findIconUnicode('fa fa-question');
      var q = $q.defer();
      var code = '';
      document.body.appendChild(tmp);
      ctrl.cachedIcons.unknown = {};
      tmp.className = 'hidden fa fa-question';
      char = window.getComputedStyle(tmp, ':before').content.replace(/'|"/g, '');
      if (ctrl.IE11 && questionCode) {
        ctrl.cachedIcons.unknown.char = String.fromCharCode(questionCode.toUpperCase().replace('\\', '0x').replace(/'|"/g, ''));
      } else {
        ctrl.cachedIcons.unknown.char = char;
      }
      ctrl.cachedIcons.unknown.font = window.getComputedStyle(tmp, ':before').fontFamily;
      ctrl.nodes.forEach(function (node) {
        if (node.fileicon && !ctrl.cachedIcons[node.fileicon]) {
          ctrl.cachedIcons[node.fileicon] = {};
          promises.push(q.promise);
          ctrl.cachedIcons[node.fileicon].img = new Image();
          ctrl.cachedIcons[node.fileicon].img.src = node.fileicon;
          ctrl.cachedIcons[node.fileicon].img.onload = function () {
            return q.resolve();
          };
        } else if (node.fonticon && !ctrl.cachedIcons[node.fonticon]) {
          ctrl.cachedIcons[node.fonticon] = {};
          tmp.className = 'hidden ' + node.fonticon;
          char = window.getComputedStyle(tmp, ':before').content;
          ctrl.cachedIcons[node.fonticon].char = char.replace(/'|"/g, '');
          if (ctrl.IE11) {
            code = ctrl.findIconUnicode(node.fonticon).toUpperCase().replace('\\', '0x');
            ctrl.cachedIcons[node.fonticon].char = String.fromCharCode(code.replace(/'|"/g, ''));
          }
          ctrl.cachedIcons[node.fonticon].font = window.getComputedStyle(tmp, ':before').fontFamily;
        }
      });
      document.body.removeChild(tmp);
    };

    this.collide = function (node) {
      var r = node.size + 22,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function (quad, x1, y1, x2, y2) {
        var x, l, y, r;
        if (quad.point && (quad.point !== node)) {
          x = node.x - quad.point.x;
          y = node.y - quad.point.y;
          l = Math.sqrt(x * x + y * y);
          r = 30 * node.size + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * 2.5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    };

    ctrl.findRules = function () {
      var href;
      var index;
      var styleSheet = _.find(document.styleSheets, function(sheet) {
        if (sheet && sheet.href) {
          href = sheet.href;
          index = sheet.href.lastIndexOf('/');
          return href.substring(index) === '/patternfly.css';
        }
      });
      return styleSheet ? styleSheet.rules : undefined;
    };

    ctrl.findIconUnicode = function(fonticon) {
      var rule;
      var className = fonticon.substring(fonticon.indexOf(' ') + 1);
      if (ctrl.rules) {
        rule = _.find(ctrl.rules, function(rule) {
          if (rule && rule.selectorText) {
            return rule.selectorText.indexOf(className + '::before') !== -1;
          }
        });
      }
      return rule ? rule.style.content : undefined;
    };
  },
});
