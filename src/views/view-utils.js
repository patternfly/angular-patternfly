(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name patternfly.views.pfViewUtils
   * @description
   * A utility constant to return view objects used for Dashboard, Card, Table, List, and Topology view switcher types.
   * @example
   * <pre>
   * $scope.viewsConfig = {
   *   views: [pfViewUtils.getListView(), pfViewUtils.getCardView(), pfViewUtils.getTableView()]
   * };
   * </pre>
   * Each getXxxxView() returns an object:
   * <ul style='list-style-type: none'>
   *    <li>.id - (String) Unique id for the view, used for comparisons
   *    <li>.title - (String) Optional title, uses as a tooltip for the view selector
   *    <li>.iconClass - (String) Icon class to use for the view selector
   * </ul>
   * Please see {@link patternfly.toolbars.directive:pfToolbar pfToolbar} for use in Toolbar View Switcher
   */
  angular.module('patternfly.views').constant('pfViewUtils', {
    getDashboardView: function (title) {
      return {
        id: 'dashboardView',
        title: title || 'Dashboard View',
        iconClass: 'fa fa-dashboard'
      };
    },
    getCardView: function (title) {
      return {
        id: 'cardView',
        title: title || 'Card View',
        iconClass: 'fa fa-th'
      };
    },
    getListView: function (title) {
      return {
        id: 'listView',
        title: title || 'List View',
        iconClass: 'fa fa-th-list'
      };
    },
    getTableView: function (title) {
      return {
        id: 'tableView',
        title: title || 'Table View',
        iconClass: 'fa fa-table'
      };
    },
    getTopologyView: function (title) {
      return {
        id: 'topologyView',
        title: title || 'Topology View',
        iconClass: 'fa fa-sitemap'
      };
    }
  });
})();
