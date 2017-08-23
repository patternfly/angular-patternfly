/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilter
 * @restrict E
 *
 * @description
 *   Component for a filter bar
 *   <br><br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterMultiselect - (Boolean) In `complex-select`, allow selection of multiple categories and values. Optional, default is `false`
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a single select box or 'complex-select' for a category select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select' or 'complex-select' (in where these values serve as case insensitve keys for .filterCategories objects)
 * <li>.filterCategories - (Array of (Objects)) For 'complex-select' only, array of objects whoes keys (case insensitive) match the .filterValues, these objects include each of the filter fields above (sans .placeholder)
 * <li>.filterCategoriesPlaceholder - (String) Text to display in `complex-select` category value select when no filter value has been entered, Optional
 * <li>.filterDelimiter - (String) Delimiter separating 'complex-select' category and value. Optional, default is a space, ' '
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.onFilterChange - ( function(array of filters) ) Function to call when the applied filters list changes
 * </ul>
 *
 * @example
<example module="patternfly.filters">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-filter id="exampleFilter" config="filterConfig"></pf-filter>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12">
        <div ng-repeat="item in items" class="col-md-12 cfme-row-column">
          <div class="row">
            <div class="col-md-3">
              <span>{{item.name}}</span>
            </div>
            <div class="col-md-7">
              <span>{{item.address}}</span>
            </div>
            <div class="col-md-2">
              <span>{{item.birthMonth}}</span>
            </div>
            <div class="col-md-4">
              <span>{{item.car}}</span>
            </div>
          </div>
        </div>
      </div>
      </br></br>
      <div class="col-md-12">
        <label class="events-label">Current Filters: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="5" class="col-md-12">{{filtersText}}</textarea>
      </div>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.filters').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.filtersText = '';

        $scope.allItems = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way, Bedrock, Washingstone",
            birthMonth: 'February',
            car: 'Toyota-Echo'
          },
          {
            name: "John Smith",
            address: "415 East Main Street, Norfolk, Virginia",
            birthMonth: 'October',
            car: 'subie-out'

          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street, Pittsburgh, Pennsylvania",
            birthMonth: 'March',
            car: 'Toyota-pri'
          },
          {
            name: "Judy Green",
            address: "2 Apple Boulevard, Cincinatti, Ohio",
            birthMonth: 'December',
            car: 'subie-Impreza'
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street, New York, New York",
            birthMonth: 'jan',
            car: 'subie-Crosstrek'
          }
        ];
        $scope.items = $scope.allItems;

        var matchesFilter = function (item, filter) {
          var match = true;
          var re = new RegExp(filter.value, 'i');

          if (filter.id === 'name') {
            match = item.name.match(re) !== null;
          } else if (filter.id === 'address') {
            match = item.address.match(re) !== null;
          } else if (filter.id === 'birthMonth') {
            match = item.birthMonth === filter.value.id || item.birthMonth === filter.value;
          } else if (filter.id === 'car') {
            match = item.car === ((filter.value.filterCategory.id || filter.value.filterCategory)
            + filter.value.filterDelimiter + (filter.value.filterValue.id || filter.value.filterValue));
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
          $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var filterChange = function (filters) {
        $scope.filtersText = "";
          filters.forEach(function (filter) {
            $scope.filtersText += filter.title + " : ";
            if (filter.value.filterCategory) {
              $scope.filtersText += ((filter.value.filterCategory.title || filter.value.filterCategory)
              + filter.value.filterDelimiter + (filter.value.filterValue.title || filter.value.filterValue));
            } else if (filter.value.title){
              $scope.filtersText += filter.value.title;
            } else {
              $scope.filtersText += filter.value;
            }
            $scope.filtersText += "\n";
          });
          applyFilters(filters);
        };

        $scope.filterConfig = {
          fields: [
            {
              id: 'name',
              title:  'Name',
              placeholder: 'Filter by Name',
              filterType: 'text'
            },
            {
              id: 'address',
              title:  'Address',
              placeholder: 'Filter by Address',
              filterType: 'text'
            },
            {
              id: 'birthMonth',
              title:  'Birth Month',
              placeholder: 'Filter by Birth Month',
              filterType: 'select',
              filterValues: [{title:'January', id:'jan'}, {title:'Feb', id:'February'}, 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
           {
              id: 'car',
              title:  'Car',
              placeholder: 'Filter by Car Make',
              filterType: 'complex-select',
              filterValues: [{title:'Subaru', id:'subie'}, 'Toyota'],
              filterDelimiter: '-',
              filterCategoriesPlaceholder: 'Filter by Car Model',
              filterCategories: {subie: {
                id: 'subie',
                title:  'Subaru',
                filterValues: [{title:'Outback', id:'out'}, 'Crosstrek', 'Impreza']},
                toyota: {
                id: 'toyota',
                title:  'Toyota',
                filterValues: [{title:'Prius', id:'pri'}, 'Corolla', 'Echo']}
                }
            }
          ],
          resultsCount: $scope.items.length,
          appliedFilters: [],
          onFilterChange: filterChange
        };
      }
    ]);
  </file>
</example>
*/
