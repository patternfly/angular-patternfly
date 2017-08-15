/**
 * @ngdoc directive
 * @name patternfly.views.component:pfCardView
 * @restrict E
 *
 * @description
 *   Component for rendering cards in a view
 *   <br><br>
 *
 * @param {object} config configuration settings for the cards:<br/>
 * <ul style='list-style-type: none'>
 * <li>.showSelectBox          - (boolean) Show item selection boxes for each item, default is true
 * <li>.selectItems            - (boolean) Allow card selection, default is false
 * <li>.dlbClick               - (boolean) Handle double clicking (item remains selected on a double click). Default is false.
 * <li>.multiSelect            - (boolean) Allow multiple card selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * <li>.selectionMatchProp     - (string) Property of the items to use for determining matching, default is 'uuid'
 * <li>.selectedItems          - (array) Current set of selected items
 * <li>.checkDisabled          - ( function(item) ) Function to call to determine if an item is disabled, default is none
 * <li>.onCheckBoxChange       - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 * <li>.onSelect               - ( function(item, event) ) Called to notify of item selection, default is none
 * <li>.onSelectionChange      - ( function(items) ) Called to notify when item selections change, default is none
 * <li>.onClick                - ( function(item, event) ) Called to notify when an item is clicked, default is none
 * <li>.onDblClick             - ( function(item, event) ) Called to notify when an item is double clicked, default is none
 * <li>.itemsAvailable         - (boolean) If 'false', displays the {@link patternfly.views.component:pfEmptyState Empty State} component.
 * </ul>
 * @param {object} pageConfig Optional pagination configuration object.  Since all properties are optional it is ok to specify: 'pageConfig = {}' to indicate that you want to
 * use pagination with the default parameters.
 * <ul style='list-style-type: none'>
 *   <li>.pageNumber  - (number) Optional Initial page number to display. Default is page 1.
 *   <li>.pageSize    - (number) Optional Initial page size/display length to use. Ie. Number of "Items per Page".  Default is 10 items per page
 *   <li>.pageSizeIncrements - (Array[Number]) Optional Page size increments for the 'per page' dropdown.  If not specified, the default values are: [5, 10, 20, 40, 80, 100]
 * </ul>
 * @param {object} emptyStateConfig Optional configuration settings for the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @param {array} emptyStateActionButtons Optional buttons to display under the icon, title, and informational paragraph in the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @param {Array} items the data to be shown in the cards<br/>
 *
 * @example
 <example module="patternfly.views" deps="patternfly.utils">
 <file name="index.html">
   <style>
     hr {
      display: block;
      height: 10px;
      border: 0;
      border-top: 1px solid #525252;
      margin: 1em 0;
      padding: 0;
     }
   </style>
   <div ng-controller="ViewCtrl" class="row" style="display:inline-block; width: 100%;">
     <div class="col-md-12">
       <pf-card-view id="exampleCardView"
           config="config"
           page-config="pageConfig"
           empty-state-config="emptyStateConfig"
           items="items"
           empty-state-action-buttons="emptyStateActionButtons">
         <div class="col-md-12">
           <span>{{item.name}}</span>
         </div>
         <div class="col-md-12">
           <span>{{item.address}}</span>
         </div>
         <div class="col-md-12">
           <span>{{item.city}}, {{item.state}}</span>
         </div>
       </pf-card-view>
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
             <input type="radio" ng-model="selectType" value="card" ng-change="updateSelectionType()">Card</input>
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
             <input type="checkbox" ng-model="config.dblClick" ng-disabled="!config.selectItems">Double Click</input>
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="config.multiSelect" ng-disabled="config.dblClick || !config.selectItems">Multi Select</input>
           </label>
         </div>
       </form>
     </div>
     <div class="col-md-12">
       <form role="form">
         <div class="form-group">
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="showDisabled">Show Disabled Cards</input>
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="config.itemsAvailable">Items Available</input>
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="showPagination" ng-change="togglePagination()">Show Pagination</input>
           </label>
         </div>
       </form>
     </div>
     <div class="col-md-12">
       <label class="events-label">Events: </label>
     </div>
     <div class="col-md-12">
       <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
     </div>
   </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
 function ($scope) {
        $scope.showPagination = false;
        $scope.eventText = '';
        var handleSelect = function (item, e) {
          $scope.eventText = item.name + ' selected\n' + $scope.eventText;
        };
        var handleSelectionChange = function (selectedItems, e) {
          $scope.eventText = selectedItems.length + ' items selected\n' + $scope.eventText;
        };
        var handleClick = function (item, e) {
          $scope.eventText = item.name + ' clicked\n' + $scope.eventText;
        };
        var handleDblClick = function (item, e) {
          $scope.eventText = item.name + ' double clicked\n' + $scope.eventText;
        };
        var handleCheckBoxChange = function (item, selected, e) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\n' + $scope.eventText;
        };
        $scope.togglePagination = function () {
          if ($scope.showPagination) {
            $scope.pageConfig = {
               pageSize: 5
            }
          } else {
            delete $scope.pageConfig;
          }
        };

        var checkDisabledItem = function(item) {
          return $scope.showDisabled && (item.name === "John Smith");
        };

        $scope.selectType = 'checkbox';
        $scope.updateSelectionType = function() {
          if ($scope.selectType === 'checkbox') {
            $scope.config.selectItems = false;
            $scope.config.showSelectBox = true;
          } else if ($scope.selectType === 'card') {
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
         itemsAvailable: true,
         multiSelect: false,
         dblClick: false,
         selectionMatchProp: 'name',
         selectedItems: [],
         checkDisabled: checkDisabledItem,
         showSelectBox: true,
         onSelect: handleSelect,
         onSelectionChange: handleSelectionChange,
         onCheckBoxChange: handleCheckBoxChange,
         onClick: handleClick,
         onDblClick: handleDblClick
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
            name: "Judy Green",
            address: "2 Apple Boulevard",
            city: "Cincinatti",
            state: "Ohio"
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
            state: "Virginia"
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
      }
 ]);
 </file>
 </example>
 */
angular.module('patternfly.views').component('pfCardView', {
  bindings: {
    config: '=?',
    pageConfig: '=?',
    emptyStateConfig: '=?',
    emptyStateActionButtons: '=?',
    items: '=',
    eventId: '@id'
  },
  transclude: true,
  templateUrl: 'views/cardview/card-view.html',
  controller: function () {
    'use strict';
    var ctrl = this;
    var prevPageConfig, prevItems;

    ctrl.defaultConfig = {
      selectItems: false,
      multiSelect: false,
      dblClick: false,
      selectionMatchProp: 'uuid',
      selectedItems: [],
      checkDisabled: false,
      showSelectBox: true,
      onSelect: null,
      onSelectionChange: null,
      onCheckBoxChange: null,
      onClick: null,
      onDblClick: null,
      itemsAvailable: true
    };

    ctrl.itemClick = function (e, item) {
      var alreadySelected;
      var selectionChanged = false;
      var continueEvent = true;

      // Ignore disabled item clicks completely
      if (ctrl.checkDisabled(item)) {
        return continueEvent;
      }

      if (ctrl.config && ctrl.config.selectItems && item) {
        if (ctrl.config.multiSelect && !ctrl.config.dblClick) {

          alreadySelected = _.find(ctrl.config.selectedItems, function (itemObj) {
            return itemObj === item;
          });

          if (alreadySelected) {
            // already selected so deselect
            ctrl.config.selectedItems = _.without(ctrl.config.selectedItems, item);
          } else {
            // add the item to the selected items
            ctrl.config.selectedItems.push(item);
            selectionChanged = true;
          }
        } else {
          if (ctrl.config.selectedItems[0] === item) {
            if (!ctrl.config.dblClick) {
              ctrl.config.selectedItems = [];
              selectionChanged = true;
            }
            continueEvent = false;
          } else {
            ctrl.config.selectedItems = [item];
            selectionChanged = true;
          }
        }

        if (selectionChanged && ctrl.config.onSelect) {
          ctrl.config.onSelect(item, e);
        }
        if (selectionChanged && ctrl.config.onSelectionChange) {
          ctrl.config.onSelectionChange(ctrl.config.selectedItems, e);
        }
      }
      if (ctrl.config.onClick) {
        ctrl.config.onClick(item, e);
      }

      return continueEvent;
    };

    ctrl.dblClick = function (e, item) {
      if (ctrl.config.onDblClick) {
        ctrl.config.onDblClick(item, e);
      }
    };

    ctrl.checkBoxChange = function (item) {
      if (ctrl.config.onCheckBoxChange) {
        ctrl.config.onCheckBoxChange(item);
      }
    };

    ctrl.isSelected = function (item) {
      var matchProp = ctrl.config.selectionMatchProp;
      var selected = false;

      if (ctrl.config.showSelectBox) {
        selected = item.selected;
      } else {
        if (ctrl.config.selectedItems.length) {
          return _.find(ctrl.config.selectedItems, function (itemObj) {
            return itemObj[matchProp] === item[matchProp];
          });
        }
      }
      return selected;
    };

    ctrl.checkDisabled = function (item) {
      return ctrl.config.checkDisabled && ctrl.config.checkDisabled(item);
    };

    function setPagination () {
      if (angular.isUndefined(ctrl.pageConfig)) {
        ctrl.pageConfig = {
          pageNumber: 1,
          pageSize: ctrl.items.length,
          numTotalItems: ctrl.items.length,
          showPaginationControls: false
        };
      } else {
        if (angular.isUndefined(ctrl.pageConfig.showPaginationControls)) {
          ctrl.pageConfig.showPaginationControls = true;
        }
        if (!angular.isNumber(ctrl.pageConfig.pageNumber)) {
          ctrl.pageConfig.pageNumber = 1;
        }
        if (!angular.isNumber(ctrl.pageConfig.pageSize)) {
          ctrl.pageConfig.pageSize = 10;
        }
        if (!angular.isNumber(ctrl.pageConfig.numTotalItems)) {
          ctrl.pageConfig.numTotalItems = ctrl.items.length;
        }
        // if not showing pagination, keep pageSize equal to numTotalItems
        if (!ctrl.pageConfig.showPaginationControls) {
          ctrl.pageConfig.pageSize = ctrl.pageConfig.numTotalItems;
        }
      }
      prevPageConfig = angular.copy(ctrl.pageConfig);
    }

    ctrl.$onInit = function () {

      _.defaults(ctrl.config, ctrl.defaultConfig);

      if (ctrl.config.selectItems && ctrl.config.showSelectBox) {
        throw new Error('pfCardView - ' +
          'Illegal use of pfCardView component! ' +
          'Cannot allow both select box and click selection in the same card view.');
      }

      prevItems = angular.copy(ctrl.items);
      setPagination();
    };


    ctrl.$doCheck = function () {
      if (!angular.equals(ctrl.pageConfig, prevPageConfig)) {
        setPagination();
      }
      if (!angular.equals(ctrl.items, prevItems)) {
        if (ctrl.items) {
          ctrl.config.itemsAvailable = ctrl.items.length > 0;
        }
        if (angular.isDefined(ctrl.pageConfig)) {
          ctrl.pageConfig.numTotalItems = ctrl.items.length;
        }
        prevItems = angular.copy(ctrl.items);
      }
    };
  }
});
