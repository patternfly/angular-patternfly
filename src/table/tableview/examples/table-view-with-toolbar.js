/**
 * @ngdoc directive
 * @name patternfly.table.component:pfTableView - with Toolbar
 *
 * @description
 * Example configuring a table view with a toolbar.<br><br>
 * Please see {@link patternfly.toolbars.component:pfToolbar pfToolbar} for use in Toolbar View Switcher
 *
 * @param {object} config Optional configuration object
 * <ul style='list-style-type: none'>
 *   <li>.selectionMatchProp  - (string) Property of the items to use for determining matching, default is 'uuid'
 *   <li>.onCheckBoxChange    - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 *   <li>.itemsAvailable      - (boolean) If 'false', displays the {@link patternfly.views.component:pfEmptyState Empty State} component.
 *   <li>.showCheckboxes      - (boolean) Show checkboxes for row selection, default is true
 * </ul>
 * @param {object} dtOptions Optional angular-datatables DTOptionsBuilder configuration object. Note: paginationType, displayLength, and dom:"p" are no longer being used for pagination, but are allowed for backward compatibility.
 * Please switch to prefered 'pageConfig' settings for pf pagination controls.
 * Other dtOptions can still be used, such as 'order' See {@link http://l-lin.github.io/angular-datatables/archives/#/api angular-datatables: DTOptionsBuilder}
 * @param {object} pageConfig Optional pagination configuration object.  Since all properties are optional it is ok to specify: 'pageConfig = {}' to indicate that you want to
 * use pagination with the default parameters.
 * <ul style='list-style-type: none'>
 *   <li>.pageNumber  - (number) Optional Initial page number to display. Default is page 1.
 *   <li>.pageSize    - (number) Optional Initial page size/display length to use. Ie. Number of "Items per Page".  Default is 10 items per page
 *   <li>.pageSizeIncrements - (Array[Number]) Optional Page size increments for the 'per page' dropdown.  If not specified, the default values are: [5, 10, 20, 40, 80, 100]
 * </ul>
 * @param {array} items Array of items to display in the table view.
 * @param {array} columns Array of table column information to display in the table's header row and optionaly render the cells of a column.
 * <ul style='list-style-type: none'>
 *   <li>.header     - (string) Text label for a column header
 *   <li>.itemField    - (string) Item field to associate with a particular column.
 *   <li>.templateFn - (function) (optional) Template function used to render each cell of the column. Pro: more performant than `htmlTemplate`. Con: doesn't support AngularJS directives in the template, therefore it doesn't support things like ng-click. Example: <pre>templateFn: value => `<span class="text-danger">${value}</span>`</pre>
 *   <li>.htmlTemplate - (string) (optional) id/name of an embedded ng/html template. Pro: supports AngularJS directives in the template. Con: poor performance on large tables. Ex: htmlTemplate="name_template.html".  The template will be used to render each cell of the column.
 *        Use <code>handleColAction(key, value)</code> in the template to call the <code>colActionFn</code> callback function you specify. 'key' is the item attribute name; which should equal the itemFld of a column.
 *       'value' is the item[key] value.
 *       <pre>
 *         <script type="text/ng-template" id="name_template.html">
 *           <a href="" ng-click="$ctrl.handleColAction(key, value)">{{value}}</a>
 *         </script>
 *       </pre>
 *   <li>.colActionFn - (function) (optional) Callback function used for the column. 'value' is passed as a paramenter to the
 *        callback function.
 * </ul>
 * <p><strong>Tip:</strong> For templating, use `tempateFn` unless you really need to use AngularJS directives. `templateFn` performs better than `htmlTemplate`.</p>
 * @param {array} actionButtons List of action buttons in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   </ul>
 * @param {array} menuActions List of actions for dropdown menu in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   </ul>
 * @param {object} emptyStateConfig Optional configuration settings for the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @param {array} emptyStateActionButtons Optional buttons to display under the icon, title, and informational paragraph.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
 * @example
<example module="patternfly.tableview.demo">
  <file name="index.html">
    <style>
      .truncate-text-container {
          position: relative;
          max-width: 100%;
          padding: 0 !important;
          display: -webkit-flex;
          display: -moz-flex;
          display: flex;
          vertical-align: text-bottom !important;
      }
      .truncate-text-ellipsis {
          position: absolute;
          white-space: nowrap;
          overflow-y: visible;
          overflow-x: hidden;
          text-overflow: ellipsis;
          -ms-text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          max-width: 100%;
          min-width: 0;
          top: 0;
          left: 0;
      }
      .truncate-text-container:after,
      .truncate-text-ellipsis:after {
          content: '-';
          display: inline-block;
          visibility: hidden;
          width: 0;
      }
    </style>
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-toolbar id="exampleToolbar" config="toolbarConfig"></pf-toolbar>
      </div>
      <div class="col-md-12" ng-if="showComponent">
        <pf-table-view config="tableConfig"
                       empty-state-config="emptyStateConfig"
                       dt-options="dtOptions"
                       page-config="pageConfig"
                       columns="columns"
                       items="items"
                       action-buttons="tableActionButtons"
                       menu-actions="tableMenuActions">
        </pf-table-view>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <div class="form-group">
          <label class="checkbox-inline">
            <input type="checkbox" ng-model="tableConfig.itemsAvailable" ng-change="updateItemsAvailable()">Items Available</input>
          </label>
          <!-- TODO: I don't know why this comment is neccesary, but if I remove it I get error:
               Error: [$compile:ctreq] Controller 'tabbable', required by directive 'tabPane', can't be found!
               I've wasted too much time trying to fix this!  Something to do with ngDoc's <file> directives
          --!>
        </div>
        <div class="form-group">
          <label class="checkbox-inline">
            <input type="checkbox" ng-model="tableConfig.showCheckboxes" ng-change="addNewComponentToDOM()">Show Checkboxes</input>
          </label>
        </div>
      </div>
      <div class="col-md-12">
        <label class="actions-label">Actions: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="6" class="col-md-12">{{actionsText}}</textarea>
      </div>
      <script type="text/ng-template" id="status_template.html">
        <span ng-if="value === 'error'" class="pficon pficon-error-circle-o"></span>
        <span ng-if="value === 'warning'" class="pficon pficon-warning-triangle-o"></span>
        <span ng-if="value === 'ok'" class="pficon pficon-ok"></span>
        {{value}}
      </script>
      <script type="text/ng-template" id="name_template.html">
        <a href="" ng-click="$ctrl.handleColAction(key, value)">{{value}}</a>
      </script>
      <script type="text/ng-template" id="address_template.html">
        <span class="truncate-text-container">
          <span class="truncate-text-ellipsis" title="{{value}}">
            {{value}}
          </span>
        </span>
      </script>
    </div>
  </file>

  <file name="modules.js">
    angular.module('patternfly.tableview.demo', ['patternfly.toolbars','patternfly.table']);
  </file>

  <file name="script.js">
  angular.module('patternfly.tableview.demo').controller('ViewCtrl', ['$scope', '$timeout', 'pfViewUtils', '$filter',
    function ($scope, $timeout, pfViewUtils, $filter) {
      $scope.actionsText = "";

      $scope.columns = [
        {
          header: "Status",
          itemField: "status",
          htmlTemplate: "status_template.html"
        },
        {
          header: "Name",
          itemField: "name",
          htmlTemplate: "name_template.html",
          colActionFn: onNameClick
        },
        {
          header: "Age",
          itemField: "age",
          templateFn: function(value) {
            var className = value > 30 ? 'text-success' : 'text-warning';
            return '<span class="' + className + '">' + value + '</span>';
          }
        },
        {
          header: "Address",
          itemField: "address",
          htmlTemplate: "address_template.html"
        },
        {
          header: "BirthMonth",
          itemField: "birthMonth"
        }
      ];

      // dtOptions paginationType, displayLength, and dom:"p" are no longer being
      // used, but are allowed for backward compatibility.
      // Please switch to prefered 'pageConfig' settings for pf pagination controls
      // Other dtOptions can still be used, such as 'order'
      // $scope.dtOptions = {
      //  paginationType: 'full',
      //  displayLength: 10,
      //  dom: "tp"
      // }

      // New pagination config settings
      $scope.pageConfig = {
        pageNumber: 1,
        pageSize: 10,
        pageSizeIncrements: [5, 10, 15]
      }

      $scope.allItems = [
        {
          status: "error",
          name: "Fred Flintstone",
          age: 57,
          address: "20 Dinosaur Way, Bedrock, Washingstone",
          birthMonth: 'February'
        },
        {
          status: "ok",
          name: "John Smith",
          age: 23,
          address: "415 East Main Street, Norfolk, Virginia",
          birthMonth: 'October'
        },
        {
          status: "warning",
          name: "Frank Livingston",
          age: 71,
          address: "234 Elm Street, Pittsburgh, Pennsylvania",
          birthMonth: 'March'
        },
        {
          status: "ok",
          name: "Judy Green",
          age: 21,
          address: "2 Apple Boulevard, Cincinatti, Ohio",
          birthMonth: 'December'
        },
        {
          status: "ok",
          name: "Pat Thomas",
          age: 19,
          address: "50 Second Street, New York, New York",
          birthMonth: 'February'
        },
        {
          status: "error",
          name: "Linda McGovern",
          age: 32,
          address: "22 Oak Stree, Denver, Colorado",
          birthMonth: 'March'
        },
        {
          status: "warning",
          name: "Jim Brown",
          age: 55,
          address: "72 Bourbon Way. Nashville. Tennessee",
          birthMonth: 'March'
        },
        {
          status: "ok",
          name: "Holly Nichols",
          age: 34,
          address: "21 Jump Street, Hollywood, California",
          birthMonth: 'March'
        },
        {
          status: "ok",
          name: "Wilma Flintstone",
          age: 47,
          address: "20 Dinosaur Way, Bedrock, Washingstone",
          birthMonth: 'February'
        },
        {
          status: "warning",
          name: "Jane Smith",
          age: 22,
          address: "415 East Main Street, Norfolk, Virginia",
          birthMonth: 'April'
        },
        {
          status: "error",
          name: "Liz Livingston",
          age: 65,
          address: "234 Elm Street, Pittsburgh, Pennsylvania",
          birthMonth: 'November'
        },
        {
          status: "ok",
          name: "Jim Green",
          age: 23,
          address: "2 Apple Boulevard, Cincinatti, Ohio",
          birthMonth: 'January'
        },
        {
          status: "ok",
          name: "Chris Thomas",
          age: 21,
          address: "50 Second Street, New York, New York",
          birthMonth: 'October'
        },
        {
          status: "error",
          name: "Larry McGovern",
          age: 34,
          address: "22 Oak Stree, Denver, Colorado",
          birthMonth: 'September'
        },
        {
          status: "warning",
          name: "July Brown",
          age: 51,
          address: "72 Bourbon Way. Nashville. Tennessee",
          birthMonth: 'May'
        },
        {
          status: "error",
          name: "Henry Nichols",
          age: 36,
          address: "21 Jump Street, Hollywood, California",
          birthMonth: 'March'
        },
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
        } else if (filter.id === 'status') {
          match = item.status === filter.value;
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
        applyFilters(filters);
        $scope.toolbarConfig.filterConfig.resultsCount = $scope.items.length;
      };

      var performAction = function (action) {
        var selectedItems = $filter('filter')($scope.allItems, {selected: true});
        if(!selectedItems) {
          selectedItems = [];
        }
        $scope.actionsText = "Toolbar Action: " + action.name + " on " + selectedItems.length + " selected items\n" + $scope.actionsText;
      };

      var performTableAction = function (action, item) {
        $scope.actionsText = "Table Row Action on '" + item.name + "' : " + action.name + "\r\n" + $scope.actionsText;
      };

      function handleCheckBoxChange (item) {
        var selectedItems = $filter('filter')($scope.allItems, {selected: true});
        if (selectedItems) {
          $scope.toolbarConfig.filterConfig.selectedCount = selectedItems.length;
        }
      }

      function onNameClick (name) {
         $scope.actionsText = "You clicked on " + name + "\n" + $scope.actionsText;
      }

      $scope.filterConfig = {
        fields: [
          {
            id: 'status',
            title:  'Status',
            placeholder: 'Filter by Status...',
            filterType: 'select',
            filterValues: ['error', 'warning', 'ok']
          },
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

      $scope.toolbarActionsConfig = {
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
        filterConfig: $scope.filterConfig,
        sortConfig: $scope.sortConfig,
        actionsConfig: $scope.toolbarActionsConfig,
        isTableView: true
      };

      $scope.tableConfig = {
        onCheckBoxChange: handleCheckBoxChange,
        selectionMatchProp: "name",
        itemsAvailable: true,
        showCheckboxes: true
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

      $scope.tableActionButtons = [
        {
          name: 'Action',
          title: 'Perform an action',
          actionFn: performTableAction
        }
      ];

      $scope.tableMenuActions = [
        {
          name: 'Action',
          title: 'Perform an action',
          actionFn: performTableAction
        },
        {
          name: 'Another Action',
          title: 'Do something else',
          actionFn: performTableAction
        },
        {
          name: 'Disabled Action',
          title: 'Unavailable action',
          actionFn: performTableAction,
          isDisabled: true
        },
        {
          name: 'Something Else',
          title: '',
          actionFn: performTableAction
        },
        {
          isSeparator: true
        },
        {
          name: 'Grouped Action 1',
          title: 'Do something',
          actionFn: performTableAction
        },
        {
          name: 'Grouped Action 2',
          title: 'Do something similar',
          actionFn: performTableAction
        }
      ];

      $scope.updateItemsAvailable = function () {
        if(!$scope.tableConfig.itemsAvailable) {
          $scope.toolbarConfig.filterConfig.resultsCount = 0;
          $scope.toolbarConfig.filterConfig.totalCount = 0;
          $scope.toolbarConfig.filterConfig.selectedCount = 0;
       } else {
          $scope.toolbarConfig.filterConfig.resultsCount = $scope.items.length;
          $scope.toolbarConfig.filterConfig.totalCount = $scope.allItems.length;
          handleCheckBoxChange();
        }
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
