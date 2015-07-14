angular.module( 'patternfly.charts' ).directive('pfAggregateTypeCard', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      types: '='
    },
    templateUrl: 'charts/aggregatetype/aggregate-type.html'
  };
});
