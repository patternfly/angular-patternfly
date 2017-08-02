angular.module('patternfly.filters').component('pfFilterPanel', {
  bindings: {
    config: '='
  },
  transclude: true,
  templateUrl: 'filters/filter-panel/filter-panel.html',
  controller: function () {
    'use strict';

    var ctrl = this;
  }
});
