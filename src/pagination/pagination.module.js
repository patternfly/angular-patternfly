/**
 * @name  patternfly pagination
 *
 * @description
 *   Pagination module for patternfly.
 *
 */
angular.module('patternfly.pagination', ['ui.bootstrap'])
  .filter('startFrom', function () {
    'use strict';
    return function (input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });
