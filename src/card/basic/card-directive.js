/**
 * @ngdoc directive
 * @name patternfly.card:pfCard
 * @restrict A
 * @element ANY
 * @param {headtitle=} Title for the card - required
 * @param {subtitle=} Subtitle for the card - optional
 *
 * @description
 * Directive for easiliy displaying a html with transcluded content
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
    <div pf-card headtitle="My Card Title" subtitle="My card subtitle">Inner content goes here</div>
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
      subtitle: '@'
    }
  };
});
