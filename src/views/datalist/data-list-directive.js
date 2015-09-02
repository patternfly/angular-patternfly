/**
 * @ngdoc directive
 * @name patternfly.views.directive:pfDataList
 *
 * @description
 *   Directive for rendering a data list.
 *   <br><br>
 *
 * @param {object} config configuration settings for the data list:<br/>
 * <ul style='list-style-type: none'>
 * <li>.showSelectBox          - (boolean) Show item selection boxes for each item, default is true
 * <li>.selectItems            - (boolean) Allow row selection, default is false
 * <li>.dlbClick               - (boolean) Handle double clicking (item remains selected on a double click). Default is false.
 * <li>.multiSelect            - (boolean) Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * <li>.selectionMatchProp     - (string) Property of the items to use for determining matching, default is 'uuid'
 * <li>.selectedItems          - (array) Current set of selected items
 * <li>.checkDisabled          - ( function(item) ) Function to call to determine if an item is disabled, default is none
 * <li>.rowHeight              - (int) ONLY used to determine check box placement. Default is 36
 * <li>.onCheckBoxChange       - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 * <li>.onSelect               - ( function(item, event) ) Called to notify of item selection, default is none
 * <li>.onSelectionChange      - ( function(items) ) Called to notify when item selections change, default is none
 * <li>.onClick                - ( function(item, event) ) Called to notify when an item is clicked, default is none
 * <li>.onDblClick             - ( function(item, event) ) Called to notify when an item is double clicked, default is none
 * </ul>
 *
 * @param {Array} items the data to be shown in the data list<br/>
 *
 * @example
<example module="patternfly.views" deps="patternfly.utils">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row" style="display:inline-block; width: 100%;">
      <div class="col-md-12">
        <div pf-data-list id="exampleDataList" config="config" items="items">
          <div class="col-md-12 cfme-row-column">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 list-column">
              <span>{{item.name}}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 list-column">
              <span>{{item.address}}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 list-column">
              <span>{{item.city}}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 list-column">
              <span>{{item.state}}</span>
            </div>
          </div>
        </div>
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
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <label style="font-weight:normal;vertical-align:center;">Row Height: </label>
        <input style="height:25px; width:60px;" type="number" ng-model="config.rowHeight"></input>
      </div>
      <div class="col-md-12">
        <label style="font-weight:normal;vertical-align:center;">Events: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
      </div>
    </div>
  </file>

  <file name="script.js">
 angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
      function ($scope) {
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

        var checkDisabledItem = function(item) {
          return $scope.showDisabled && (item.name === "John Smith");
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
            $scope.config.selectItems = false
            $scope.config.showSelectBox = false;
          }
        };

        $scope.showDisabled = false;

        $scope.config = {
         selectItems: false,
         multiSelect: false,
         dblClick: false,
         selectionMatchProp: 'name',
         selectedItems: [],
         checkDisabled: checkDisabledItem,
         showSelectBox: true,
         rowHeight: 36,
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
        ]
      }
    ]);
  </file>
</example>
 */
angular.module('patternfly.views').directive('pfDataList', [
  function () {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=?',
        items: '=',
        eventId: '@id'
      },
      transclude: true,
      templateUrl: 'views/datalist/data-list.html',
      controller: ['$scope',
        function ($scope) {
          $scope.defaultConfig = {
            selectItems: false,
            multiSelect: false,
            dblClick: false,
            selectionMatchProp: 'uuid',
            selectedItems: [],
            checkDisabled: false,
            showSelectBox: true,
            rowHeight: 36,
            onSelect: null,
            onSelectionChange: null,
            onCheckBoxChange: null,
            onClick: null,
            onDblClick: null
          };

          $scope.config = $.extend(true, angular.copy($scope.defaultConfig), $scope.config);
          if ($scope.config.selectItems && $scope.config.showSelectBox) {
            throw new Error('pfDataList - ' +
            'Illegal use of pfDataList directive! ' +
            'Cannot allow both select box and click selection in the same data list.');
          }
        }
      ],

      link: function (scope, element, attrs) {
        attrs.$observe('config', function () {
          scope.config = $.extend(true, angular.copy(scope.defaultConfig), scope.config);
          if (!scope.config.selectItems) {
            scope.config.selectedItems = [];
          }
          if (!scope.config.multiSelect && scope.config.selectedItems && scope.config.selectedItems.length > 0) {
            scope.config.selectedItems = [scope.config.selectedItems[0]];
          }
        });

        scope.itemClick = function (e, item) {
          var alreadySelected;
          var selectionChanged = false;
          var continueEvent = true;

          // Ignore disabled item clicks completely
          if (scope.checkDisabled(item)) {
            return continueEvent;
          }

          if (scope.config && scope.config.selectItems && item) {
            if (scope.config.multiSelect && !scope.config.dblClick) {

              alreadySelected = _.find(scope.config.selectedItems, function (itemObj) {
                return itemObj === item;
              });

              if (alreadySelected) {
                // already selected so deselect
                scope.config.selectedItems = _.without(scope.config.selectedItems, item);
              } else {
                // add the item to the selected items
                scope.config.selectedItems.push(item);
                selectionChanged = true;
              }
            } else {
              if (scope.config.selectedItems[0] === item) {
                if (!scope.config.dblClick) {
                  scope.config.selectedItems = [];
                  selectionChanged = true;
                }
                continueEvent = false;
              } else {
                scope.config.selectedItems = [item];
                selectionChanged = true;
              }
            }

            if (selectionChanged && scope.config.onSelect) {
              scope.config.onSelect(item, e);
            }
            if (selectionChanged && scope.config.onSelectionChange) {
              scope.config.onSelectionChange(scope.config.selectedItems, e);
            }
          }
          if (scope.config.onClick) {
            scope.config.onClick(item, e);
          }

          return continueEvent;
        };

        scope.dblClick = function (e, item) {
          if (scope.config.onDblClick) {
            scope.config.onDblClick(item, e);
          }
        };

        scope.checkBoxChange = function (item) {
          if (scope.config.onCheckBoxChange) {
            scope.config.onCheckBoxChange(item);
          }
        };

        scope.isSelected = function (item) {
          var matchProp = scope.config.selectionMatchProp;
          var selected = false;

          if (scope.config.showSelectBox) {
            selected = item.selected;
          } else if (scope.config.selectItems && scope.config.selectedItems.length) {
            selected = _.find(scope.config.selectedItems, function (itemObj) {
              return itemObj[matchProp] === item[matchProp];
            });
          }
          return selected;
        };

        scope.checkDisabled = function (item) {
          return scope.config.checkDisabled && scope.config.checkDisabled(item);
        };
      }
    };
  }
]);
