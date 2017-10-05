(function () {
  'use strict';

  angular.module('patternfly.canvas')
    .filter('trustAsResourceUrl', ['$sce', function ($sce) {
      return function (val) {
        return $sce.trustAsResourceUrl(val);
      };
    }])

    //
    // Component that generates the rendered chart from the data model.
    //
    .component('pfCanvas', {
      templateUrl: 'canvas-view/canvas/canvas.html',
      bindings: {
        chartDataModel:'=',
        chartViewModel: '=?',
        readOnly: '<?',
        hideConnectors: '=?'
      },
      controller: function CanvasController ($scope, dragging, $element, $document) {
        var ctrl = this;

        ctrl.chart = new pfCanvas.ChartViewModel(ctrl.chartDataModel);
        ctrl.chartViewModel = ctrl.chart;

        //
        // Init data-model variables.
        //
        ctrl.draggingConnection = false;
        ctrl.connectorSize = 6;
        ctrl.dragSelecting = false;

        //
        // Reference to the connection, connector or node that the mouse is currently over.
        //
        ctrl.mouseOverConnector = null;
        ctrl.mouseOverConnection = null;
        ctrl.mouseOverNode = null;


        //
        // Translate the coordinates so they are relative to the svg element.
        //
        this.translateCoordinates = function (x, y, evt) {
          var svgElem =  $element.get(0).children[0];
          var matrix = svgElem.getScreenCTM();
          var point = svgElem.createSVGPoint();
          point.x = (x - evt.view.pageXOffset) / ctrl.zoomLevel();
          point.y = (y - evt.view.pageYOffset) / ctrl.zoomLevel();

          return point.matrixTransform(matrix.inverse());
        };

        ctrl.hideConnectors = ctrl.hideConnectors || false;

        ctrl.isConnectorConnected = function (connector) {
          return (connector && connector.connected());
        };

        ctrl.isConnectorUnconnectedAndValid = function (connector) {
          return (connector && !connector.connected() && !connector.invalid() &&
          connector.parentNode() !== ctrl.connectingModeSourceNode);
        };

        // determines if a dest. connector is connected to the source node
        ctrl.isConnectedTo = function (connector, node) {
          var i,connection;
          var connections = ctrl.chart.connections;
          for (i = 0; i < connections.length; i++) {
            connection = connections[i];
            if (connection.dest === connector && connection.source.parentNode() === node) {
              return true;
            }
          }

          return false;
        };

        ctrl.availableConnections = function () {
          return ctrl.chart.validConnections;
        };

        ctrl.foreignObjectSupported = function () {
          return $document[0].implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Extensibility', '1.1');
        };

        ctrl.addNodeToCanvas = function (newNode) {
          ctrl.chart.addNode(newNode);
        };

        $scope.$on('selectAll', function () {
          ctrl.selectAll();
        });

        ctrl.selectAll = function () {
          ctrl.chart.selectAll();
        };

        $scope.$on('deselectAll', function () {
          ctrl.deselectAll();
        });

        ctrl.deselectAll = function () {
          ctrl.chart.deselectAll();
        };

        $scope.$on('deleteSelected', function () {
          ctrl.deleteSelected();
        });

        ctrl.deleteSelected = function () {
          ctrl.chart.deleteSelected();
        };

        //
        // Called on mouse down in the chart.
        //
        ctrl.mouseDown = function (evt) {
          if (ctrl.readOnly) {
            return;
          }

          if (ctrl.chart.inConnectingMode ) {
            // canceling out of connection mode, remove unused output connector
            ctrl.cancelConnectingMode();
          }

          ctrl.chart.deselectAll();

          ctrl.chart.clickedOnChart = true;

          dragging.startDrag(evt, {

            //
            // Commence dragging... setup variables to display the drag selection rect.
            //
            dragStarted: function (x, y) {
              var startPoint;
              ctrl.dragSelecting = true;
              startPoint = ctrl.translateCoordinates(x, y, evt);
              ctrl.dragSelectionStartPoint = startPoint;
              ctrl.dragSelectionRect = {
                x: startPoint.x,
                y: startPoint.y,
                width: 0,
                height: 0
              };
            },

            //
            // Update the drag selection rect while dragging continues.
            //
            dragging: function (x, y) {
              var startPoint = ctrl.dragSelectionStartPoint;
              var curPoint = ctrl.translateCoordinates(x, y, evt);

              ctrl.dragSelectionRect = {
                x: curPoint.x > startPoint.x ? startPoint.x : curPoint.x,
                y: curPoint.y > startPoint.y ? startPoint.y : curPoint.y,
                width: curPoint.x > startPoint.x ? curPoint.x - startPoint.x : startPoint.x - curPoint.x,
                height: curPoint.y > startPoint.y ? curPoint.y - startPoint.y : startPoint.y - curPoint.y,
              };
            },

            //
            // Dragging has ended... select all that are within the drag selection rect.
            //
            dragEnded: function () {
              ctrl.dragSelecting = false;
              ctrl.chart.applySelectionRect(ctrl.dragSelectionRect);
              delete ctrl.dragSelectionStartPoint;
              delete ctrl.dragSelectionRect;
            }
          });
        };

        //
        // Handle nodeMouseOver on an node.
        //
        ctrl.nodeMouseOver = function (evt, node) {
          if (!ctrl.readOnly) {
            ctrl.mouseOverNode = node;
          }
        };

        //
        // Handle nodeMouseLeave on an node.
        //
        ctrl.nodeMouseLeave = function () {
          ctrl.mouseOverNode = null;
        };

        //
        // Handle mousedown on a node.
        //
        ctrl.nodeMouseDown = function (evt, node) {
          var chart = ctrl.chart;
          var lastMouseCoords;

          if (ctrl.readOnly) {
            return;
          }

          dragging.startDrag(evt, {

            //
            // Node dragging has commenced.
            //
            dragStarted: function (x, y) {
              lastMouseCoords = ctrl.translateCoordinates(x, y, evt);

              //
              // If nothing is selected when dragging starts,
              // at least select the node we are dragging.
              //
              if (!node.selected()) {
                chart.deselectAll();
                node.select();
              }
            },

            //
            // Dragging selected nodes... update their x,y coordinates.
            //
            dragging: function (x, y) {
              var curCoords = ctrl.translateCoordinates(x, y, evt);
              var deltaX = curCoords.x - lastMouseCoords.x;
              var deltaY = curCoords.y - lastMouseCoords.y;

              chart.updateSelectedNodesLocation(deltaX, deltaY);

              lastMouseCoords = curCoords;
            },

            //
            // The node wasn't dragged... it was clicked.
            //
            clicked: function () {
              chart.handleNodeClicked(node, evt.ctrlKey);
            }

          });
        };

        //
        // Listen for node action
        //
        ctrl.nodeClickHandler = function (action, node) {
          if (action === 'nodeActionConnect') {
            ctrl.startConnectingMode(node);
          }
        };

        ctrl.nodeCloseHandler = function () {
          ctrl.mouseOverNode = null;
        };

        ctrl.connectingModeOutputConnector = null;
        ctrl.connectingModeSourceNode = null;

        ctrl.startConnectingMode = function (node) {
          ctrl.chart.inConnectingMode = true;
          ctrl.hideConnectors = false;
          ctrl.connectingModeSourceNode = node;
          ctrl.connectingModeSourceNode.select();
          ctrl.connectingModeOutputConnector = node.getOutputConnector();
          ctrl.chart.updateValidNodesAndConnectors(ctrl.connectingModeSourceNode);
        };

        ctrl.cancelConnectingMode = function () {
          // if output connector not connected to something, remove it
          if (!ctrl.connectingModeOutputConnector.connected()) {
            ctrl.chart.removeOutputConnector(ctrl.connectingModeOutputConnector);
          }
          ctrl.stopConnectingMode();
        };

        ctrl.stopConnectingMode = function () {
          ctrl.chart.inConnectingMode = false;
          ctrl.chart.resetValidNodesAndConnectors();
        };

        //
        // Handle connectionMouseOver on an connection.
        //
        ctrl.connectionMouseOver = function (evt, connection) {
          if (!ctrl.draggingConnection && !ctrl.readOnly) {  // Only allow 'connection mouse over' when not dragging out a connection.
            ctrl.mouseOverConnection = connection;
          }
        };

        //
        // Handle connectionMouseLeave on an connection.
        //
        ctrl.connectionMouseLeave = function () {
          ctrl.mouseOverConnection = null;
        };

        //
        // Handle mousedown on a connection.
        //
        ctrl.connectionMouseDown = function (evt, connection) {
          var chart = ctrl.chart;
          if (!ctrl.readOnly) {
            chart.handleConnectionMouseDown(connection, evt.ctrlKey);
          }
          // Don't let the chart handle the mouse down.
          evt.stopPropagation();
          evt.preventDefault();
        };

        //
        // Handle connectorMouseOver on an connector.
        //
        ctrl.connectorMouseOver = function (evt, node, connector) {
          if (!ctrl.readOnly) {
            ctrl.mouseOverConnector = connector;
          }
        };

        //
        // Handle connectorMouseLeave on an connector.
        //
        ctrl.connectorMouseLeave = function () {
          ctrl.mouseOverConnector = null;
        };

        //
        // Handle mousedown on an input connector.
        //
        ctrl.connectorMouseDown = function (evt, node) {
          if (ctrl.chart.inConnectingMode && node !== ctrl.connectingModeSourceNode) {
            ctrl.chart.createNewConnection(ctrl.connectingModeOutputConnector, ctrl.mouseOverConnector);
            ctrl.stopConnectingMode();
          }
        };

        //
        // zoom.
        //
        $scope.$on('zoomIn', function () {
          ctrl.chart.zoom.in();
        });

        $scope.$on('zoomOut', function () {
          ctrl.chart.zoom.out();
        });

        $scope.maxZoom = function () {
          return (ctrl.chart.chartViewModel && ctrl.chart.chartViewModel.zoom) ? ctrl.chart.chartViewModel.zoom.isMax() : false;
        };
        $scope.minZoom = function () {
          return (ctrl.chart.chartViewModel && ctrl.chart.chartViewModel.zoom) ? ctrl.chart.chartViewModel.zoom.isMin() : false;
        };

        ctrl.zoomLevel = function () {
          return ctrl.chart.zoom.getLevel();
        };

        ctrl.$onInit = function () {
          var backspaceKeyCode = 8;
          var deleteKeyCode = 46;
          var aKeyCode = 65;
          var escKeyCode = 27;

          $document.find('body').keydown(function (evt) {

            if (evt.keyCode === aKeyCode && evt.ctrlKey === true) {
              //
              // Ctrl + A
              //
              ctrl.selectAll();
              $scope.$digest();
              evt.stopPropagation();
              evt.preventDefault();
            }

            if (evt.keyCode === deleteKeyCode || evt.keyCode === backspaceKeyCode) {
              ctrl.deleteSelected();
              $scope.$digest();
            }

            if (evt.keyCode === escKeyCode) {
              ctrl.deselectAll();
              $scope.$digest();
            }
          });
        };
      }
    });
})();
