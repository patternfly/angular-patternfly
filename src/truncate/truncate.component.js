angular.module('patternfly.truncate').component('pfTruncate', {

  bindings: {
    content: '<',
    limit: '<',
    useWordBoundary: '<',
    newlineLimit: '<',
    removeExtraChars: '<',
    expandCopy: '<',
    collapseCopy: '<',
    // When expandable is on, optionally hide the collapse link so text can only be expanded. (Used for toast notifications.)
    expandable: '<',
    //hideCollapse: '<',
    // optional keywords to highlight using the `highlightKeywords` filter
    keywords: '<',
    prettifyJson: '<'
  },
  templateUrl: 'truncate/truncate.html',
  controller: function ($filter) {
    'use strict';

    var ctrl = this;

    ctrl.expanded = false;
    ctrl.truncatedContent = $filter('truncate')(ctrl.content, ctrl.limit, ctrl.useWordBoundary, ctrl.newlineLimit, (ctrl.removeExtraChars||10));
    ctrl.truncated = ctrl.truncatedContent.length !== ctrl.content.length;
  }
});
