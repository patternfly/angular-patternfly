/**
 * @ngdoc directive
 * @name patternfly.toolbars.component:pfToolbar
 * @restrict E
 *
 * @description
 *   Standard toolbar component. Includes filtering and view selection capabilities
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
 *         <li>.actionsInclude  - (Boolean) set to true if using the actions transclude to add custom action buttons (only available if using Angular 1.5 or later)
 *       </ul>
 *       <li>.isTableView  - (Boolean) set to true if toolbar is only being used with a table view and viewsConfig is not defined.
 *   </ul>
 *
 * @example
<example module="patternfly.toolbars.demo">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-toolbar id="exampleToolbar" config="toolbarConfig">
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
      <div class="col-md-12" ng-if="viewType == 'listView' && showComponent">
        <pf-list-view config="listConfig"
                      page-config="pageConfig"
                      items="items"
                      empty-state-config="emptyStateConfig">
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
      <div class="col-md-12" ng-if="viewType == 'cardView' && showComponent">
        <pf-card-view config="listConfig"
                      page-config="pageConfig"
                      items="items"
                      empty-state-config="emptyStateConfig">
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
      <div class="col-md-12" ng-if="viewType == 'tableView' && showComponent">
        <pf-table-view config="tableConfig"
                       page-config="pageConfig"
                       columns="columns"
                       items="items"
                       empty-state-config="emptyStateConfig">
        </pf-table-view>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12" style="padding-top: 12px;">
        <div class="form-group">
          <label class="checkbox-inline">
            <input type="checkbox" ng-model="listConfig.itemsAvailable" ng-change="updateItemsAvailable()">Items Available</input>
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" ng-model="showPagination" ng-change="togglePagination()">Show Pagination</input>
          </label>
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

  <file name="modules.js">
    angular.module('patternfly.toolbars.demo', ['patternfly.toolbars','patternfly.table']);
  </file>

  <file name="script.js">
  angular.module('patternfly.toolbars.demo').controller('ViewCtrl', ['$scope', '$timeout', 'pfViewUtils', '$filter',
    function ($scope, $timeout, pfViewUtils, $filter) {
      $scope.filtersText = '';
      $scope.showPagination = false;

      $scope.columns = [
        { header: "Name", itemField: "name" },
        { header: "Age", itemField: "age"},
        { header: "Address", itemField: "address" },
        { header: "BirthMonth", itemField: "birthMonth"}
      ];

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
        },
        {
          name: "Linda McGovern",
          age: 32,
          address: "22 Oak Stree, Denver, Colorado",
          birthMonth: 'March'
        },
        {
          name: "Jim Brown",
          age: 55,
          address: "72 Bourbon Way. Nashville. Tennessee",
          birthMonth: 'March'
        },
        {
          name: "Holly Nichols",
          age: 34,
          address: "21 Jump Street, Hollywood, California",
          birthMonth: 'March'
        },
        {
          name: "Chris Thomas",
          age: 21,
          address: "50 Second Street, New York, New York",
          birthMonth: 'April'
        },
        {
          name: "Jeff McGovern",
          age: 30,
          address: "22 Oak Stree, Denver, Colorado",
          birthMonth: 'November'
        },
        {
          name: "Jessica Brown",
          age: 50,
          address: "72 Bourbon Way. Nashville. Tennessee",
          birthMonth: 'January'
        },
        {
          name: "Dave Nichols",
          age: 32,
          address: "21 Jump Street, Hollywood, California",
          birthMonth: 'June'
        }
      ];
      $scope.items = $scope.allItems;

      var matchesFilter = function (item, filter) {
        var match = true;
        var re = new RegExp(filter.value, 'i');

        if (filter.id === 'name') {
          match = item.name.match(re) !== null;
        } else if (filter.id === 'age') {
          match = item.age === parseInt(filter.value);
        } else if (filter.id === 'address') {
          match = item.address.match(re) !== null;
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
        totalCount: $scope.allItems.length,
        appliedFilters: [],
        onFilterChange: filterChange
      };

      var viewSelected = function(viewId) {
        $scope.viewType = viewId;
        $scope.sortConfig.show = ($scope.viewType === "tableView" ? false : true);
      };

      $scope.viewsConfig = {
        views: [pfViewUtils.getListView(), pfViewUtils.getCardView(), pfViewUtils.getTableView()],
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
            actionFn: performAction,
            title: 'Do something similar'
          }
        ],
        actionsInclude: true
      };

      $scope.toolbarConfig = {
        viewsConfig: $scope.viewsConfig,
        filterConfig: $scope.filterConfig,
        sortConfig: $scope.sortConfig,
        actionsConfig: $scope.actionsConfig
      };

      $scope.listConfig = {
        selectionMatchProp: 'name',
        checkDisabled: false,
        itemsAvailable: true,
        onCheckBoxChange: handleCheckBoxChange
      };

      $scope.emptyStateConfig = {
        icon: 'pficon-warning-triangle-o',
        title: 'No Items Available',
        info: "This is the Empty State component. The goal of a empty state pattern is to provide a good first impression that helps users to achieve their goals. It should be used when a view is empty because no objects exists and you want to guide the user to perform specific actions.",
        helpLink: {
           label: 'For more information please see',
           urlLabel: 'pfExample',
           url : '#/api/patternfly.views.component:pfEmptyState'
        }
      };

      $scope.tableConfig = {
        onCheckBoxChange: handleCheckBoxChange,
        selectionMatchProp: "name",
        itemsAvailable: true,
      };

      $scope.doAdd = function () {
        $scope.actionsText = "Add Action\n" + $scope.actionsText;
      };

      $scope.optionSelected = function (option) {
        $scope.actionsText = "Option " + option + " selected\n" + $scope.actionsText;
      };

      $scope.updateItemsAvailable = function () {
        $scope.tableConfig.itemsAvailable = $scope.listConfig.itemsAvailable;
        if(!$scope.listConfig.itemsAvailable) {
          $scope.toolbarConfig.filterConfig.resultsCount = 0;
          $scope.toolbarConfig.filterConfig.totalCount = 0;
          $scope.toolbarConfig.filterConfig.selectedCount = 0;
       } else {
          $scope.toolbarConfig.filterConfig.resultsCount = $scope.items.length;
          $scope.toolbarConfig.filterConfig.totalCount = $scope.allItems.length;
          handleCheckBoxChange();
        }
      };

      function handleCheckBoxChange (item) {
        var selectedItems = $filter('filter')($scope.allItems, {selected: true});
        if (selectedItems) {
          $scope.toolbarConfig.filterConfig.selectedCount = selectedItems.length;
        }
      }

      $scope.togglePagination = function () {
        if ($scope.showPagination) {
          $scope.pageConfig = {
             pageSize: 5
          }
        } else {
          delete $scope.pageConfig;
        }
        $scope.addNewComponentToDOM();
      };

      $scope.showComponent = true;

      $scope.addNewComponentToDOM = function () {
        $scope.showComponent = false;
        $timeout(() => $scope.showComponent = true);
      };
    }
  ]);
  </file>
</example>
 */
