function wizardButtonDirective (action) {
  'use strict';

  angular.module('patternfly.wizard')
    .directive(action, function () {
      return {
        restrict: 'A',
        require: '^pf-wizard',
        scope: {
          callback: "=?"
        },
        link: function ($scope, $element, $attrs, wizard) {
          $element.on("click", function (e) {
            e.preventDefault();
            $scope.$apply(function () {
              // scope apply in button module
              $scope.$eval($attrs[action]);
              wizard[action.replace("pfWiz", "").toLowerCase()]($scope.callback);
            });
          });
        }
      };
    });
}

wizardButtonDirective('pfWizNext');
wizardButtonDirective('pfWizPrevious');
wizardButtonDirective('pfWizFinish');
wizardButtonDirective('pfWizCancel');
wizardButtonDirective('pfWizReset');
