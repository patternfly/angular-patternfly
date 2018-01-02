/**
 * @ngdoc directive
 * @name patternfly.canvas.component:pfCanvas
 * @restrict E
 *
 * @description
 * Component for core operations and rendering of a canvas. Does not work in IE 11 or lower because they do not support
 * latest svg specification's 'foreignObject' api.  Tested in FireFox, Chrome, and MS-Edge.
 * @param {object} chartDataModel Chart data object which defines the nodes and connections on the canvas
 * <ul style='list-style-type: none'>
 *   <li>.nodes  - An array of node objects.  For each node's main icon/image you can define either an <em>image url</em>, an <em>icon class</em>, or
 *   <em>fontContent</em> unicode characters.  For more information please see the details below:
 *   <ul style='list-style-type: none'>
 *     <li>.name     - (string) The name of the node
 *     <li>.x        - (number) The canvas x-coordinate to place the node
 *     <li>.y        - (number) The canvas y-coordinate to place the node
 *     <li>.id       - (number) The node id.  Used to define connections between nodes.
 *     <li>.width    - (number) The width of the node rectangle
 *     <li>.image    - (string) (Optional) The url of the main node image.  Ex: "/img/kubernetes.svg"
 *     <li>.icon     - (string) (Optional) The icon class of the node icon.  Ex: "pf pficon-service" Note: Does not work in IE browsers
 *     <li>.fontSize - (string) (Optional) The size of the main node icon. Used with <em>icon</em>
 *     <li>.fontFamily  - (string) (Optional) The font family of the node icon. Ex: "fontawesome"
 *     <li>.fontContent - (string) (Optional) The unicode characters of the node icon. Used with <em>fontFamily</em>. Ex: "\uf0c2"
 *     <li>.backgroundColor - (string) The background color of the node rectangle
 *     <li>.inputConnectors - An array of input connectors.  Connectors appear on the left side of a node's rectangle when in 'connection mode' and are endpoints of connections between nodes.
 *     <ul style='list-style-type: none'>
 *       <li>.name        - (string) The name of the connector
 *       <li>.type        - (string) A user defined 'type' of input connector.  Nodes can only connect to certain 'types' of connectors.  Used with <em>validConnectionTypes</em>. Ex: "network".
 *       <li>.fontFamily  - (string) (Optional) The font family of the connector icon. Ex: "PatternFlyIcons-webfont"
 *       <li>.fontContent - (string) (Optional) The unicode characters of the connector icon. Used with <em>fontFamily</em>. Ex: "\ue621"
 *     </ul>
 *     <li>.validConnectionTypes - An array of valid connector types which the node can connect to. Used with <em>node.type's</em>. Ex: "["network","container"]
 *   </ul>
 *   <li>.nodeActions  - An array of actions which appear in a toolbar under a node.
 *     <ul style='list-style-type: none'>
 *       <li>.id        - (number) The id of the node action
 *       <li>.name      - (string) The name of the node action
 *       <li>.iconClass - (string) The icon class of the action.  Ex: "pf pficon-edit"
 *       <li>.action    - (string) The action identifier, which is passed along with the action event.
 *     </ul>
 *   <li>.actionIconClicked - function that listens for node actions/events when clicking the items within the node toolbar.
 *     <ul style='list-style-type: none'>
 *       <li>nodeClickHandler - (function) A function that starts the connection mode when clicking the items within the node toolbar. Passes the following arguments: string (action) and object (node) as parameters.
 *       <li>$scope.$emit - (function) A function that listens to the action click event via $scope.$on to log the eventText when clicking the items within the node toolbar. Passes the following arguments: string ('nodeActionClicked') and object ({action, node}) as parameters.
 *       Also is used to listen for when the mouse is currently over a node (or not) when an action is selected - in which it then passes the following argument: string ('nodeActionClosed') as parameters.
 *     </ul>
 *   <li>.connections  - An array of connections between nodes
 *     <ul style='list-style-type: none'>
 *       <li>.source - (object) The source of a connection
 *         <ul style='list-style-type: none'>
 *           <li>.nodeID         - (number) The id of the source node
 *           <li>.connectorIndex - (number) The index of the output connector on the source node.  Since all nodes have a single output connector, this value is always 0
 *         </ul>
 *       <li>.dest - (object) The destination/target of a connection
 *         <ul style='list-style-type: none'>
 *           <li>.nodeID         - (number) The id of the destination node
 *           <li>.connectorIndex - (number) The index of the input connector on the dest/target node to connect.  Zero equals the top input connector, increment for subsequent input connectors.
 *         </ul>
 *     </ul>
 * </ul>
 * @param {object} chartViewModel (Optional) The chartViewModel is initialized from the chartDataModel and contains additional helper methods such as <code>chartViewModel.isOnlyOneNodeSelected()</code> and
 * <code>chartViewModel.getSelectedNodes()</code>.  You only need to specify a chartViewModel object if you plan on using advanced canvas operations.
 * @param {boolean} readOnly A flag indicating whether the canvas is in 'read-only' mode.  When in 'read-only' mode nodes cannot be moved, selected, or deleted, and the node action toolbar is hidden.
 * @param {boolean} hideConnectors A flag indicating whether connections should be hidden or shown on the canvas
 * @example
 <example module="patternfly.canvas.demo">
 <file name="index.html">
   <style>
     .canvas {
         background-image: url('/img/canvas-dot-grid.png');
         background-repeat: repeat;
     }
   </style>
   <div ng-controller="CanvasDemoCtrl" class="example-container">
     <div class="canvas-demo-container">
       <pf-canvas chart-data-model="chartDataModel"
                  chart-view-model="chartViewModel"
                  read-only="readOnly"
                  hide-connectors="hideConnectors">
       </pf-canvas>
     </div>
     <hr>
     <div class="form-group">
       <label class="checkbox-inline">
         <input type="checkbox" ng-model="readOnly">Read Only</input>
       </label>

       <label class="checkbox-inline">
         <input type="checkbox" ng-model="hideConnectors">Hide Connections</input>
       </label>

       <button ng-click="addNode()" style="margin-left: 10px;">Add Node</button>

       <button ng-click="selectAll()" style="margin-left: 10px;">Select All (Ctrl+A)</button>
       <button ng-click="deselectAll()">Deselect All (esc key)</button>
       <button ng-click="deleteSelected()">Delete Selected (delete key)</button>

       <button ng-click="zoomIn()" style="margin-left: 10px;">Zoom In</button>
       <button ng-click="zoomOut()">Zoom Out</button>
     </div>
     <div style="padding-top: 12px;">
       <label style="font-weight:normal;vertical-align:middle;">Events: </label>
     </div>
     <div>
       <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
     </div>
   </div>
 </file>

 <file name="modules.js">
   angular.module('patternfly.canvas.demo', ['patternfly.canvas']);
 </file>

 <file name="script.js">
 angular.module( 'patternfly.canvas.demo' ).controller( 'CanvasDemoCtrl', function( $scope, $window ) {
     var imagePath = $window.IMAGE_PATH || "img";
     $scope.chartDataModel = {
          "nodes": [
            {
              "name": "Nuage",
              "x": 345,
              "y": 67,
              "id": 1,
              "image": imagePath + "/OpenShift-logo.svg",
              "width": 150,
              "bundle": true,
              "backgroundColor": "#fff",
              "inputConnectors": [
                {
                  "name": "Network",
                  "type": "network",
                  "fontFamily": "PatternFlyIcons-webfont",
                  "fontContent": "\ue909"
                },
                {
                  "name": "Container",
                  "type": "container",
                  "fontFamily": "PatternFlyIcons-webfont",
                  "fontContent": "\ue621"
                }
              ],
              "validConnectionTypes": ["network", "container"]
            },
            {
              "name": "Vmware",
              "x": 100,
              "y": 290,
              "id": 2,
              "image": imagePath + "/kubernetes.svg",
              "width": 150,
              "backgroundColor": "#fff",
              "validConnectionTypes": ["storage"],
              "inputConnectors": [
                {
                    "name": "Network",
                    "type": "network",
                    "fontFamily": "PatternFlyIcons-webfont",
                    "fontContent": "\ue909"
                  },
                  {
                    "name": "Storage",
                    "type": "storage",
                    "fontFamily": "PatternFlyIcons-webfont",
                    "fontContent": "\ue90e"
                  },
                  {
                    "name": "Container",
                    "type": "container",
                    "fontFamily": "PatternFlyIcons-webfont",
                    "fontContent": "\ue621"
                  }
                ]
            },
            {
              "name": "NetApp",
              "x": 350,
              "y": 291,
              "id": 3,
              "width": 150,
              "icon": "pf pficon-service",
              "fontSize": "76px",
              "backgroundColor": "#fff",
              "inputConnectors": [
                {
                    "name": "Network",
                    "type": "network",
                    "fontFamily": "PatternFlyIcons-webfont",
                    "fontContent": "\ue909"
                  },
                  {
                    "name": "Container",
                    "type": "container",
                    "fontFamily": "PatternFlyIcons-webfont",
                    "fontContent": "\ue621"
                  }
                ],
              "validConnectionTypes": ["network"]
            },
            {
              "name": "OpenShift",
              "x": 105,
              "y": 67,
              "id": 4,
              "width": 150,
              "fontFamily": "fontawesome",
              "fontContent": "\uf0c2",
              "backgroundColor": "#fff",
              "inputConnectors": [
                {
                  "name": "Storage",
                  "type": "storage",
                  "fontFamily": "PatternFlyIcons-webfont",
                  "fontContent": "\ue90e"
                },
                {
                  "name": "Container",
                  "type": "container",
                  "fontFamily": "PatternFlyIcons-webfont",
                  "fontContent": "\ue621"
                }
              ],
              "validConnectionTypes": ["network", "container", "storage"]
            }
          ],
          "nodeActions" : [
            {
              "id": 1,
              "name": "connect",
              "iconClass": "fa fa-share-alt",
              "action": "nodeActionConnect"
            },
            {
              "id": 2,
              "name": "edit",
              "iconClass": "pf pficon-edit",
              "action": "nodeActionEdit"
            },
            {
              "id": 3,
              "name": "tag",
              "iconClass": "fa fa-tag",
              "action": "nodeActionTag"
            }
          ],
          "connections": [
            {
              "source": {
                "nodeID": 4,
                "connectorIndex": 0
              },
              "dest": {
                "nodeID": 1,
                "connectorIndex": 1
              }
            },
            {
              "source": {
                "nodeID": 4,
                "connectorIndex": 0
              },
              "dest": {
                "nodeID": 3,
                "connectorIndex": 0
              }
            }
          ]
     };

     $scope.newNode = {
      "name": "NetApp",
      "id": 1000,
      "width": 150,
      "icon": "pf pficon-service",
      "fontSize": "76px",
      "backgroundColor": "#fff",
      "inputConnectors": [
        {
            "name": "Network",
            "type": "network",
            "fontFamily": "PatternFlyIcons-webfont",
            "fontContent": "\ue909"
          },
          {
            "name": "Container",
            "type": "container",
            "fontFamily": "PatternFlyIcons-webfont",
            "fontContent": "\ue621"
          }
        ],
      "validConnectionTypes": ["network"]
     };

     $scope.readOnly = false;
     $scope.hideConnectors = false;
     $scope.eventText = "";

     var numNewNodes = 1;

     $scope.addNode = function() {
       var newNode = angular.copy($scope.newNode);
       newNode.id ++;
       newNode.name = newNode.name + " " + numNewNodes++;
       newNode.x = 250 + (numNewNodes * 4 + 160);
       newNode.y = 200 + (numNewNodes * 4 + 160);

       $scope.chartViewModel.addNode(newNode);
     };

     $scope.$on('nodeActionClicked', function(evt, args) {
       var action = args.action;
       var node = args.node;
       $scope.eventText = node.name() + ' ' + action + '\r\n' + $scope.eventText;
     });

     $scope.zoomIn = function() {
       $scope.$broadcast('zoomIn');
     };
     $scope.zoomOut = function() {
       $scope.$broadcast('zoomOut');
     };

     $scope.selectAll = function() {
       $scope.$broadcast('selectAll');
     };
     $scope.deselectAll = function() {
       $scope.$broadcast('deselectAll');
     };
     $scope.deleteSelected = function() {
       $scope.$broadcast('deleteSelected');
     };
 });
 </file>
 </example>
 */
