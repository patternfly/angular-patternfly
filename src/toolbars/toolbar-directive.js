/**
 * @ngdoc directive
 * @name patternfly.toolbars.directive:pfToolbar
 *
 * @description
 *   Directive for standard toolbar. Includes filtering and view selection capabilities
 *   <br><br>
 *
 * @param {object} config configuration settings for the toolbar:<br/>
 *   <ul style='list-style-type: none'>
 *     <li>.filterConfig  - (Object) Optional filter config. If undefined, no filtering capabilities are shown.
 *                          See pfSimpleFilter for filter config options.
 *     <li>.sortConfig  - (Object) Optional sort config. If undefined, no sort capabilities are shown.
 *                          See pfSort for sort config options.
 *     <li>.viewsConfig  - (Object) Optional configuration settings for view type selection
 *       <ul style='list-style-type: none'>
 *         <li>.views       - (Array) List of available views for selection. See pfViewUtils for standard available views
 *           <ul style='list-style-type: none'>
 *             <li>.id - (String) Unique id for the view, used for comparisons
 *             <li>.title - (String) Optional title, uses as a tooltip for the view selector
 *             <li>.iconClass - (String) Icon class to use for the view selector
 *           </ul>
 *         <li>.onViewSelect - ( function(view) ) Function to call when a view is selected
 *         <li>.currentView - the id of the currently selected view
 *       </ul>
 *     <li>.actionsConfig  - (Object) Optional configuration settings for toolbar actions
 *       <ul style='list-style-type: none'>
 *         <li>.primaryActions  - (Array) List of primary actions to display on the toolbar
 *           <ul style='list-style-type: none'>
 *             <li>.name - (String) The name of the action, displayed on the button
 *             <li>.title - (String) Optional title, used for the tooltip
 *             <li>.actionFn - (function(action)) Function to invoke when the action selected
 *             <li>.isDisabled - (Boolean) set to true to disable the action
 *           </ul>
 *         <li>.moreActions  - (Array) List of secondary actions to display on the toolbar action pulldown menu
 *           <ul style='list-style-type: none'>
 *             <li>.name - (String) The name of the action, displayed on the button
 *             <li>.title - (String) Optional title, used for the tooltip
 *             <li>.actionFn - (function(action)) Function to invoke when the action selected
 *             <li>.isDisabled - (Boolean) set to true to disable the action
 *             <li>.isSeparator - (Boolean) set to true if this is a placehodler for a separator rather than an action
 *           </ul>
 *         <li>.actionsInclude  - (File) HTML file to include for application defined buttons
 *       </ul>
 *   </ul>
 *
 * @example
<example module="patternfly.toolbars" deps="patternfly.filters, patternfly.sort, patternfly.views">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <div pf-toolbar id="exampleToolbar" config="toolbarConfig"></div>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12 list-view-container" ng-if="viewType == 'listView'">
        <div pf-list-view config="listConfig" items="items">
          <div class="list-view-pf-description">
            <div class="list-group-item-heading">
              {{item.name}}
            </div>
            <div class="list-group-item-text">
              {{item.address}}
            </div>
          </div>
          <div class="list-view-pf-additional-info">
            <div class="list-view-pf-additional-info-item">
              {{item.age}}
            </div>
            <div class="list-view-pf-additional-info-item">
              {{item.birthMonth}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 card-view-container" ng-if="viewType == 'cardView'">
        <div pf-card-view config="vm.listConfig" items="items">
          <div class="col-md-12">
            <span>{{item.name}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.address}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.birthMonth}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <label class="events-label">Current Filters: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="5" class="col-md-12">{{filtersText}}</textarea>
      </div>
      <div class="col-md-12">
        <label class="actions-label">Actions: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="3" class="col-md-12">{{actionsText}}</textarea>
      </div>
    </div>
  </file>
  <file name="example-actions.html">
    <div class="dropdown primary-action">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Dropdown
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu " aria-labelledby="dropdownMenu1">
        <li role="presentation"><a role="menuitem" tabindex="-1">Action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1">Another action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1">Something else here</a></li>
        <li role="presentation" class="divider"></li>
        <li role="presentation" class="disabled"><a role="menuitem" tabindex="-1">Disabled link</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1">Separated link</a></li>
      </ul>
    </div>
  </file>
  <file name="script.js">
  angular.module('patternfly.toolbars').controller('ViewCtrl', ['$scope', 'pfViewUtils',
    function ($scope, pfViewUtils) {
      $scope.filtersText = '';

      $scope.allItems = [
        {
          name: "Fred Flintstone",
          age: 57,
          address: "20 Dinosaur Way, Bedrock, Washingstone",
          birthMonth: 'February'
        },
        {
          name: "John Smith",
          age: 23,
          address: "415 East Main Street, Norfolk, Virginia",
          birthMonth: 'October'
        },
        {
          name: "Frank Livingston",
          age: 71,
          address: "234 Elm Street, Pittsburgh, Pennsylvania",
          birthMonth: 'March'
        },
        {
          name: "Judy Green",
          age: 21,
          address: "2 Apple Boulevard, Cincinatti, Ohio",
          birthMonth: 'December'
        },
        {
          name: "Pat Thomas",
          age: 19,
          address: "50 Second Street, New York, New York",
          birthMonth: 'February'
        }
      ];
      $scope.items = $scope.allItems;

      var matchesFilter = function (item, filter) {
        var match = true;

        if (filter.id === 'name') {
          match = item.name.match(filter.value) !== null;
        } else if (filter.id === 'age') {
          match = item.age === parseInt(filter.value);
        } else if (filter.id === 'address') {
          match = item.address.match(filter.value) !== null;
        } else if (filter.id === 'birthMonth') {
          match = item.birthMonth === filter.value;
        }
        return match;
      };

      var matchesFilters = function (item, filters) {
        var matches = true;

        filters.forEach(function(filter) {
          if (!matchesFilter(item, filter)) {
            matches = false;
            return false;
          }
        });
        return matches;
      };

      var applyFilters = function (filters) {
        $scope.items = [];
        if (filters && filters.length > 0) {
          $scope.allItems.forEach(function (item) {
            if (matchesFilters(item, filters)) {
              $scope.items.push(item);
            }
          });
        } else {
          $scope.items = $scope.allItems;
        }
      };

      var filterChange = function (filters) {
      $scope.filtersText = "";
        filters.forEach(function (filter) {
          $scope.filtersText += filter.title + " : " + filter.value + "\n";
        });
        applyFilters(filters);
        $scope.toolbarConfig.filterConfig.resultsCount = $scope.items.length;
      };

      $scope.filterConfig = {
        fields: [
          {
            id: 'name',
            title:  'Name',
            placeholder: 'Filter by Name...',
            filterType: 'text'
          },
          {
            id: 'age',
            title:  'Age',
            placeholder: 'Filter by Age...',
            filterType: 'text'
          },
          {
            id: 'address',
            title:  'Address',
            placeholder: 'Filter by Address...',
            filterType: 'text'
          },
          {
            id: 'birthMonth',
            title:  'Birth Month',
            placeholder: 'Filter by Birth Month...',
            filterType: 'select',
            filterValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          }
        ],
        resultsCount: $scope.items.length,
        appliedFilters: [],
        onFilterChange: filterChange
      };

      var viewSelected = function(viewId) {
        $scope.viewType = viewId
      };

      $scope.viewsConfig = {
        views: [pfViewUtils.getListView(), pfViewUtils.getCardView()],
        onViewSelect: viewSelected
      };
      $scope.viewsConfig.currentView = $scope.viewsConfig.views[0].id;
      $scope.viewType = $scope.viewsConfig.currentView;

      var monthVals = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
      };
      var compareFn = function(item1, item2) {
        var compValue = 0;
        if ($scope.sortConfig.currentField.id === 'name') {
          compValue = item1.name.localeCompare(item2.name);
        } else if ($scope.sortConfig.currentField.id === 'age') {
            compValue = item1.age - item2.age;
        } else if ($scope.sortConfig.currentField.id === 'address') {
          compValue = item1.address.localeCompare(item2.address);
        } else if ($scope.sortConfig.currentField.id === 'birthMonth') {
          compValue = monthVals[item1.birthMonth] - monthVals[item2.birthMonth];
        }

        if (!$scope.sortConfig.isAscending) {
          compValue = compValue * -1;
        }

        return compValue;
      };

      var sortChange = function (sortId, isAscending) {
        $scope.items.sort(compareFn);
      };

      $scope.sortConfig = {
        fields: [
          {
            id: 'name',
            title:  'Name',
            sortType: 'alpha'
          },
          {
            id: 'age',
            title:  'Age',
            sortType: 'numeric'
          },
          {
            id: 'address',
            title:  'Address',
            sortType: 'alpha'
          },
          {
            id: 'birthMonth',
            title:  'Birth Month',
            sortType: 'alpha'
          }
        ],
        onSortChange: sortChange
      };

      $scope.actionsText = "";
      var performAction = function (action) {
        $scope.actionsText = action.name + "\n" + $scope.actionsText;
      };

      $scope.actionsConfig = {
        actionsInclude: 'example-actions.html',
        primaryActions: [
          {
            name: 'Action 1',
            title: 'Do the first thing',
            actionFn: performAction
          },
          {
            name: 'Action 2',
            title: 'Do something else',
            actionFn: performAction
          }
        ],
        moreActions: [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ]
      };

      $scope.toolbarConfig = {
        viewsConfig: $scope.viewsConfig,
        filterConfig: $scope.filterConfig,
        sortConfig: $scope.sortConfig,
        actionsConfig: $scope.actionsConfig
      };

      $scope.listConfig = {
        selectionMatchProp: 'name',
        checkDisabled: false
      };
    }
  ]);
  </file>
</example>
 */
angular.module('patternfly.toolbars').directive('pfToolbar', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    replace: true,
    transclude: false,
    templateUrl: 'toolbars/toolbar.html',
    controller: function ($scope) {
      $scope.viewSelected = function (viewId) {
        $scope.config.viewsConfig.currentView = viewId;
        if ($scope.config.viewsConfig.onViewSelect && !$scope.checkViewDisabled(viewId)) {
          $scope.config.viewsConfig.onViewSelect(viewId);
        }
      };

      $scope.isViewSelected = function (viewId) {
        return $scope.config.viewsConfig && ($scope.config.viewsConfig.currentView === viewId);
      };

      $scope.checkViewDisabled = function (view) {
        return $scope.config.viewsConfig.checkViewDisabled && $scope.config.viewsConfig.checkViewDisabled(view);
      };

      $scope.filterExists = function (filter) {
        var foundFilter = _.findWhere($scope.config.filterConfig.appliedFilters, {title: filter.title, value: filter.value});
        return foundFilter !== undefined;
      };

      $scope.addFilter = function (field, value) {
        var newFilter = {
          id: field.id,
          title: field.title,
          value: value
        };
        if (!$scope.filterExists(newFilter)) {
          $scope.config.filterConfig.appliedFilters.push(newFilter);

          if ($scope.config.filterConfig.onFilterChange) {
            $scope.config.filterConfig.onFilterChange($scope.config.filterConfig.appliedFilters);
          }
        }
      };

      $scope.handleAction = function (action) {
        if (action && action.actionFn && (action.isDisabled !== true)) {
          action.actionFn(action);
        }
      };
    },

    link: function (scope, element, attrs) {
      scope.$watch('config', function () {
        if (scope.config && scope.config.viewsConfig && scope.config.viewsConfig.views) {
          scope.config.viewsConfig.viewsList = angular.copy(scope.config.viewsConfig.views);

          if (!scope.config.viewsConfig.currentView) {
            scope.config.viewsConfig.currentView = scope.config.viewsConfig.viewsList[0];
          }
        }
      }, true);
    }
  };
});
