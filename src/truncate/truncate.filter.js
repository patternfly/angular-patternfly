angular.module('patternfly.truncate').filter('truncate', function() {

  return function truncate(str, charLimit, useWordBoundary, newlineLimit, removeExtraChars) {
    'use strict';

    if(typeof str !== 'string' || typeof charLimit !== 'number') {
      return str;
    }

    var truncated = str;
    var limiter = charLimit;
    var removedCharsLength = charLimit - (removeExtraChars || 0);

    if (newlineLimit && truncated.length > limiter) {
      var nthNewline = str.split('\n', newlineLimit).join('\n').length;
      truncated = truncated.substring(0, nthNewline);
    }

    if (truncated.length > limiter) {
      if (useWordBoundary) {
        var tmpLimiter = truncated.lastIndexOf(' ', limiter);

        if (tmpLimiter > 0) {
          limiter = tmpLimiter;
        }
      }
      truncated = truncated.substring(0, limiter);
    }

    if (removeExtraChars && truncated.length >= removedCharsLength) {
      truncated = truncate(truncated, removedCharsLength, useWordBoundary);
    }

    return truncated;
  };
});

