/**
 * @ngdoc directive
 * @name patternfly.card:pfCard
 * @restrict A
 * @element ANY
 * @param {headtitle=} Title for the card - required
 * @param {subtitle=} Subtitle for the card - optional
 * @param {hidetopborder=} Hide Top Border, true hides top border, false (default) shows top border - optional
 *
 * @description
 * Directive for easily displaying a card with transcluded content
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
    <div pf-card headtitle="My Card Title" subtitle="My card subtitle" hidetopborder="false">Inner content goes here</div>
 </file>

 </example>
 */
angular.module('patternfly.card').directive('pfCard', function() {
  'use strict';
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headtitle: '@',
      subtitle: '@',
      hidetopborder: '@'
    },
    controller: ['$scope',
      function($scope) {
        $scope.getClasses = function() {
          if($scope.hidetopborder) {
            return $scope.hidetopborder.toString() === 'true' ? 'card-pf' : 'card-pf card-pf-accented';
          } else {
            return 'card-pf card-pf-accented';
          }
        };
      }]
  };
});
