/**
 * @ngdoc directive
 * @name patternfly.charts.component:pfTopologyMap
 * @restrict E
 *
 * @param {array} nodes array containing objects representing graph nodes. Each node has these attributes. Only node id is mandatory parameter.
 * <ul style='list-style-type: none'>
 *   <li>id: unique node identifier</li>
 *   <li>title: node title</li>
 *   <li>size: node radius; default value is 17</li>
 *   <li>fileicon: this attribute specifies path to image file. eg: <b>'/some/path/to/image/image.png'</b>. File icon has higher priority than fonticon.</li>
 *   <li>fonticon: css class of node icon eg: <b>'fa fa-info'</b> File icon has higher priority than fonticon.</li>
 *   <li>fill: string containing color code (basic, RGB, HEX) of node background.</li>
 *   <li>borderColor: string containing color code (basic, RGB, HEX) of node border.</li>
 *   <li>iconColor: string containing color code (basic, RGB, HEX) of node icon, if iconType is <b>fonticon</b>.</li>
 *   <li>opacity: number from 〈0,1〉range, representing node opacity</li>
 *   <li>utilization: number from〈0,100〉range, representing node utilization percentage</li>
 * </ul>
 * @param {array} edges array of objects. Each object represents one edge between two nodes. Source and target are mandatory attributes.
 * <ul style='list-style-type: none'>
 *  <li>source: id of source node</li>
 *  <li>target: id of target node</li>
 *  <li>lineStyle: stroke style of edge; currently only <b>'dashed'</b> is avaliable</li>
 *  <li>title: label of edge</li>
 * </ul>
 *
 * @param {boolean=} show-node-labels show/hide all node tooltips
 *
 * @param {boolean=} show-edge-labels show/hode all edge tooltips
 *
 * @param {object=} tooltip-style object used for tooltip styling. This is an optional parameter.
 * <ul style='list-style-type: none'>
 *  <li>size: text size in px</li>
 *  <li>font: font name. eg: <b>'Arial'</b></li>
 *  <li>textColor: string containing color code (basic, RGB, HEX) of title text.</li>
 *  <li>background: string containing color code (basic, RGB, HEX) of title background</li>
 * </ul>
 * @param {function (node) =} select-node function that return selected(clicked) node from graph
 * @param {function (array) =} multi-select-nodes function that returns array of selected nodes. Multiple nodes are selected while holding the <b>ctrl/shift</b> key and clicking
 * @param {function (edge) =} select-edge function that return selected(clicked) edge from graph
 * @param {function (array) =} multi-select-edges function that returns array of selected edges. Multiple edges are selected while holding the <b>ctrl/shift</b> key and clicking
 *
 * @description
 *   Component for rendering topology chart on Canvas element. This is just a simple component. It has no searching/filtering or other methods. Will only render given data and return data about selected objects.<br/>
 *   Component also supports semantic zooming. Only distance between nodes is growing/shrinking, but node size remains the same. Canvas will zoom around the mouse cursor.
 * @example
   <example module="patternfly.charts">
    <file name="index.html">
      <div ng-controller="TopologyMapCtrl" class="container-topology">
        <pf-topology-map
          show-node-labels="showNodeLabels"
          show-edge-labels="showEdgeLabels"
          nodes="nodes"
          edges="edges"
          select-node="selectNode(node)"
          tooltip-style="tooltipStyle"
          multi-select-nodes="multiSelect(array)"
          select-edge="selectEdge(edge)"
          multi-select-edges="multiSelectEdges(array)"
        >
        </pf-topology-map>
        <h2>Selected node:</h2>
        <pre>{{selectedNode}}</pre>
        <h2>Selected nodes:</h2>
        <pre>{{selectedNodes}}</pre>
        <h2>Selected edge:</h2>
        <pre>{{selectedEdge}}</pre>
        <h2>Selected edges:</h2>
        <pre>{{selectedEdges}}</pre>
        <button ng-click="changeData()">Change data</button><br/>
        <label>Show node labels</label><input type="checkbox" ng-model="showNodeLabels"/><br/>
        <label>Show edge labels</label><input type="checkbox" ng-model="showEdgeLabels"/><br/>
      </div>
    </file>
    <file name="script.js">
      angular.module( 'patternfly.charts' ).controller( 'TopologyMapCtrl', function( $scope, $rootScope ) {
        $scope.tooltipStyle = {
          size: 12,
          font: 'Arial',
          textColor: 'white',
          background: 'rgba(0, 0, 0, .5)',
        }
        $scope.showEdgeLabels = false;
        $scope.showNodeLabels = false;
        $scope.selectedNode = {};
        $scope.selectedNodes = [];
        $scope.selectedEdge = {};
        $scope.selectedEdges = [];
        $scope.selectEdge = function(edge){
          $scope.selectedEdge = edge;
          $scope.$apply();
        }
        $scope.multiSelectEdges = function(array) {
          $scope.selectedEdges = array;
          $scope.$apply();
        }
        $scope.selectNode = function(node){
          $scope.selectedNode = node;
          $scope.$apply()
        };
        $scope.multiSelect = function(array){
          $scope.selectedNodes = array;
          $scope.$apply();
        }
        $scope.changeData = function(){
          $scope.nodes = [
            {
              id: '1',
              title: 'testNode',
              utilization: 50,
              opacity: 0.5,
              size: 32,
              fonticon: "fa fa-cog",
              iconType: "fonticon",
            },
            {
              id: '2',
              title: 'testNode2',
              fill: '#FF0000',
              utilization: 75,
              fonticon: "fa fa-info",
              iconType: "fonticon",
              borderColor: '#AD1457'
            },{
              id: 'blabla',
              title: 'testNode3',
              fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
              iconType: "fileicon",
              size: 64,
              utilization: 25,
            }
          ];
          $scope.edges = [
            {source: '1', target: 'blabla', title: 'edge title'},
            {source: 'blabla', target: '2'},
            {source: '1', target: '2', title: '1596'}
          ];
        }
        $scope.nodes = [
          {
            "id": 0,
            "title": "Levy",
            "size": 25,
            fonticon: "fa fa-cog",
          },
          {
            "id": 1,
            "title": "Celina",
            "size": 24,
            fonticon: "fa fa-cog",
          },
          {
            "id": 2,
            "title": "Nancy",
            "size": 15,
            fonticon: "fa fa-cog",
          },
          {
            "id": 3,
            "title": "Yang",
            "size": 25
          },
          {
            "id": 4,
            "title": "Gray",
            "size": 28,
            fonticon: "fa fa-cog",
          },
          {
            "id": 5,
            "title": "Maddox",
            "size": 16,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 6,
            "title": "Wallace",
            "size": 27,
            utilization: 50,
            fonticon: "fa fa-cog",
          },
          {
            "id": 7,
            "title": "Bettie",
            "size": 19,
            fonticon: "fa fa-cog",
          },
          {
            "id": 8,
            "title": "Watkins",
            "size": 20,
            fonticon: "fa fa-cog",
          },
          {
            "id": 9,
            "title": "Stanton",
            "size": 12,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 10,
            "title": "Lindsay",
            "size": 18
          },
          {
            "id": 11,
            "title": "Harrell",
            "size": 27
          },
          {
            "id": 12,
            "title": "Stephanie",
            "size": 30,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 13,
            "title": "Mona",
            "size": 18,
            fonticon: "fa fa-cog",
          },
          {
            "id": 14,
            "title": "Natalia",
            "size": 21,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 15,
            "title": "Rose",
            "size": 26,
            fonticon: "fa fa-cog",
          },
          {
            "id": 16,
            "title": "Robles",
            "size": 12,
            fonticon: "fa fa-cog",
          },
          {
            "id": 17,
            "title": "Parker",
            "size": 20,
            fonticon: "fa fa-cog",
          },
          {
            "id": 18,
            "title": "Decker",
            "size": 21,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 19,
            "title": "Helen",
            "size": 18
          },
          {
            "id": 20,
            "title": "Coleman",
            "size": 30,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 21,
            "title": "Wolf",
            "size": 25,
            fonticon: "fa fa-cog",
          },
          {
            "id": 22,
            "title": "Morton",
            "size": 28,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 23,
            "title": "Fitzpatrick",
            "size": 16,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 24,
            "title": "Hayden",
            "size": 21
          },
          {
            "id": 25,
            "title": "Kaufman",
            "size": 30,
            fileicon: "http://www.patternfly.org/angular-patternfly/img/patternfly-orb.svg",
          },
          {
            "id": 26,
            "title": "Julia",
            "size": 15
          },
          {
            "id": 27,
            "title": "Louella",
            "size": 16
          },
          {
            "id": 28,
            "title": "Rocha",
            "size": 21
          },
          {
            "id": 29,
            "title": "Kimberly",
            "size": 31
          },
          {
            "id": 30,
            "title": "Benita",
            "size": 20
          },
          {
            "id": 31,
            "title": "Harrington",
            "size": 27
          },
          {
            "id": 32,
            "title": "Hobbs",
            "size": 17
          },
          {
            "id": 33,
            "title": "Fuentes",
            "size": 26
          },
          {
            "id": 34,
            "title": "Alyce",
            "size": 22
          },
          {
            "id": 35,
            "title": "Frank",
            "size": 27
          },
          {
            "id": 36,
            "title": "Lawrence",
            "size": 21
          },
          {
            "id": 37,
            "title": "Harper",
            "size": 19
          },
          {
            "id": 38,
            "title": "Woods",
            "size": 29
          },
          {
            "id": 39,
            "title": "Hopper",
            "size": 25
          },
          {
            "id": 40,
            "title": "Lesley",
            "size": 28
          },
          {
            "id": 41,
            "title": "Arlene",
            "size": 30
          },
          {
            "id": 42,
            "title": "Mcdowell",
            "size": 13
          },
          {
            "id": 43,
            "title": "Kristy",
            "size": 12
          },
          {
            "id": 44,
            "title": "Janette",
            "size": 21
          },
          {
            "id": 45,
            "title": "Charles",
            "size": 20
          },
          {
            "id": 46,
            "title": "Houston",
            "size": 30
          },
          {
            "id": 47,
            "title": "Renee",
            "size": 32
          },
          {
            "id": 48,
            "title": "Leah",
            "size": 16
          },
          {
            "id": 49,
            "title": "Marguerite",
            "size": 31
          },
          {
            "id": 50,
            "title": "Moreno",
            "size": 18
          },
          {
            "id": 51,
            "title": "Washington",
            "size": 21
          },
          {
            "id": 52,
            "title": "Davis",
            "size": 14
          },
          {
            "id": 53,
            "title": "Potts",
            "size": 29
          },
          {
            "id": 54,
            "title": "Holly",
            "size": 22
          },
          {
            "id": 55,
            "title": "Phillips",
            "size": 18
          },
          {
            "id": 56,
            "title": "Santiago",
            "size": 32
          },
          {
            "id": 57,
            "title": "Suarez",
            "size": 24
          },
          {
            "id": 58,
            "title": "Lynnette",
            "size": 12
          },
          {
            "id": 59,
            "title": "Gates",
            "size": 18
          },
          {
            "id": 60,
            "title": "Aurelia",
            "size": 14
          },
          {
            "id": 61,
            "title": "Horn",
            "size": 30
          },
          {
            "id": 62,
            "title": "Annabelle",
            "size": 19
          },
          {
            "id": 63,
            "title": "Snyder",
            "size": 19
          },
          {
            "id": 64,
            "title": "Tanner",
            "size": 24
          },
          {
            "id": 65,
            "title": "Walker",
            "size": 26
          },
          {
            "id": 66,
            "title": "Ruthie",
            "size": 26
          },
          {
            "id": 67,
            "title": "Beverly",
            "size": 20
          },
          {
            "id": 68,
            "title": "Ines",
            "size": 16
          },
          {
            "id": 69,
            "title": "Dudley",
            "size": 17
          },
          {
            "id": 70,
            "title": "Hays",
            "size": 19
          },
          {
            "id": 71,
            "title": "Russell",
            "size": 32
          },
          {
            "id": 72,
            "title": "Lolita",
            "size": 30
          },
          {
            "id": 73,
            "title": "Kasey",
            "size": 25
          },
          {
            "id": 74,
            "title": "Abby",
            "size": 26
          },
          {
            "id": 75,
            "title": "Mason",
            "size": 16
          },
          {
            "id": 76,
            "title": "Wilcox",
            "size": 12
          },
          {
            "id": 77,
            "title": "Talley",
            "size": 27
          },
          {
            "id": 78,
            "title": "Hull",
            "size": 31
          },
          {
            "id": 79,
            "title": "Harrison",
            "size": 15
          },
          {
            "id": 80,
            "title": "Cooke",
            "size": 23
          },
          {
            "id": 81,
            "title": "Sparks",
            "size": 15
          },
          {
            "id": 82,
            "title": "Calhoun",
            "size": 23
          },
          {
            "id": 83,
            "title": "Deborah",
            "size": 18
          },
          {
            "id": 84,
            "title": "Glass",
            "size": 26
          },
          {
            "id": 85,
            "title": "Butler",
            "size": 30
          },
          {
            "id": 86,
            "title": "Barton",
            "size": 16
          },
          {
            "id": 87,
            "title": "Carpenter",
            "size": 19
          },
          {
            "id": 88,
            "title": "Roberta",
            "size": 16
          },
          {
            "id": 89,
            "title": "Lester",
            "size": 23
          },
          {
            "id": 90,
            "title": "Sonya",
            "size": 30
          },
          {
            "id": 91,
            "title": "Newman",
            "size": 24
          },
          {
            "id": 92,
            "title": "Barron",
            "size": 12
          },
          {
            "id": 93,
            "title": "Jackie",
            "size": 18
          },
          {
            "id": 94,
            "title": "Margarita",
            "size": 20
          },
          {
            "id": 95,
            "title": "Taylor",
            "size": 15
          },
          {
            "id": 96,
            "title": "Rose",
            "size": 21
          },
          {
            "id": 97,
            "title": "Hammond",
            "size": 29
          },
          {
            "id": 98,
            "title": "Berg",
            "size": 27
          },
          {
            "id": 99,
            "title": "Dennis",
            "size": 22
          }
        ]
        $scope.edges = [
          {
            "source": 5,
            "target": 6,
            "title": "edge title"
          },
          {
            "source": 42,
            "target": 89
          },
          {
            "source": 84,
            "target": 11
          },
          {
            "source": 60,
            "target": 10
          },
          {
            "source": 17,
            "target": 74
          },
          {
            "source": 28,
            "target": 79
          },
          {
            "source": 37,
            "target": 84
          },
          {
            "source": 32,
            "target": 46
          },
          {
            "source": 2,
            "target": 24
          },
          {
            "source": 33,
            "target": 24
          },
          {
            "source": 76,
            "target": 78
          },
          {
            "source": 19,
            "target": 70
          },
          {
            "source": 45,
            "target": 36
          },
          {
            "source": 74,
            "target": 87
          },
          {
            "source": 59,
            "target": 33
          },
          {
            "source": 14,
            "target": 66
          },
          {
            "source": 10,
            "target": 35
          },
          {
            "source": 77,
            "target": 57
          },
          {
            "source": 13,
            "target": 37
          },
          {
            "source": 39,
            "target": 18
          },
          {
            "source": 37,
            "target": 3
          },
          {
            "source": 14,
            "target": 47
          },
          {
            "source": 85,
            "target": 20
          },
          {
            "source": 83,
            "target": 84
          },
          {
            "source": 65,
            "target": 98
          },
          {
            "source": 96,
            "target": 62
          },
          {
            "source": 15,
            "target": 98
          },
          {
            "source": 89,
            "target": 8
          },
          {
            "source": 26,
            "target": 49
          },
          {
            "source": 14,
            "target": 94
          },
          {
            "source": 47,
            "target": 14
          },
          {
            "source": 68,
            "target": 84
          },
          {
            "source": 52,
            "target": 3
          },
          {
            "source": 66,
            "target": 47
          },
          {
            "source": 53,
            "target": 16
          },
          {
            "source": 46,
            "target": 73
          },
          {
            "source": 99,
            "target": 27
          },
          {
            "source": 84,
            "target": 10
          },
          {
            "source": 14,
            "target": 28
          },
          {
            "source": 74,
            "target": 50
          },
          {
            "source": 30,
            "target": 37
          },
          {
            "source": 49,
            "target": 32
          },
          {
            "source": 5,
            "target": 1
          },
          {
            "source": 4,
            "target": 61
          },
          {
            "source": 25,
            "target": 45
          },
          {
            "source": 29,
            "target": 8
          },
          {
            "source": 14,
            "target": 76
          },
          {
            "source": 9,
            "target": 71
          },
          {
            "source": 58,
            "target": 47
          },
          {
            "source": 72,
            "target": 95
          },
          {
            "source": 44,
            "target": 81
          },
          {
            "source": 33,
            "target": 57
          },
          {
            "source": 61,
            "target": 87
          },
          {
            "source": 56,
            "target": 65
          },
          {
            "source": 80,
            "target": 79
          },
          {
            "source": 24,
            "target": 54
          },
          {
            "source": 94,
            "target": 67
          },
          {
            "source": 5,
            "target": 66
          },
          {
            "source": 55,
            "target": 85
          },
          {
            "source": 33,
            "target": 53
          },
          {
            "source": 32,
            "target": 39
          },
          {
            "source": 41,
            "target": 20
          },
          {
            "source": 7,
            "target": 47
          },
          {
            "source": 71,
            "target": 6
          },
          {
            "source": 23,
            "target": 61
          },
          {
            "source": 41,
            "target": 34
          },
          {
            "source": 5,
            "target": 42
          },
          {
            "source": 90,
            "target": 72
          },
          {
            "source": 70,
            "target": 49
          },
          {
            "source": 99,
            "target": 25
          },
          {
            "source": 69,
            "target": 46
          },
          {
            "source": 65,
            "target": 90
          },
          {
            "source": 93,
            "target": 72
          },
          {
            "source": 7,
            "target": 26
          },
          {
            "source": 88,
            "target": 39
          },
          {
            "source": 77,
            "target": 52
          },
          {
            "source": 86,
            "target": 38
          },
          {
            "source": 47,
            "target": 38
          },
          {
            "source": 67,
            "target": 51
          },
          {
            "source": 41,
            "target": 12
          },
          {
            "source": 29,
            "target": 71
          },
          {
            "source": 86,
            "target": 42
          },
          {
            "source": 80,
            "target": 89
          },
          {
            "source": 54,
            "target": 53
          },
          {
            "source": 93,
            "target": 25
          },
          {
            "source": 28,
            "target": 72
          },
          {
            "source": 70,
            "target": 59
          },
          {
            "source": 18,
            "target": 88
          },
          {
            "source": 60,
            "target": 4
          },
          {
            "source": 19,
            "target": 0
          },
          {
            "source": 78,
            "target": 37
          },
          {
            "source": 85,
            "target": 54
          },
          {
            "source": 83,
            "target": 44
          },
          {
            "source": 84,
            "target": 12
          },
          {
            "source": 43,
            "target": 70
          },
          {
            "source": 27,
            "target": 81
          },
          {
            "source": 85,
            "target": 55
          },
          {
            "source": 53,
            "target": 69
          },
          {
            "source": 46,
            "target": 87
          },
          {
            "source": 80,
            "target": 98
          },
          {
            "source": 31,
            "target": 10
          },
          {
            "source": 49,
            "target": 13
          },
          {
            "source": 61,
            "target": 39
          },
          {
            "source": 64,
            "target": 10
          },
          {
            "source": 96,
            "target": 58
          },
          {
            "source": 43,
            "target": 23
          },
          {
            "source": 99,
            "target": 53
          },
          {
            "source": 52,
            "target": 21
          },
          {
            "source": 12,
            "target": 88
          },
          {
            "source": 5,
            "target": 11
          },
          {
            "source": 34,
            "target": 42
          },
          {
            "source": 31,
            "target": 97
          },
          {
            "source": 56,
            "target": 49
          },
          {
            "source": 27,
            "target": 74
          },
          {
            "source": 11,
            "target": 30
          }
        ]
      });
    </file>
   </example>
 */
