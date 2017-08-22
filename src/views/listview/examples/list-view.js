/**
 * @ngdoc directive
 * @name patternfly.views.component:pfListView
 * @restrict E
 *
 * @description
 *   Component for rendering a list view.
 *   Pass a customScope object containing any scope variables/functions you need to access from the transcluded source, access these
 *   via '$ctrl.customScope' in your transcluded hmtl.
 *   <br><br>
 *   If using expanding rows, use a list-expanded-content element containing expandable content for each row.  Item data can be accessed inside list-expanded-content by using $parent.item.property.  For each item in the items array, the expansion can be disabled by setting disableRowExpansion to true on the item.
 *   Setting compoundExpanion requires the applicatiot to set/unset the items' isExpanded field and to handle the contents in the list-expanded-content element based on what is expanded.
 *
 * @param {array} items Array of items to display in the list view. If an item in the array has a 'rowClass' field, the value of this field will be used as a class specified on the row (list-group-item).
 * @param {object} config Configuration settings for the list view:
 * <ul style='list-style-type: none'>
 * <li>.showSelectBox          - (boolean) Show item selection boxes for each item, default is true
 * <li>.selectItems            - (boolean) Allow row selection, default is false
 * <li>.dlbClick               - (boolean) Handle double clicking (item remains selected on a double click). Default is false.
 * <li>.dragEnabled            - (boolean) Enable drag and drop. Default is false.
 * <li>.dragEnd                - ( function() ) Function to call when the drag operation ended, default is none
 * <li>.dragMoved              - ( function() ) Function to call when the drag operation moved an element, default is none
 * <li>.dragStart              - ( function(item) ) Function to call when the drag operation started, default is none
 * <li>.multiSelect            - (boolean) Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * <li>.useExpandingRows       - (boolean) Allow row expansion for each list item.
 * <li>.compoundExpansionOnly  - (boolean) Use compound row expansion only. Hides the row expander and pointer cursor on the row while allowing the row to expand via transcluded items functionality, only valid if useExpandRows is true.
 * <li>.selectionMatchProp     - (string) Property of the items to use for determining matching, default is 'uuid'
 * <li>.selectedItems          - (array) Current set of selected items
 * <li>.itemsAvailable         - (boolean) If 'false', displays the {@link patternfly.views.component:pfEmptyState Empty State} component.
 * <li>.checkDisabled          - ( function(item) ) Function to call to determine if an item is disabled, default is none
 * <li>.onCheckBoxChange       - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 * <li>.onSelect               - ( function(item, event) ) Called to notify of item selection, default is none
 * <li>.onSelectionChange      - ( function(items) ) Called to notify when item selections change, default is none
 * <li>.onClick                - ( function(item, event) ) Called to notify when an item is clicked, default is none. Note: row expansion is the default behavior after onClick performed, but user can stop such default behavior by adding the sentence "return false;" to the end of onClick function body
 * <li>.onDblClick             - ( function(item, event) ) Called to notify when an item is double clicked, default is none
 * </ul>
 * @param {object} pageConfig Optional pagination configuration object.  Since all properties are optional it is ok to specify: 'pageConfig = {}' to indicate that you want to
 * use pagination with the default parameters.
 * <ul style='list-style-type: none'>
 *   <li>.pageNumber  - (number) Optional Initial page number to display. Default is page 1.
 *   <li>.pageSize    - (number) Optional Initial page size/display length to use. Ie. Number of "Items per Page".  Default is 10 items per page
 *   <li>.pageSizeIncrements - (Array[Number]) Optional Page size increments for the 'per page' dropdown.  If not specified, the default values are: [5, 10, 20, 40, 80, 100]
 * </ul>
 * @param {array} actionButtons List of action buttons in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.class - (String) Optional class to add to the action button
 *     <li>.include - (String) Optional include src for the button. Used for custom button layouts (icons, dropdowns, etc)
 *     <li>.includeClass - (String) Optional class to set on the include src div (only relevant when include is set).
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   </ul>
 * @param {function (action, item))} enableButtonForItemFn function(action, item) Used to enabled/disable an action button based on the current item
 * @param {array} menuActions List of actions for dropdown menu in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *     <li>.isVisible - (Boolean) set to false to hide the action
 *     <li>.isDisabled - (Boolean) set to true to disable the action
 *     <li>.isSeparator - (Boolean) set to true if this is a placeholder for a separator rather than an action
 *   </ul>
 * @param {function (item))} hideMenuForItemFn function(item) Used to hide all menu actions for a particular item
 * @param {function (item))} menuClassForItemFn function(item) Used to specify a class for an item's dropdown kebab
 * @param {function (action, item))} updateMenuActionForItemFn function(action, item) Used to update a menu action based on the current item
 * @param {object} customScope Object containing any variables/functions used by the transcluded html, access via $ctrl.customScope.<xxx>
 * @param {object} emptyStateConfig Optional configuration settings for the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @param {array} emptyStateActionButtons Optional buttons to display under the icon, title, and informational paragraph in the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @example
<example module="patternfly.views" deps="patternfly.utils">
  <file name="index.html">
     <div ng-controller="ViewCtrl" style="background-color: #fff; margin: -20px;">
       <ul class="nav nav-tabs">
         <li ng-class="{'active': viewType === 'basic'}"><a href="#" ng-click="setView('basic')">Basic (w/ Options)</a></li>
         <li ng-class="{'active': viewType === 'compound'}"><a href="#" ng-click="setView('compound')">Compound Expansion</a></li>
         <li ng-class="{'active': viewType === 'pagination'}"><a href="#" ng-click="setView('pagination')">Pagination</a></li>
       </ul>
       <div ng-if="viewType === 'basic'" ng-include="'basic.html'"></div>
       <div ng-if="viewType === 'compound'" ng-include="'compound.html'"></div>
       <div ng-if="viewType === 'pagination'" ng-include="'pagination.html'"></div>
     </div>
  </file>
  <file name="view.js">
   angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.viewType = 'basic';

        $scope.setView = function(viewType) {
          $scope.viewType = viewType;
        };
      }
    ]);
  </file>
  <file name="basic.html">
     <div ng-controller="BasicCtrl" class="row example-container">
      <div class="col-md-12 list-view-container example-list-view">
        <pf-list-view id="exampleListView"
                          config="config"
                          empty-state-config="emptyStateConfig"
                          items="items"
                          action-buttons="actionButtons"
                          enable-button-for-item-fn="enableButtonForItemFn"
                          menu-actions="menuActions"
                          update-menu-action-for-item-fn="updateMenuActionForItemFn"
                          menu-class-for-item-fn="getMenuClass"
                          hide-menu-for-item-fn="hideMenuActions"
                          empty-state-action-buttons="emptyStateActionButtons">
          <div class="list-view-pf-description">
            <div class="list-group-item-heading">
              {{item.name}}
            </div>
            <div class="list-group-item-text">
              {{item.address}}
            </div>
          </div>
          <div class="list-view-pf-additional-info">
            <div class="list-view-pf-additional-info-item">
              {{item.city}}
            </div>
            <div class="list-view-pf-additional-info-item">
              {{item.state}}
            </div>
          </div>
          <list-expanded-content>
           <div class="row">
            <div class="col-md-3">
              <pf-donut-pct-chart config="exampleChartConfig" data="{'used': '350','total': '1000'}" center-label="'Percent Used'"></pf-donut-pct-chart>
            </div>
            <div class="col-md-9">
               <dl class="dl-horizontal">
                 <dt>Host</dt>
                 <dd>{{$parent.item.city}}</dd>
                 <dt>Admin</dt>
                 <dd>{{$parent.item.name}}</dd>
                 <dt>Time</dt>
                 <dd>January 15, 2016 10:45:11 AM</dd>
                 <dt>Severity</dt>
                 <dd>Warning</dd>
                 <dt>Cluster</dt>
                 <dd>Cluster 1</dd>
               </dl>
               <p>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                 cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                 proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>
             </div>
           </div>
          </list-expanded-content>
        </pf-list-view>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label>Selection</label>
            </br>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="checkbox" ng-change="updateSelectionType()">Checkbox</input>
            </label>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="row" ng-change="updateSelectionType()">Row</input>
            </label>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="none" ng-change="updateSelectionType()">None</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.dblClick">Double Click</input>
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.multiSelect" ng-disabled="config.dblClick">Multi Select</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="showDisabled">Show Disabled Rows</input>
            </label>
           <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.useExpandingRows">Show Expanding Rows</input>
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="config.itemsAvailable">Items Available</input>
           </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.dragEnabled">Drag and Drop</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <label style="font-weight:normal;vertical-align:center;">Events: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
      </div>
    </div>
  </file>

  <file name="basic.js">
   angular.module('patternfly.views').controller('BasicCtrl', ['$scope', '$templateCache',
      function ($scope, $templateCache) {
        $scope.eventText = '';
        var handleSelect = function (item, e) {
          $scope.eventText = item.name + ' selected\r\n' + $scope.eventText;
        };
        var handleSelectionChange = function (selectedItems, e) {
          $scope.eventText = selectedItems.length + ' items selected\r\n' + $scope.eventText;
        };
        var handleClick = function (item, e) {
          $scope.eventText = item.name + ' clicked\r\n' + $scope.eventText;
        };
        var handleDblClick = function (item, e) {
          $scope.eventText = item.name + ' double clicked\r\n' + $scope.eventText;
        };
        var handleCheckBoxChange = function (item, selected, e) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
        };

        var checkDisabledItem = function(item) {
          return $scope.showDisabled && (item.name === "John Smith");
        };

        var dragEnd = function() {
          $scope.eventText = 'drag end\r\n' + $scope.eventText;
        };
        var dragMoved = function() {
          var index = -1;

          for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i] === $scope.dragItem) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            $scope.items.splice(index, 1);
          }
          $scope.eventText = 'drag moved\r\n' + $scope.eventText;
        };
        var dragStart = function(item) {
          $scope.dragItem = item;
          $scope.eventText = item.name + ': drag start\r\n' + $scope.eventText;
        };

        $scope.enableButtonForItemFn = function(action, item) {
          return !((action.name ==='Action 2') && (item.name === "Frank Livingston")) &&
                 !(action.name === 'Start' && item.started);
        };

        $scope.updateMenuActionForItemFn = function(action, item) {
          if (action.name === 'Another Action') {
            action.isVisible = (item.name !== "John Smith");
          }
        };

        $scope.exampleChartConfig = {
          'chartId': 'pctChart',
          'units': 'GB',
          'thresholds': {
            'warning':'60',
            'error':'90'
          }
        };

        $scope.selectType = 'checkbox';
        $scope.updateSelectionType = function() {
          if ($scope.selectType === 'checkbox') {
            $scope.config.selectItems = false;
            $scope.config.showSelectBox = true;
          } else if ($scope.selectType === 'row') {
            $scope.config.selectItems = true;
            $scope.config.showSelectBox = false;
          } else {
            $scope.config.selectItems = false;
            $scope.config.showSelectBox = false;
          }
        };

        $scope.showDisabled = false;

        $scope.config = {
         selectItems: false,
         multiSelect: false,
         dblClick: false,
         dragEnabled: false,
         dragEnd: dragEnd,
         dragMoved: dragMoved,
         dragStart: dragStart,
         selectionMatchProp: 'name',
         selectedItems: [],
         itemsAvailable: true,
         checkDisabled: checkDisabledItem,
         showSelectBox: true,
         useExpandingRows: false,
         onSelect: handleSelect,
         onSelectionChange: handleSelectionChange,
         onCheckBoxChange: handleCheckBoxChange,
         onClick: handleClick,
         onDblClick: handleDblClick
        };

        var performEmptyStateAction = function (action) {
          $scope.eventText = action.name + "\r\n" + $scope.eventText;
        };

        $scope.emptyStateConfig = {
          icon: 'pficon-warning-triangle-o',
          title: 'No Items Available',
          info: "This is the Empty State component. The goal of a empty state pattern is to provide a good first impression that helps users to achieve their goals. It should be used when a view is empty because no objects exists and you want to guide the user to perform specific actions.",
          helpLink: {
             label: 'For more information please see',
             urlLabel: 'pfExample',
             url : '#/api/patternfly.views.component:pfEmptyState'
          }
        };

        $scope.emptyStateActionButtons = [
          {
            name: 'Main Action',
            title: 'Perform an action',
            actionFn: performEmptyStateAction,
            type: 'main'
          },
          {
            name: 'Secondary Action 1',
            title: 'Perform an action',
            actionFn: performEmptyStateAction
          },
          {
            name: 'Secondary Action 2',
            title: 'Perform an action',
            actionFn: performEmptyStateAction
          },
          {
            name: 'Secondary Action 3',
            title: 'Perform an action',
            actionFn: performEmptyStateAction
          }
        ];

        $scope.items = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way",
            city: "Bedrock",
            state: "Washingstone"
          },
          {
            name: "John Smith",
            address: "415 East Main Street",
            city: "Norfolk",
            state: "Virginia",
            disableRowExpansion: true
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street",
            city: "Pittsburgh",
            state: "Pennsylvania"
          },
          {
            name: "Linda McGovern",
            address: "22 Oak Street",
            city: "Denver",
            state: "Colorado"
          },
          {
            name: "Jim Brown",
            address: "72 Bourbon Way",
            city: "Nashville",
            state: "Tennessee"
          },
          {
            name: "Holly Nichols",
            address: "21 Jump Street",
            city: "Hollywood",
            state: "California"
          },
          {
            name: "Marie Edwards",
            address: "17 Cross Street",
            city: "Boston",
            state: "Massachusetts"
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street",
            city: "New York",
            state: "New York"
          }
        ];

        $scope.getMenuClass = function (item) {
          var menuClass = "";
          if (item.name === "Jim Brown") {
            menuClass = 'red';
          }
          return menuClass;
        };

        $scope.hideMenuActions = function (item) {
          return (item.name === "Marie Edwards");
        };

        var performAction = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
        };

        var startServer = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
          item.started = true;
        };

        var buttonInclude = '<span class="fa fa-plus"></span>{{actionButton.name}}';
        $templateCache.put('my-button-template', buttonInclude);

        var startButtonInclude = '<span ng-disabled="item.started">{{item.started ? "Starting" : "Start"}}</span>';
        $templateCache.put('start-button-template', startButtonInclude);

        $scope.actionButtons = [
          {
            name: 'Start',
            class: 'btn-primary',
            include: 'start-button-template',
            title: 'Start the server',
            actionFn: startServer
          },
          {
            name: 'Action 1',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Action 2',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Action 3',
            include: 'my-button-template',
            title: 'Do something special',
            actionFn: performAction
          }
        ];
        $scope.menuActions = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ];
      }
    ]);
  </file>
  <file name="compound.html">
   <div ng-controller="CompoundExanspansionCtrl" class="row example-container">
     <div class="col-md-12 list-view-container example-list-view">
       <pf-list-view id="exampleListView"
       config="config"
       items="items"
       action-buttons="actionButtons"
       enable-button-for-item-fn="enableButtonForItemFn"
       menu-actions="menuActions"
       update-menu-action-for-item-fn="updateMenuActionForItemFn"
       menu-class-for-item-fn="getMenuClass"
       hide-menu-for-item-fn="hideMenuActions"
       custom-scope="customScope">
         <div class="list-view-pf-left">
           <span class="{{item.typeIcon}} list-view-pf-icon-sm"></span>
         </div>
         <div class="list-view-pf-body">
           <div class="list-view-pf-description">
             <div class="list-group-item-heading">
               {{item.name}}
             </div>
             <div class="list-group-item-text">
               The following snippet of text is <a href="#">rendered as link text</a>.
             </div>
           </div>
           <div class="list-view-pf-additional-info">
             <div class="list-view-pf-additional-info-item">
               <div class="list-view-pf-expand" ng-click="$ctrl.customScope.toggleExpandItemField(item, 'hosts')">
                 <span class="fa fa-angle-right" ng-class="{'fa-angle-down': $ctrl.customScope.isItemExpanded(item, 'hosts')}"></span>
                 <span class="pficon pficon-screen"></span>
                 <strong>{{item.hostCount}}</strong> Hosts
               </div>
             </div>
             <div class="list-view-pf-additional-info-item">
               <div class="list-view-pf-expand" ng-click="$ctrl.customScope.toggleExpandItemField(item, 'clusters')">
                 <span class="fa fa-angle-right" ng-class="{'fa-angle-down': $ctrl.customScope.isItemExpanded(item, 'clusters')}"></span>
                 <span class="pficon pficon-cluster"></span>
                 <strong>{{item.clusterCount}}</strong> Clusters
               </div>
             </div>
             <div class="list-view-pf-additional-info-item">
               <div class="list-view-pf-expand" ng-click="$ctrl.customScope.toggleExpandItemField(item, 'nodes')">
                 <span class="fa fa-angle-right" ng-class="{'fa-angle-down': $ctrl.customScope.isItemExpanded(item, 'nodes')}"></span>
                 <span class="pficon pficon-container-node"></span>
                 <strong>{{item.nodeCount}}</strong> Nodes
               </div>
             </div>
             <div class="list-view-pf-additional-info-item">
               <div class="list-view-pf-expand" ng-click="$ctrl.customScope.toggleExpandItemField(item, 'images')">
                 <span class="fa fa-angle-right" ng-class="{'fa-angle-down': $ctrl.customScope.isItemExpanded(item, 'images')}"></span>
                 <span class="pficon pficon-image"></span>
                 <strong>{{item.imageCount}}</strong> Images
               </div>
             </div>
           </div>
         </div>
         <list-expanded-content>
           <div class="close">
             <span class="pficon pficon-close" ng-click="$parent.$ctrl.customScope.collapseItem($parent.item)"></span>
           </div>
          <item-expansion item="$parent.item"></item-expansion>
         </list-expanded-content>
       </pf-list-view>
     </div>
     <hr class="col-md-12">
     <div class="col-md-12">
       <label style="font-weight:normal;vertical-align:center;">Events: </label>
     </div>
     <div class="col-md-12">
       <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
     </div>
   </div>
  </file>
  <file name="compound.js">
    angular.module('patternfly.views').controller('CompoundExanspansionCtrl', ['$scope', '$templateCache',
      function ($scope, $templateCache) {
        $scope.eventText = '';
        var handleCheckBoxChange = function (item, selected, e) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
        };

        $scope.enableButtonForItemFn = function(action, item) {
          return !((action.name ==='Action 2') && (item.name === "Frank Livingston")) &&
                 !(action.name === 'Start' && item.started);
        };

        $scope.updateMenuActionForItemFn = function(action, item) {
          if (action.name === 'Another Action') {
            action.isVisible = (item.name !== "John Smith");
          }
        };

        $scope.customScope = {
          toggleExpandItemField: function(item, field) {
            if (item.isExpanded && item.expandField === field) {
              item.isExpanded = false;
            } else {
              item.isExpanded = true;
              item.expandField = field;
            }
          },
          collapseItem: function(item) {
            item.isExpanded = false;
          },
          isItemExpanded: function(item, field) {
            return item.isExpanded && item.expandField === field;
          }
        };

        $scope.selectType = 'checkbox';
        $scope.showDisabled = false;

        $scope.config = {
         selectionMatchProp: 'name',
         selectedItems: [],
         itemsAvailable: true,
         showSelectBox: true,
         useExpandingRows: true,
         compoundExpansionOnly: true,
         onCheckBoxChange: handleCheckBoxChange
        };

        $scope.items = [
          {
            name: "Event One",
            typeIcon: "fa fa-plane ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          },
          {
            name: "Event Two",
            typeIcon: "fa fa-magic ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          },
          {
            name: "Event Three",
            typeIcon: "fa fa-gamepad ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          },
          {
            name: "Event Four",
            typeIcon: "fa fa-linux ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          },
          {
            name: "Event Five",
            typeIcon: "fa fa-briefcase ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          },
          {
            name: "Event Six",
            typeIcon: "fa fa-coffee ",
            hostCount: 8,
            clusterCount: 6,
            nodeCount: 10,
            imageCount: 8
          }
        ];

        $scope.getMenuClass = function (item) {
          var menuClass = "";
          if (item.name === "Jim Brown") {
            menuClass = 'red';
          }
          return menuClass;
        };

        $scope.hideMenuActions = function (item) {
          return (item.name === "Marie Edwards");
        };

        var performAction = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
        };

        var startServer = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
          item.started = true;
        };

        var buttonInclude = '<span class="fa fa-plus"></span>{{actionButton.name}}';
        $templateCache.put('my-button-template', buttonInclude);

        var startButtonInclude = '<span ng-disabled="item.started">{{item.started ? "Starting" : "Start"}}</span>';
        $templateCache.put('start-button-template', startButtonInclude);

        $scope.actionButtons = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          }
        ];
        $scope.menuActions = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ];
      }
    ]);
  </file>
  <file name="itemExpansion.js">
    angular.module('patternfly.views').component('itemExpansion', {
      bindings: {
        item: '<'
      },
      templateUrl: 'itemExpansion.html',
      controller: function () {
        'use strict';
        var ctrl = this;
      }
    });
  </file>
  <file name="itemExpansion.html">
   <div ng-if="$ctrl.item.expandField === 'hosts'" ng-include="'views/listview/examples/hosts-content.html'"></div>
   <div ng-if="$ctrl.item.expandField === 'clusters'" ng-include="'views/listview/examples/clusters-content.html'"></div>
   <div ng-if="$ctrl.item.expandField === 'nodes'" ng-include="'views/listview/examples/nodes-content.html'"></div>
   <div ng-if="$ctrl.item.expandField === 'images'" ng-include="'views/listview/examples/images-content.html'"></div>
 </file>

 <file name="pagination.html">
   <div ng-controller="PaginationCtrl" class="row example-container">
     <div class="col-md-12 list-view-container example-list-view">
       <pf-list-view id="paginationListView"
         items="items"
         page-config="pageConfig"
         action-buttons="actionButtons"
         menu-actions="menuActions">
         <div class="list-view-pf-description">
           <div class="list-group-item-heading">
             {{item.name}}
           </div>
           <div class="list-group-item-text">
             {{item.address}}
           </div>
         </div>
         <div class="list-view-pf-additional-info">
           <div class="list-view-pf-additional-info-item">
             {{item.city}}
           </div>
           <div class="list-view-pf-additional-info-item">
             {{item.state}}
           </div>
         </div>
       </pf-list-view>
     </div>
   </div>
 </file>

 <file name="pagination.js">
   angular.module('patternfly.views').controller('PaginationCtrl', ['$scope', '$templateCache',
     function ($scope, $templateCache) {

        $scope.pageConfig = {
          pageSize: 5
        };

        var startServer = function (action, item) {
          console.log(item.name + " : " + action.name);
        };

        var performAction = function (action, item) {
          console.log(item.name + " : " + action.name);
        };

        $scope.items = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way",
            city: "Bedrock",
            state: "Washingstone"
          },
          {
            name: "John Smith",
            address: "415 East Main Street",
            city: "Norfolk",
            state: "Virginia"
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street",
            city: "Pittsburgh",
            state: "Pennsylvania"
          },
          {
            name: "Linda McGovern",
            address: "22 Oak Street",
            city: "Denver",
            state: "Colorado"
          },
          {
            name: "Jim Brown",
            address: "72 Bourbon Way",
            city: "Nashville",
            state: "Tennessee"
          },
          {
            name: "Holly Nichols",
            address: "21 Jump Street",
            city: "Hollywood",
            state: "California"
          },
          {
            name: "Marie Edwards",
            address: "17 Cross Street",
            city: "Boston",
            state: "Massachusetts"
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street",
            city: "New York",
            state: "New York"
          },
          {
            name: "Betty Rubble",
            address: "30 Dinosaur Way",
            city: "Bedrock",
            state: "Washingstone"
          },
          {
            name: "Martha Smith",
            address: "415 East Main Street",
            city: "Norfolk",
            state: "Virginia",
          },
          {
            name: "Liz Livingston",
            address: "234 Elm Street",
            city: "Pittsburgh",
            state: "Pennsylvania"
          },
          {
            name: "Howard McGovern",
            address: "22 Oak Street",
            city: "Denver",
            state: "Colorado"
          },
          {
            name: "Joyce Brown",
            address: "72 Bourbon Way",
            city: "Nashville",
            state: "Tennessee"
          },
          {
            name: "Mike Nichols",
            address: "21 Jump Street",
            city: "Hollywood",
            state: "California"
          },
          {
            name: "Mark Edwards",
            address: "17 Cross Street",
            city: "Boston",
            state: "Massachusetts"
          },
          {
            name: "Chris Thomas",
            address: "50 Second Street",
            city: "New York",
            state: "New York"
          }
        ];

        $scope.actionButtons = [
          {
            name: 'Start',
            class: 'btn-primary',
            include: 'start-button-template',
            title: 'Start the server',
            actionFn: startServer
          },
          {
            name: 'Action 1',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Action 2',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Action 3',
            include: 'my-button-template',
            title: 'Do something special',
            actionFn: performAction
          }
        ];
        $scope.menuActions = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ];
      }
   ]);
 </file>
 </example>
 */
