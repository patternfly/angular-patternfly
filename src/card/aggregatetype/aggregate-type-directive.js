angular.module( 'patternfly.card' ).directive('pfAggregateTypeCard', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      types: '='
    },
    templateUrl: 'card/aggregatetype/aggregate-type.html'
  };
});
