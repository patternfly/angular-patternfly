angular.module('patternfly.bulkselection').component('pfBulkSelection', {

  bindings: {
    totalRecords: '=',
    selectedRecordCount: '=',
    updateSelectionFn: '<'
  },
  templateUrl: 'bulkselection/bulkselection.html',
  controller: function () {
    'use strict';

    var ctrl = this;
    var BULKSELECTION_NONE = 'none';
    var BULKSELECTION_ALL = 'all';
    var BULKSELECTION_PARTIAL = 'partial';
    ctrl.menuIsOpen = false;

    ctrl.$onInit = function () {
      ctrl.setBulkSelectionState(BULKSELECTION_NONE);
    };
    ctrl.updateBulkSelection = function (bulkSelectAction) {
      ctrl.menuIsOpen = false;
      ctrl.setBulkSelectionState (bulkSelectAction);
      ctrl.updateSelectionFn(ctrl.bulkSelection);
    };
    ctrl.toggleBulkSelection = function () {
      if (ctrl.selectedRecordCount > 0 || ctrl.bulkSelection === BULKSELECTION_ALL) {
        ctrl.updateBulkSelection(BULKSELECTION_NONE);
      } else {
        ctrl.updateBulkSelection(BULKSELECTION_ALL);
      }
    };
    ctrl.setBulkSelectionState = function(state) {
      ctrl.bulkSelection = state;
      switch (state) {
      case BULKSELECTION_NONE:
        ctrl.menuClass = 'fa-square-o';
        break;
      case BULKSELECTION_ALL:
        ctrl.menuClass = 'fa-check-square all-selected';
        break;
      case BULKSELECTION_PARTIAL:
        ctrl.menuClass = 'fa-minus-square-o partially-selected';
        break;
      }
    };
    ctrl.$doCheck = function () {
      var recordsSelectedCount = ctrl.totalRecords - ctrl.selectedRecordCount;
      if (ctrl.selectedRecordCount === 0) {
        ctrl.setBulkSelectionState(BULKSELECTION_NONE);
      }
      if (recordsSelectedCount > 0 && ctrl.selectedRecordCount > 0 ) {
        ctrl.setBulkSelectionState(BULKSELECTION_PARTIAL);
      } else if (recordsSelectedCount === 0) {
        ctrl.setBulkSelectionState(BULKSELECTION_ALL);
      }
    };
  }
});
