angular.module( 'patternfly.charts' ).directive('pfAggregateTypeCard', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      types: '='
    },
    templateUrl: 'modules/app/directives/aggregatetype/aggregate-type.html'
  };
});
