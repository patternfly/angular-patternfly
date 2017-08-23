/**
  * @ngdoc directive
  * @name patternfly.table.component:pfTableView - Basic
  *
  * @description
  * Component for rendering a simple table view.<br><br>
  * See {@link patternfly.table.component:pfTableView%20-%20with%20Toolbar pfTableView - with Toolbar} for use with a Toolbar<br>
  * See {@link patternfly.toolbars.component:pfToolbar pfToolbar} for use in Toolbar View Switcher
  *
  * @param {object} config Optional configuration object
  * <ul style='list-style-type: none'>
  *   <li>.selectionMatchProp  - (string) Property of the items to use for determining matching, default is 'uuid'
  *   <li>.onCheckBoxChange    - ( function(item) ) Called to notify when a checkbox selection changes, default is none
  *   <li>.itemsAvailable      - (boolean) If 'false', displays the {@link patternfly.views.component:pfEmptyState Empty State} component.
  *   <li>.showCheckboxes      - (boolean) Show checkboxes for row selection, default is true
  * </ul>
  * @param {object} dtOptions Optional angular-datatables DTOptionsBuilder configuration object.  See {@link http://l-lin.github.io/angular-datatables/archives/#/api angular-datatables: DTOptionsBuilder}
  * @param {array} items Array of items to display in the table view.
  * @param {array} columns Array of table column information to display in the table's header row and optionaly render the cells of a column.
  * <ul style='list-style-type: none'>
  *   <li>.header     - (string) Text label for a column header
  *   <li>.itemField    - (string) Item field to associate with a particular column.
  *   <li>.templateFn - (function) (optional) Template function used to render each cell of the column. Pro: more performant than `htmlTemplate`. Con: doesn't support AngularJS directives in the template, therefore it doesn't support things like ng-click. Example: <pre>templateFn: value => `<span class="text-danger">${value}</span>`</pre>
  *   <li>.htmlTemplate - (string) (optional) id/name of an embedded ng/html template. Pro: supports AngularJS directives in the template. Con: poor performance on large tables. Ex: htmlTemplate="name_template.html".  The template will be used to render each cell of the column.
  *        Use <code>handleColAction(key, value)</code> in the template to call the <code>colActionFn</code> callback function you specify. 'key' is the item attribute name; which should equal the itemFld of a column.
  *       'value' is the item[key] value.
  *   <pre>
  *     <script type="text/ng-template" id="name_template.html">
  *       <a href="" ng-click="$ctrl.handleColAction(key, value)">{{value}}</a>
  *     </script>
  *   </pre>
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
  * @param {array} emptyStateActionButtons Optional buttons to display under the icon, title, and informational paragraph in the empty state component.  See the {@link patternfly.views.component:pfEmptyState Empty State} component
  * @example
  <example module="patternfly.tableview.demo">
  <file name="index.html">
  <div ng-controller="TableCtrl" class="row example-container">
    <div class="col-md-12" ng-if="showComponent">
      <pf-table-view id="exampleTableView"
            config="config"
            empty-state-config="emptyStateConfig"
            dt-options="dtOptions"
            columns="columns"
            items="items"
            action-buttons="actionButtons"
            menu-actions="menuActions"
            empty-state-action-buttons="emptyStateActionButtons">
      </pf-table-view>
    </div>
    <hr class="col-md-12">
    <div class="col-md-12" style="padding-top: 12px;">
      <div class="form-group">
        <label class="checkbox-inline">
          <input type="checkbox" ng-model="config.itemsAvailable">Items Available</input>
        </label>
      </div>
      <div class="form-group">
        <label class="checkbox-inline">
          <input type="checkbox" ng-model="config.showCheckboxes" ng-change="addNewComponentToDOM()">Show Checkboxes</input>
        </label>
      </div>
    </div>
    <div class="col-md-12">
          <div class="col-md-12" style="padding-top: 12px;">
            <label style="font-weight:normal;vertical-align:center;">Events: </label>
          </div>
          <div class="col-md-12">
            <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
          </div>
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
  </file>

  <file name="module.js">
    angular.module('patternfly.tableview.demo', ['patternfly.views','patternfly.table']);
  </file>

  <file name="controller.js">
  angular.module('patternfly.tableview.demo').controller('TableCtrl', ['$scope', '$timeout', 'itemsService',
  function ($scope, $timeout, itemsService) {
          $scope.dtOptions = {
            order: [[2, "asc"]],
          };

          $scope.columns = [
            { header: "Status", itemField: "status", htmlTemplate: "status_template.html" },
            { header: "Name", itemField: "name", htmlTemplate: "name_template.html", colActionFn: onNameClick },
            { header: "Address", itemField: "address"},
            { header: "City", itemField: "city", templateFn: function(value) { return '<span class="text-success">' + value + '</span>' } },
            { header: "State", itemField: "state"}
          ];

          $scope.items = null;

          $scope.eventText = "";

          $scope.config = {
            onCheckBoxChange: handleCheckBoxChange,
            selectionMatchProp: "name",
            itemsAvailable: true,
            showCheckboxes: true
          };

          var performEmptyStateAction = function (action) {
            $scope.eventText = action.name + "\r\n" + $scope.eventText;
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

          $scope.emptyStateActionButtons = [
            {
              name: 'Main Action',
              title: 'Perform an action',
              actionFn: performEmptyStateAction,
              type: 'main'
            },
            {
              name: 'Secondary Action 1',
              title: 'Perform an action',
              actionFn: performEmptyStateAction
            },
            {
              name: 'Secondary Action 2',
              title: 'Perform an action',
              actionFn: performEmptyStateAction
            },
            {
              name: 'Secondary Action 3',
              title: 'Perform an action',
              actionFn: performEmptyStateAction
            }
          ];

          function handleCheckBoxChange (item) {
            $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
          };

          var performAction = function (action, item) {
            $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
          };

          function onNameClick (name) {
            $scope.eventText = "You clicked on " + name + "\n" + $scope.eventText;
          }

          $scope.actionButtons = [
            {
              name: 'Action',
              title: 'Perform an action',
              actionFn: performAction
            }
          ];

          $scope.menuActions = [
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

          $scope.showComponent = true;

          $scope.addNewComponentToDOM = function () {
            $scope.showComponent = false;
            $timeout(() => $scope.showComponent = true);
          };

          (function init() {
            itemsService.getItems()
              .then(items => $scope.items = items);
          })();
        }
      ]);
    </file>

  <file name="service.js">
    angular.module('patternfly.tableview.demo').service('itemsService', ['$q', function($q) {

      this.getItems = function() {
        return $q((resolve, reject) => {
          setTimeout(function() {
            let items = [
              {
              status: "error",
              name: "Fred Flintstone",
              address: "20 Dinosaur Way",
              city: "Bedrock",
              state: "Washingstone"
              },
              {
              status: "error",
              name: "John Smith",
              address: "415 East Main Street",
              city: "Norfolk",
              state: "Virginia",
              },
              {
              status: "warning",
              name: "Frank Livingston",
              address: "234 Elm Street",
              city: "Pittsburgh",
              state: "Pennsylvania"
              },
              {
              status: "ok",
              name: "Linda McGovern",
              address: "22 Oak Street",
              city: "Denver",
              state: "Colorado"
              },
              {
              status: "error",
              name: "Jim Brown",
              address: "72 Bourbon Way",
              city: "Nashville",
              state: "Tennessee"
              },
              {
              status: "ok",
              name: "Holly Nichols",
              address: "21 Jump Street",
              city: "Hollywood",
              state: "California"
              },
              {
              status: "error",
              name: "Marie Edwards",
              address: "17 Cross Street",
              city: "Boston",
              state: "Massachusetts"
              },
              {
              status: "ok",
              name: "Pat Thomas",
              address: "50 Second Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "warning",
              name: "Mike Bird",
              address: "50 Forth Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "error",
              name: "Cheryl Taylor",
              address: "2 Main Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "ok",
              name: "Ren DiLorenzo",
              address: "10 Chase Lane",
              city: "Boston",
              state: "Massacusetts"
              },
              {
              status: "ok",
              name: "Kim Livingston",
              address: "5 Tree Hill Lane",
              city: "Boston",
              state: "Massacusetts"
              }
            ];
            resolve(items);
          }, 10);
        });
      }

    }]);
  </file>

</example>
*/
