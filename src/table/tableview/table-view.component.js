/**
  * @ngdoc directive
  * @name patternfly.table.component:pfTableView
  *
  * @description
  *   Component for rendering a table view.
  *
  * @param {array} items Array of items to display in the table view.
  * @param {array} col-headers Array of column headers to display in the table's header row
  * @example
 <example module="patternfly.table">
 <file name="index.html">
 <style>
 .list-view-container {
        border: none;
        padding: 10px;
      }
 </style>
 <div ng-controller="TableCtrl" class="row example-container">
   <div class="col-md-12 list-view-container table-view-container">
     <div table-view-container">
       <pf-table-view id="exampleTableView"
            config="config"
            dt-options="dtOptions"
            colummns="colummns"
            items="items"
            action-buttons="actionButtons"
            menu-actions="menuActions">
       </pf-table-view>
     </div>
     <div class="col-md-12">
       <br>
       <form role="form">
         <div class="form-group">
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="usePagination" ng-change="togglePagination()">Use Pagination</input>
           </label>
           <label>
             <input ng-model="dtOptions.displayLength" ng-disabled="!usePagination" style="width: 24px; padding-left: 6px;"> # Rows Per Page</input>
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
 </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.table').controller('TableCtrl', ['$scope',
 function ($scope) {
        $scope.dtOptions = {
          paginationType: 'full',
          order: [[2, "asc"]],
          dom: "t"
        };

        $scope.usePagination = false;
        $scope.togglePagination = function () {
          if($scope.usePagination) {
            $scope.dtOptions.displayLength = 3;
            $scope.dtOptions.dom = "tp";
          } else {
            $scope.dtOptions.displayLength = undefined;
            $scope.dtOptions.dom = "t";
          }
        };

        $scope.colummns = [
          { colHeader: "Name", colItemFld: "name" },
          { colHeader: "Address", colItemFld: "address"},
          { colHeader: "City", colItemFld: "city" },
          { colHeader: "State", colItemFld: "state"}
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
        ];

        $scope.eventText = "";

        $scope.config = {
          onCheckBoxChange: handleCheckBoxChange,
          selectionMatchProp: "name"
        };

        function handleCheckBoxChange (item) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
        };

        var performAction = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
        };

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
</example>
*/
angular.module('patternfly.table').component('pfTableView', {
  bindings: {
    config: '<?',
    dtOptions: '<?',
    colummns: '<',
    items: '<',
    actionButtons: '<?',
    menuActions: '<?'
  },
  templateUrl: 'table/tableview/table-view.html',
  controller: function (DTOptionsBuilder, DTColumnDefBuilder, $element, pfUtils, $log, $filter, $timeout) {
    'use strict';
    var ctrl = this, prevDtOptions;

    ctrl.selectAll = false;
    ctrl.dtInstance = {};

    ctrl.defaultDtOptions = {
      autoWidth: false,
      order: [[1, "asc"]],
      dom: "t",
      select: {
        selector: 'td:first-child input[type="checkbox"]',
        style: 'multi'
      }
    };

    ctrl.defaultConfig = {
      selectionMatchProp: 'uuid',
      onCheckBoxChange: null
    };

    ctrl.$onInit = function () {
      ctrl.updateAll();
    };

    ctrl.updateAll = function () {
      var col, props = "";

      if (angular.isDefined(ctrl.dtOptions.displayLength)) {
        ctrl.dtOptions.displayLength = Number(ctrl.dtOptions.displayLength);
      }

      // Need to deep watch changes in dtOptions
      prevDtOptions = angular.copy(ctrl.dtOptions);

      // Setting bound variables to new variables loses it's one way binding
      //   ctrl.dtOptions = pfUtils.merge(ctrl.defaultDtOptions, ctrl.dtOptions);
      //   ctrl.config = pfUtils.merge(ctrl.defaultConfig, ctrl.config);

      // Instead, use _.defaults to update the existing variable
      _.defaults(ctrl.dtOptions, ctrl.defaultDtOptions);
      _.defaults(ctrl.config, ctrl.defaultConfig);
      // may need to use _.defaultsDeep, but not currently available in
      // lodash-amd a-pf is using

      if (!validSelectionMatchProp()) {
        angular.forEach(ctrl.colummns, function (col) {
          if (props.length === 0) {
            props = col.colItemFld;
          } else {
            props += ", " + col.colItemFld;
          }
        });
        throw new Error("pfTableView - " +
          "config.selectionMatchProp '" + ctrl.config.selectionMatchProp +
          "' does not match any property in 'config.colummns'! Please set config.selectionMatchProp " +
          "to one of these properties: " + props);
      }

      setColumnDefs();
    };

    ctrl.$onChanges = function (changesObj) {
      ctrl.updateAll();
    };

    ctrl.$doCheck = function () {
      // do a deep compare on data
      if (!angular.equals(ctrl.dtOptions, prevDtOptions)) {
        ctrl.updateAll();
      }
    };

    ctrl.dtInstanceCallback = function (_dtInstance) {
      var oTable, rows;

      ctrl.dtInstance = _dtInstance;
      listenForDraw();
      selectRowsByChecked();
    };

    function validSelectionMatchProp () {
      var retVal = false, prop;
      var item = ctrl.items[0];
      for (prop in item) {
        if (item.hasOwnProperty(prop)) {   //need this 'if' for eslint
          if (ctrl.config.selectionMatchProp === prop) {
            retVal = true;
          }
        }
      }
      return retVal;
    }

    function setColumnDefs () {
      var i = 0, actnBtns = 1;
      var item, prop;

      // add checkbox col, not sortable
      ctrl.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(i++).notSortable() ];
      // add column def. for each property of an item
      item = ctrl.items[0];
      for (prop in item) {
        if (item.hasOwnProperty(prop)) {   //need this 'if' for eslint
          ctrl.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i++));
          // Determine selectionMatchProp column number
          if (ctrl.config.selectionMatchProp === prop) {
            ctrl.selectionMatchPropColNum = (i - 1);
          }
        }
      }
      // add actions col.
      if (ctrl.actionButtons && ctrl.actionButtons.length > 0) {
        for (actnBtns = 1; actnBtns <= ctrl.actionButtons.length; actnBtns++) {
          ctrl.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i++).notSortable());
        }
      }
      if (ctrl.menuActions && ctrl.menuActions.length > 0) {
        ctrl.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i++).notSortable());
      }
    }

    function listenForDraw () {
      var oTable;
      var dtInstance = ctrl.dtInstance;
      if (dtInstance && dtInstance.dataTable) {
        oTable = dtInstance.dataTable;
        ctrl.tableId = oTable[0].id;
        oTable.on('draw.dt', function () {
          $timeout(function () {
            selectRowsByChecked();
          });
        });
      }
    }

    /*
     *   Checkbox Selections
     */

    ctrl.toggleAll = function () {
      var item;
      var visibleRows = getVisibleRows();
      angular.forEach(visibleRows, function (row) {
        item = getItemFromRow(row);
        if (item.selected !== ctrl.selectAll) {
          item.selected = ctrl.selectAll;
          if (ctrl.config && ctrl.config.onCheckBoxChange) {
            ctrl.config.onCheckBoxChange(item);
          }
        }
      });
      $timeout(function () {
        selectRowsByChecked();
      });
    };

    ctrl.toggleOne = function (item) {
      if (ctrl.config && ctrl.config.onCheckBoxChange) {
        ctrl.config.onCheckBoxChange(item);
      }
      $timeout(function () {
        setSelectAllCheckbox();
      });
    };

    function getItemFromRow (matchPropValue) {
      var item, retVals;
      var filterObj = {};
      filterObj[ctrl.config.selectionMatchProp] = matchPropValue;
      retVals = $filter('filter')(ctrl.items, filterObj);

      if (retVals && retVals.length === 1) {
        item = retVals[0];
      }

      return item;
    }

    function selectRowsByChecked () {
      var oTable, rows, checked;
      oTable = ctrl.dtInstance.DataTable;

      // deselect all
      rows = oTable.rows();
      rows.deselect();

      // select those with checked checkboxes
      rows = oTable.rows( function ( idx, data, node ) {
        //         row      td     input type=checkbox
        checked = node.children[0].children[0].checked;
        return checked;
      });
      rows.select();

      setSelectAllCheckbox();
    }

    function setSelectAllCheckbox () {
      var numVisibleRows = getVisibleRows().length;
      var numCheckedRows = document.querySelectorAll("#" + ctrl.tableId + " tbody tr.even.selected").length +
        document.querySelectorAll("#" + ctrl.tableId + " tbody tr.odd.selected").length;
      // set selectAll checkbox
      ctrl.selectAll = (numVisibleRows === numCheckedRows);
    }

    function getVisibleRows () {
      // Returns an array of visible 'selectionMatchProp' values
      // Ex. if selectionMatchProp === 'name' & selectionMatchPropColNum === 1 &
      //        page length === 3
      //     returns ['Mary Jane', 'Fred Flinstone', 'Frank Livingston']
      //
      var i, rowData, visibleRows = new Array();
      var oTable = ctrl.dtInstance.dataTable;

      var anNodes = document.querySelectorAll("#" + ctrl.tableId + "  tbody tr");
      for (i = 0; i < anNodes.length; ++i) {
        rowData = oTable.fnGetData(anNodes[i]);
        visibleRows.push( rowData[ ctrl.selectionMatchPropColNum ] );
      }

      return visibleRows;
    }

    /*
     *   Action Buttons and Menus
     */

    ctrl.handleButtonAction = function (action, item) {
      if (action && action.actionFn) {
        action.actionFn(action, item);
      }
    };

    ctrl.isColItemFld = function (key) {
      var retVal = false;
      var tableCol = $filter('filter')(ctrl.colummns, {colItemFld: key});

      if (tableCol && tableCol.length === 1) {
        retVal = true;
      }

      return retVal;
    };

    ctrl.areActions = function () {
      return (ctrl.actionButtons && ctrl.actionButtons.length > 0) ||
        (ctrl.menuActions && ctrl.menuActions.length > 0);
    };

    ctrl.calcActionsColspan = function () {
      var colspan = 0;

      if (ctrl.actionButtons && ctrl.actionButtons.length > 0) {
        colspan += ctrl.actionButtons.length;
      }

      if (ctrl.menuActions && ctrl.menuActions.length > 0) {
        colspan += 1;
      }

      return colspan;
    };

    ctrl.handleMenuAction = function (action, item) {
      if (!ctrl.checkDisabled(item) && action && action.actionFn && (action.isDisabled !== true)) {
        action.actionFn(action, item);
      }
    };

    ctrl.setupActions = function (item, event) {
      /* Ignore disabled items completely
       if (ctrl.checkDisabled(item)) {
       return;
       }*/

      // update the actions based on the current item
      // $scope.updateActions(item);

      $timeout(function () {
        var parentDiv = undefined;
        var nextElement;

        nextElement = event.target;
        while (nextElement && !parentDiv) {
          if (nextElement.className.indexOf('dropdown-kebab-pf') !== -1) {
            parentDiv = nextElement;
            if (nextElement.className.indexOf('open') !== -1) {
              setDropMenuLocation (parentDiv);
            }
          }
          nextElement = nextElement.parentElement;
        }
      });
    };

    ctrl.checkDisabled = function (item) {
      return false;
    };

    function setDropMenuLocation (parentDiv) {
      var dropButton = parentDiv.querySelector('.dropdown-toggle');
      var dropMenu =  parentDiv.querySelector('.dropdown-menu');
      var parentRect = $element[0].getBoundingClientRect();
      var buttonRect = dropButton.getBoundingClientRect();
      var menuRect = dropMenu.getBoundingClientRect();
      var menuTop = buttonRect.top - menuRect.height;
      var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;

      if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
        ctrl.dropdownClass = 'dropdown';
      } else {
        ctrl.dropdownClass = 'dropup';
      }
    }
  }
});
