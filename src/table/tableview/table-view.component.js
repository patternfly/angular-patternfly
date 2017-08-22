angular.module('patternfly.table').component('pfTableView', {
  bindings: {
    config: '<?',
    dtOptions: '<?',
    colummns: '<?',
    columns: '<?',
    items: '<',
    actionButtons: '<?',
    menuActions: '<?',
    pageConfig: '=?',
    emptyStateConfig: '=?',
    emptyStateActionButtons: '=?'
  },
  templateUrl: 'table/tableview/table-view.html',
  controller: function (DTOptionsBuilder, DTColumnDefBuilder, $element, pfUtils, $log, $filter, $timeout, $sce) {
    'use strict';
    var ctrl = this, prevDtOptions, prevItems, prevPageConfig;

    // Once datatables is out of active development I'll remove log statements
    ctrl.debug = false;

    ctrl.selectAll = false;
    ctrl.dtInstance = {};

    ctrl.defaultDtOptions = {
      autoWidth: false,
      destroy: true,
      order: [[1, "asc"]],
      dom: "t",
      paging: false,
      select: {
        selector: 'td:first-child input[type="checkbox"]',
        style: 'multi'
      }
    };

    ctrl.defaultConfig = {
      selectionMatchProp: 'uuid',
      onCheckBoxChange: null,
      showCheckboxes: true
    };

    function setPagination () {
      if (angular.isUndefined(ctrl.dtOptions)) {
        ctrl.dtOptions = {};
      } else {
        // Switch dtOption pagination properties to new pagination schema
        if (angular.isDefined(ctrl.dtOptions.paginationType)) {
          ctrl.dtOptions.paging = true;
          if (angular.isUndefined(ctrl.pageConfig)) {
            ctrl.pageConfig = {};
          }
          if (!angular.isNumber(ctrl.pageConfig.pageNumber)) {
            ctrl.pageConfig.pageNumber = 1;
          }
        }
        if (angular.isNumber(ctrl.dtOptions.displayLength)) {
          ctrl.dtOptions.paging = true;
          if (angular.isUndefined(ctrl.pageConfig)) {
            ctrl.pageConfig = {};
          }
          if (!angular.isNumber(ctrl.pageConfig.pageSize)) {
            ctrl.pageConfig.pageSize = ctrl.dtOptions.displayLength;
          }
        }
        if (angular.isDefined(ctrl.dtOptions.dom)) {
          if (ctrl.dtOptions.dom.indexOf("p") !== -1) {
            // No longer show angular-datatables pagination controls
            ctrl.dtOptions.dom = ctrl.dtOptions.dom.replace(/p/gi, "");
          }
        }
      }

      // Use new paging schema to set dtOptions paging properties
      if (angular.isDefined(ctrl.pageConfig)) {
        ctrl.dtOptions.paging = true;
        ctrl.pageConfig.numTotalItems = ctrl.items.length;
        if (angular.isUndefined(ctrl.pageConfig.pageSize)) {
          ctrl.pageConfig.pageSize = 10;
        }
        ctrl.dtOptions.displayLength = ctrl.pageConfig.pageSize;
        if (angular.isUndefined(ctrl.pageConfig.pageNumber)) {
          ctrl.pageConfig.pageNumber = 1;
        }
      }
    }

    ctrl.$onInit = function () {

      if (ctrl.debug) {
        $log.debug("$onInit");
      }

      if (angular.isDefined(ctrl.colummns) && angular.isUndefined(ctrl.columns)) {
        ctrl.columns = ctrl.colummns;
      }

      if (angular.isUndefined(ctrl.config)) {
        ctrl.config = {};
      }

      ctrl.updateConfigOptions();

      setColumnDefs();
    };

    ctrl.updateConfigOptions = function () {
      var props = "";

      if (ctrl.debug) {
        $log.debug("  updateConfigOptions");
      }

      setPagination();

      if (angular.isDefined(ctrl.dtOptions) && angular.isDefined(ctrl.dtOptions.displayLength)) {
        ctrl.dtOptions.displayLength = Number(ctrl.dtOptions.displayLength);
      }

      // Need to deep watch changes in dtOptions and items
      prevDtOptions = angular.copy(ctrl.dtOptions);
      prevItems = angular.copy(ctrl.items);
      prevPageConfig = angular.copy(ctrl.pageConfig);

      // Setting bound variables to new variables loses it's one way binding
      //   ctrl.dtOptions = pfUtils.merge(ctrl.defaultDtOptions, ctrl.dtOptions);
      //   ctrl.config = pfUtils.merge(ctrl.defaultConfig, ctrl.config);

      // Instead, use _.defaults to update the existing variable
      _.defaults(ctrl.dtOptions, ctrl.defaultDtOptions);
      _.defaults(ctrl.config, ctrl.defaultConfig);
      // may need to use _.defaultsDeep, but not currently available in
      // lodash-amd a-pf is using

      if (!validSelectionMatchProp()) {
        angular.forEach(ctrl.columns, function (col) {
          if (props.length === 0) {
            props = col.itemField;
          } else {
            props += ", " + col.itemField;
          }
        });
        throw new Error("pfTableView - " +
          "config.selectionMatchProp '" + ctrl.config.selectionMatchProp +
          "' does not match any property in 'config.columns'! Please set config.selectionMatchProp " +
          "to one of these properties: " + props);
      }
    };

    ctrl.dtInstanceCallback = function (_dtInstance) {
      if (ctrl.debug) {
        $log.debug("--> dtInstanceCallback");
      }

      ctrl.dtInstance = _dtInstance;
      listenForDraw();
      selectRowsByChecked();
    };

    ctrl.$onChanges = function (changesObj) {
      if (ctrl.debug) {
        $log.debug("$onChanges");
      }
      if ((changesObj.config && !changesObj.config.isFirstChange()) ) {
        if (ctrl.debug) {
          $log.debug("...updateConfigOptions");
        }
        ctrl.updateConfigOptions();
      }
      if (changesObj.items && changesObj.items.currentValue) {
        ctrl.config.itemsAvailable = changesObj.items.currentValue.length > 0;
      }
    };

    ctrl.updatePageSize = function (event) {
      ctrl.pageConfig.pageSize = event.pageSize;
      ctrl.dtOptions.displayLength = ctrl.pageConfig.pageSize;
      ctrl.pageConfig.pageNumber = 1;    // goto first page after pageSize/displayLength change
    };

    ctrl.updatePageNumber = function (event) {
      if (ctrl.dtInstance) {
        ctrl.pageConfig.pageNumber = event.pageNumber;
        if (ctrl.dtInstance && ctrl.dtInstance.dataTable) {
          ctrl.dtInstance.dataTable.fnPageChange(ctrl.pageConfig.pageNumber - 1);
        }
      }
    };

    ctrl.$doCheck = function () {
      if (ctrl.debug) {
        $log.debug("$doCheck");
      }
      // do a deep compare on dtOptions and items
      if (!angular.equals(ctrl.dtOptions, prevDtOptions) ||
          !angular.equals(ctrl.pageConfig, prevPageConfig)) {
        if (ctrl.debug) {
          $log.debug("  dtOptions !== prevDtOptions");
        }
        ctrl.updateConfigOptions();
      }
      if (!angular.equals(ctrl.items, prevItems)) {
        if (ctrl.debug) {
          $log.debug("  items !== prevItems");
        }
        if (ctrl.items) {
          ctrl.config.itemsAvailable = ctrl.items.length > 0;
        }
        if (angular.isDefined(ctrl.pageConfig) && angular.isDefined(ctrl.pageConfig.numTotalItems)) {
          ctrl.pageConfig.numTotalItems = ctrl.items.length;
        }
        prevItems = angular.copy(ctrl.items);
      }
    };

    ctrl.$postLink = function () {
      if (ctrl.debug) {
        $log.debug(" $postLink");
      }
    };

    ctrl.$onDestroy = function () {
      if (ctrl.debug) {
        $log.debug(" $onDestroy");
      }
      ctrl.dtInstance = {};
    };

    function setColumnDefs () {
      var i = 0, actnBtns = 1;
      var offset;
      ctrl.dtColumnDefs = [];

      // add checkbox col, not sortable
      if (ctrl.config.showCheckboxes) {
        ctrl.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i++).notSortable());
      }

      // add column definitions
      _.forEach(ctrl.columns, function (column) {
        ctrl.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i++));
      });

      // Determine selectionMatchProp column number (add offset due to the checkbox column)
      offset = ctrl.config.showCheckboxes ? 1 : 0;
      ctrl.selectionMatchPropColNum = _.findIndex(ctrl.columns, ['itemField', ctrl.config.selectionMatchProp]) + offset;

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
        if (angular.isDefined(ctrl.pageConfig) && angular.isDefined(ctrl.pageConfig.pageNumber)) {
          oTable.fnPageChange(ctrl.pageConfig.pageNumber - 1);
        }
        ctrl.tableId = oTable[0].id;
        oTable.off('draw.dt');
        oTable.on('draw.dt', function () {
          if (ctrl.debug) {
            $log.debug("--> redraw");
          }
          selectRowsByChecked();
        });
      }
    }

    function validSelectionMatchProp () {
      return _.find(ctrl.columns, ['itemField', ctrl.config.selectionMatchProp]) !== undefined;
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
      selectRowsByChecked();
    };

    ctrl.toggleOne = function (item) {
      if (ctrl.config && ctrl.config.onCheckBoxChange) {
        ctrl.config.onCheckBoxChange(item);
      }
    };

    function getItemFromRow (matchPropValue) {
      return _.find(ctrl.items, function (item) {
        return _.toString(item[ctrl.config.selectionMatchProp]) === _.toString(matchPropValue);
      });
    }

    function selectRowsByChecked () {
      if (ctrl.config.showCheckboxes) {
        $timeout(function () {
          var oTable, rows, checked;

          oTable = ctrl.dtInstance.DataTable;

          if (ctrl.debug) {
            $log.debug("  selectRowsByChecked");
          }

          if (angular.isUndefined(oTable)) {
            return;
          }

          if (ctrl.debug) {
            $log.debug("  ...oTable defined");
          }

          // deselect all
          rows = oTable.rows();
          rows.deselect();

          // select those with checked checkboxes
          rows = oTable.rows( function ( idx, data, node ) {
            //         row      td     input type=checkbox
            checked = node.children[0].children[0].checked;
            return checked;
          });

          if (ctrl.debug) {
            $log.debug("   ... #checkedRows = " + rows[0].length);
          }

          if (rows[0].length > 0) {
            rows.select();
          }
          setSelectAllCheckbox();
        });
      }
    }

    function setSelectAllCheckbox () {
      var numVisibleRows, numCheckedRows;

      if (ctrl.debug) {
        $log.debug("  setSelectAllCheckbox");
      }

      numVisibleRows = getVisibleRows().length;
      numCheckedRows = document.querySelectorAll("#" + ctrl.tableId + " tbody tr.even.selected").length +
                       document.querySelectorAll("#" + ctrl.tableId + " tbody tr.odd.selected").length;
      ctrl.selectAll = (numVisibleRows === numCheckedRows);
    }

    function getVisibleRows () {
      // Returns an array of visible 'selectionMatchProp' values
      // Ex. if selectionMatchProp === 'name' & selectionMatchPropColNum === 1 &
      //        page length === 3
      //     returns ['Mary Jane', 'Fred Flinstone', 'Frank Livingston']
      //
      var i, rowData, visibleRows = new Array();

      var anNodes = document.querySelectorAll("#" + ctrl.tableId + "  tbody tr");

      for (i = 0; i < anNodes.length; ++i) {
        rowData = anNodes[i].cells;
        if (rowData !== null) {
          visibleRows.push(_.trim(rowData[ctrl.selectionMatchPropColNum].innerText));
        }
      }

      if (ctrl.debug) {
        $log.debug("    getVisibleRows (" + visibleRows.length + ")");
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

    ctrl.handleColAction = function (key, value) {
      var tableCol = $filter('filter')(ctrl.columns, {itemField: key});

      if (tableCol && tableCol.length === 1 && tableCol[0].hasOwnProperty('colActionFn')) {
        tableCol[0].colActionFn(value);
      }
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

    ctrl.checkDisabled = function () {
      //TODO: implement checkDisabled
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

    ctrl.trustAsHtml = function (html) {
      return $sce.trustAsHtml(html);
    };
  }
});
