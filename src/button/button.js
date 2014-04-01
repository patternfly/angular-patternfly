/**
 * @ngdoc directive
 * @name patternfly.button:loButtonClear
 * @element button
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
 <example module="patternfly.button">

 <file name="index.html">
 <div ng-controller="ButtonDemoCtrl">
  <form>
    <button lo-button-clear="clearMe()">Clear</button>
    <pre>{{text}}</pre>
  </form>
 </div>
 </file>

 <file name="script.js">
 function ButtonDemoCtrl($scope) {
    $scope.text = 'Text before clear.';

    $scope.clearMe = function() {
      $scope.text = '';
    };
  }
 </file>

 </example>
 */
angular.module('patternfly.button', []).directive('loButtonClear', function () {
  return {
    scope: {
      loButtonClear: '&'
    },
    restrict: 'A',
    link: function (scope, elem) {
      elem.addClass('btn btn-default btn-lg');
      elem.attr('type','button');
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.loButtonClear();
        });
      });
    }
  };
});