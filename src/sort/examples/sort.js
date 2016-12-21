/**
 * @ngdoc directive
 * @name patternfly.sort.component:pfSort
 * @restrict E
 *
 * @description
 *   Sort component
 *   <br><br>
 *
 * @param {array} fields List of sortable fields containing:<br/>
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Unique Id for the sort field
 * <li>.title       - (String) The title to display for the sort field
 * <li>.sortType    - (String) The sort type, 'alpha' or 'numeric'
 * </ul>
 * @param {String} currentField - Id of the currently selected field
 * @param {boolean} isAscending - Current sort direction is ascending. True for ascending, False for descending
 * @param {function} onSortChange - ( function(sortId, sortDirection ) Function to call when the current sort params change
 *
 * @example
<example module="patternfly.sort">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-sort id="exampleSort" fields="sortFields" on-sort-change="sortChange"></pf-sort>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Items: </label>
      </div>
      <div class="col-md-12">
        <div ng-repeat="item in items" class="col-md-12 cfme-row-column">
          <div class="row">
            <div class="col-md-3">
              <span>{{item.name}}</span>
            </div>
            <div class="col-md-3">
              <span>{{item.count}}</span>
            </div>
            <div class="col-md-3">
              <span>{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.sort').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.items = [
          {
            name: "Item 7",
            count: 432,
            description: 'Very nice item'
          },
          {
            name: "Item 6",
            count: 22,
            description: 'It lasts forever'
          },
          {
            name: "Item 3",
            count: 632,
            description: 'Good stuff cheap'
          },
          {
            name: "Item 2",
            count: 12,
            description: 'Fantastic'
          },
          {
            name: "Item 9",
            count: 99,
            description: 'It does alright'
          },
          {
            name: "Item 4",
            count: 442,
            description: 'Horrible'
          },
          {
            name: "Item 1",
            count: 42,
            description: 'Most excellent'
          },
          {
            name: "Item 8",
            count: 2,
            description: 'Get it while it lasts'
          },
          {
            name: "Item 5",
            count: 321,
            description: 'Beautiful style'
          }
        ];

        $scope.sortChange = function (sortId, isAscending) {

          $scope.items.sort(compareFn);

          function compareFn (item1, item2) {
            var compValue = 0;
            if (sortId === 'name') {
              compValue = item1.name.localeCompare(item2.name);
            } else if (sortId === 'count') {
                compValue = item1.count - item2.count;
            } else if (sortId === 'description') {
              compValue = item1.description.localeCompare(item2.description);
            }

            if (!isAscending) {
              compValue = compValue * -1;
            }

            return compValue;
          };
        };

        $scope.sortFields = [
          {
            id: 'name',
            title:  'Name',
            sortType: 'alpha'
          },
          {
            id: 'count',
            title:  'Count',
            sortType: 'numeric'
          },
          {
            id: 'description',
            title:  'Description',
            sortType: 'alpha'
          }
        ];

        $scope.sortChange('name', true);
      }
    ]);
  </file>
</example>
 */
