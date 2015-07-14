angular.module( 'patternfly.charts' ).directive('pfObjStatus', function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      objectType: '=type',
      url: '='
    },
    templateUrl: 'charts/objectstatus/object-status-tile.html'
  };
});
