/**
 * @ngdoc directive
 * @name patternfly.toolbars.componenet:pfToolbar
 * @restrict E
 *
 * @description
 *   Standard toolbar component. Includes filtering, sorting, actions, and view selection capabilities
 *   <br><br>
 *
 * @param {array} filterFields List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a single select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * @param {array} appliedFilters List of the currently applied filters
 * @param {int} resultsCount The number of results returned after the current applied filters have been applied
 * @param {function} onFilterChange function(array of filters) ) Function to call when the applied filters list changes
 * @param {array} sortFields List of sortable fields containing:<br/>
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Unique Id for the sort field
 * <li>.title       - (String) The title to display for the sort field
 * <li>.sortType    - (String) The sort type, 'alpha' or 'numeric'
 * </ul>
 * @param {String} currentSortField - Id of the currently selected field
 * @param {boolean} isSortAscending - Current sort direction is ascending. True for ascending, False for descending
 * @param {function} onSortChange - ( function(sortId, sortDirection ) Function to call when the current sort params change
 * @param {array} views List of available views for selection. See pfViewUtils for standard available views
 * <ul style='list-style-type: none'>
 *   <li>.id - (String) Unique id for the view, used for comparisons
 *   <li>.title - (String) Optional title, uses as a tooltip for the view selector
 *   <li>.iconClass - (String) Icon class to use for the view selector
 * </ul>
 * @param {string} currentView - the id of the currently selected view
 * @param {function} onViewSelect  function(view) ) Function to call when a view is selected
 * @param {array} primaryActions List of primary actions to display on the toolbar
 * <ul style='list-style-type: none'>
 *   <li>.name - (String) The name of the action, displayed on the button
 *   <li>.title - (String) Optional title, used for the tooltip
 *   <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   <li>.isDisabled - (Boolean) set to true to disable the action
 * </ul>
 * @param {array} moreActions List of secondary actions to display on the toolbar action pulldown menu
 * <ul style='list-style-type: none'>
 *   <li>.name - (String) The name of the action, displayed on the button
 *   <li>.title - (String) Optional title, used for the tooltip
 *   <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   <li>.isDisabled - (Boolean) set to true to disable the action
 *   <li>.isSeparator - (Boolean) set to true if this is a placehodler for a separator rather than an action
 * </ul>
 * @param {boolean} actionsInclude  set to true if using the actions transclude to add custom action buttons (only available if using Angular 1.5 or later)
 *
 * @example
<example module="patternfly.toolbars">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-toolbar id="exampleToolbar"
                    filter-fields="filterFields"
                    applied-filters="appliedFilters"
                    results-count="{{resultsCount}}"
                    on-filter-change="onFilterChange"
                    sort-fields="sortFields"
                    current-sort-field="currentSortId"
                    is-sort-ascending="sortAscending"
                    on-sort-change="onSortChange"
                    views="views"
                    current-view="currentView"
                    on-view-select="onViewSelect"
                    primary-actions="primaryActions"
                    more-actions="moreActions"
                    actions-include="actionsInclude">
         <actions>
           <span class="dropdown primary-action" uib-dropdown>
             <button class="btn btn-default dropdown-toggle" uib-dropdown-toggle type="button">
               Menu Action
               <span class="caret"></span>
             </button>
             <ul class="dropdown-menu">
               <li role="menuitem" ng-click="optionSelected(1)">
                 <a class="secondary-action">Option 1</a>
               </li>
               <li role="menuitem" ng-click="optionSelected(2)">
                 <a class="secondary-action">Option 2</a>
               </li>
               <li role="menuitem" ng-click="optionSelected(3)">
                 <a class="secondary-action">Option 3</a>
               </li>
               <li role="menuitem" ng-click="optionSelected(4)">
                 <a class="secondary-action">Option 4</a>
               </li>
             </ul>
           </span>
           <button class="btn btn-default primary-action" type="button" ng-click="doAdd()">
             <span class="fa fa-plus"></span>
             Add Action
           </button>
         </actions>
        </pf-toolbar>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12 list-view-container" ng-if="currentView == 'listView'">
        <pf-list-view config="listConfig" items="items">
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
        </pf-list-view>
      </div>
      <div class="col-md-12 card-view-container" ng-if="currentView == 'cardView'">
        <pf-card-view config="vm.listConfig" items="items">
          <div class="col-md-12">
            <span>{{item.name}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.address}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.birthMonth}}</span>
          </div>
        </pf-card-view>
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

  <file name="script.js">
  angular.module('patternfly.toolbars').controller('ViewCtrl', ['$scope', 'pfViewUtils',
    function ($scope, pfViewUtils) {

      angular.extend($scope, {
        filtersText: '',
        filterFields: getFilterFields(),
        appliedFilters: [],
        resultsCount: 0,
        onFilterChange: onFilterChange,
        sortFields: getSortFields(),
        currentSortId: 'name',
        isAscending: true,
        onSortChange: onSortChange,
        views: getViews(),
        currentView: pfViewUtils.getListView().id,
        onViewSelect: onViewSelect,
        primaryActions: getPrimaryActions(),
        moreActions: getMoreActions(),
        actionsInclude: true,
      });
      $scope.currentSortId = $scope.sortFields[0].id;

      initializeListItems();

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

      function applyFilters (filters) {
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
      }

      function applyCurrentFilters () {
        $scope.filtersText = "";
        $scope.appliedFilters.forEach(function (filter) {
          $scope.filtersText += filter.title + " : " + filter.value + "\n";
        });

        applyFilters($scope.appliedFilters);

        $scope.resultsCount = $scope.items.length;
      }

      function onFilterChange (filters) {
        $scope.appliedFilters = filters;
        applyCurrentFilters();
      }

      function getFilterFields () {
        return [
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
        ];
      }

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
        if ($scope.currentSortId === 'name') {
          compValue = item1.name.localeCompare(item2.name);
        } else if ($scope.currentSortId === 'age') {
            compValue = item1.age - item2.age;
        } else if ($scope.currentSortId === 'address') {
          compValue = item1.address.localeCompare(item2.address);
        } else if ($scope.currentSortId === 'birthMonth') {
          compValue = monthVals[item1.birthMonth] - monthVals[item2.birthMonth];
        }

        if (!$scope.isAscending) {
          compValue = compValue * -1;
        }

        return compValue;
      };

      function onSortChange (sortId, isAscending) {
      console.log("Sort: " + sortId + " ascending: " + isAscending);
        $scope.currentSortId = sortId;
        $scope.isAscending = isAscending;
        $scope.items.sort(compareFn);
      }

      function getSortFields () {
        return [
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
        ];
      }

      function onViewSelect (viewId) {
        $scope.currentView = viewId
      }

      function getViews () {
        return [pfViewUtils.getListView(), pfViewUtils.getCardView()];
      };

      $scope.actionsText = "";
      function performAction (action) {
        $scope.actionsText = action.name + "\n" + $scope.actionsText;
      };

      function getPrimaryActions () {
        return [
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
        ];
      }

      function getMoreActions () {
        return [
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
        ];
      }

      function initializeListItems () {
        $scope.listConfig = {
          selectionMatchProp: 'name',
          checkDisabled: false
        };
        $scope.allItems = getAllItems();

        applyCurrentFilters();
      }

      function getAllItems () {
        return [
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
       };

      $scope.doAdd = function () {
        $scope.actionsText = "Add Action\n" + $scope.actionsText;
      };
      $scope.optionSelected = function (option) {
        $scope.actionsText = "Option " + option + " selected\n" + $scope.actionsText;
      };
    }
  ]);
  </file>
</example>
 */
