(function () {
  'use strict';

  angular.module('patternfly.canvas')
    .component('nodeToolbar', {
      templateUrl: 'canvas-view/canvas/node-toolbar.html',
      bindings: {
        node: '=',
        nodeActions: '=',
        nodeClickHandler: '<',
        nodeCloseHandler: '<'
      },
      controller: function NodeToolbarController ($scope) {
        var ctrl = this;
        ctrl.selectedAction = 'none';

        ctrl.actionIconClicked = function (action) {
          ctrl.selectedAction = action;
          $scope.$emit('nodeActionClicked', {'action': action, 'node': ctrl.node});
          if (angular.isFunction(ctrl.nodeClickHandler)) {
            ctrl.nodeClickHandler(action, ctrl.node);
          }
        };

        ctrl.close = function () {
          ctrl.selectedAction = 'none';
          $scope.$emit('nodeActionClosed');
          if (angular.isFunction(ctrl.nodeCloseHandler)) {
            ctrl.nodeCloseHandler();
          }
        };
      }
    });
})();
