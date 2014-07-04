'use strict';
/**
 * @ngdoc directive
 * @name patternfly.button:pfButtonClear
 * @element button
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
 <example module="patternfly.buttons">

 <file name="index.html">
 <div ng-controller="ButtonDemoCtrl">
  <form>
    <pre>{{text}}</pre>
    <button pf-btn-clear="clearMe()">Clear</button>
  </form>
 </div>
 </file>

 <file name="script.js">
 function ButtonDemoCtrl($scope) {
    $scope.text = 'The text visible before clicking on the clear button.';

    $scope.clearMe = function() {
      $scope.text = 'Clear button clicked.';
    };
  }
 </file>

 </example>
 */
angular.module('patternfly.buttons', []).directive('pfBtnClear', function () {
  return {
    scope: {
      pfBtnClear: '&'
    },
    restrict: 'A',
    link: function (scope, elem) {
      elem.addClass('btn btn-default btn-lg');
      elem.attr('type','button');
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.pfBtnClear();
        });
      });
    }
  };
});