(function () {
  'use strict';

  angular.module('patternfly.canvas')
    .component('toolboxItems', {
      templateUrl: 'canvas-view/canvas-editor/toolbox-items.html',
      bindings: {
        items: '=',
        startDragCallback: '<',
        clickCallback: '<',
        searchText: '='
      },
      controller: function toolboxItemsController () {
        var ctrl = this;

        ctrl.itemClicked = function (item) {
          if (angular.isFunction(ctrl.clickCallback) && !item.disableInToolbox) {
            ctrl.clickCallback(item);
          }
        };

        ctrl.startItemDrag = function (event, ui, item) {
          if (angular.isFunction(ctrl.startDragCallback)) {
            ctrl.startDragCallback(event, ui, item);
          }
        };
      }
    });
})();
