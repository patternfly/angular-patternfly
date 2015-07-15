angular.module( 'patternfly.card' ).directive('pfObjStatus', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      objectType: '=type',
      url: '='
    },
    templateUrl: 'card/objectstatus/object-status-tile.html'
  };
});
