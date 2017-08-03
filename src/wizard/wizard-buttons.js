(function () {
  'use strict';

  var findWizard = function (scope) {
    var wizard;

    if (scope) {
      if (angular.isDefined(scope.wizard)) {
        wizard = scope.wizard;
      } else {
        wizard = findWizard(scope.$parent);
      }
    }

    return wizard;
  };

  var setupCallback = function (scope, button, fnName, callback) {
    button.on("click", function (e) {
      e.preventDefault();
      scope.$apply(function () {
        // scope apply in button module
        scope.wizard[fnName](callback);
      });
    });
  };

  angular.module('patternfly.wizard').component('pfWizNext', {
    bindings: {
      callback: "=?"
    },
    controller: function ($element, $scope) {
      var ctrl = this;

      ctrl.$onInit = function () {
        $scope.wizard = findWizard($scope);
      };

      ctrl.$postLink = function () {
        setupCallback($scope, $element, 'next', ctrl.callback);
      };
    }
  });

  angular.module('patternfly.wizard').component('pfWizPrevious', {
    bindings: {
      callback: "=?"
    },
    controller: function ($element, $scope) {
      var ctrl = this;

      ctrl.$onInit = function () {
        $scope.wizard = findWizard($scope);
      };

      ctrl.$postLink = function () {
        setupCallback($scope, $element, 'previous', ctrl.callback);
      };
    }
  });

  angular.module('patternfly.wizard').component('pfWizFinish', {
    bindings: {
      callback: "=?"
    },
    controller: function ($element, $scope) {
      var ctrl = this;

      ctrl.$onInit = function () {
        $scope.wizard = findWizard($scope);
      };

      ctrl.$postLink = function () {
        setupCallback($scope, $element, 'finish', ctrl.callback);
      };
    }
  });

  angular.module('patternfly.wizard').component('pfWizCancel', {
    bindings: {
      callback: "=?"
    },
    controller: function ($element, $scope) {
      var ctrl = this;

      ctrl.$onInit = function () {
        $scope.wizard = findWizard($scope);
      };

      ctrl.$postLink = function () {
        setupCallback($scope, $element, 'cancel', ctrl.callback);
      };
    }
  });

  angular.module('patternfly.wizard').component('pfWizReset', {
    bindings: {
      callback: "=?"
    },
    controller: function ($element, $scope) {
      var ctrl = this;

      ctrl.$onInit = function () {
        $scope.wizard = findWizard($scope);
      };

      ctrl.$postLink = function () {
        setupCallback($scope, $element, 'reset', ctrl.callback);
      };
    }
  });
})();
