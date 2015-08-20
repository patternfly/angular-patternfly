/**
 * @ngdoc directive
 * @name patternfly.card:pfCard
 * @restrict A
 * @element ANY
 * @param {headTitle=} Title for the card - required
 * @param {subtTtle=} Subtitle for the card - optional
 * @param {showTopBorder=} Show Top Border, true shows top border, false (default) hides top border - optional
 *
 * @description
 * Directive for easily displaying a card with html content
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
    <div pf-card head-title="My Card Title" sub-title="My card subtitle" show-top-border="true">
      <button>Click Me</button>
    </div>
 </file>

 </example>
 */
angular.module('patternfly.card').directive('pfCard', function () {
  'use strict';

  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headTitle: '@',
      subTitle: '@',
      showTopBorder: '@'
    }
  };
});


