/**
 * @ngdoc directive
 * @name patternfly.fitlers.directive:pfSimpleFilter
 *
 * @description
 *   Directive for a simple filter bar
 *   <br><br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.onFilterChange - ( function(array of filters) ) Function to call when the applied filters list changes
 * </ul>
 *
 * @example
<example module="patternfly.filters" deps="patternfly.select">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <div pf-simple-filter id="exampleSimpleFilter" config="filterConfig"></div>
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
            birthMonth: 'February'
          },
          {
            name: "John Smith",
            address: "415 East Main Street, Norfolk, Virginia",
            birthMonth: 'October'
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street, Pittsburgh, Pennsylvania",
            birthMonth: 'March'
          },
          {
            name: "Judy Green",
            address: "2 Apple Boulevard, Cincinatti, Ohio",
            birthMonth: 'December'
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street, New York, New York",
            birthMonth: 'February'
          }
        ];
        $scope.items = $scope.allItems;

        var matchesFilter = function (item, filter) {
          var match = true;

          if (filter.id === 'name') {
            match = item.name.match(filter.value) !== null;
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
          $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var filterChange = function (filters) {
        $scope.filtersText = "";
          filters.forEach(function (filter) {
            $scope.filtersText += filter.title + " : " + filter.value + "\n";
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
              filterValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
angular.module('patternfly.filters').directive('pfSimpleFilter',
  function ($document) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '='
      },
      transclude: false,
      templateUrl: 'filters/simple-filter.html',
      controller: function ($scope) {
        var defaultConfig = {
          fields: [],
          resultsCount: 0
        };

        $scope.setupConfig = function () {
          $scope.config = $.extend(true, angular.copy(defaultConfig), $scope.config);

          if (!$scope.currentField) {
            $scope.currentField = $scope.config.fields[0];
            $scope.config.currentValue = null;
          }

          if ($scope.config.currentValue === undefined) {
            $scope.config.currentValue = null;
          }

          if (!$scope.config.appliedFilters) {
            $scope.config.appliedFilters = [];
          }
        };

        $scope.selectField = function (item) {
          $scope.currentField = item;
          $scope.config.currentValue = null;
        };

        $scope.selectValue = function (filterValue) {
          $scope.addFilter($scope.currentField, filterValue);
          $scope.config.currentValue = null;
        };

        $scope.filterExists = function (filter) {
          var found = false;
          $scope.config.appliedFilters.forEach(function (nextFilter) {
            if (nextFilter.title === filter.title && nextFilter.value === filter.value) {
              found = true;
            }
          });
          return found;
        };

        $scope.addFilter = function (field, value) {
          var newFilter = {
            id: field.id,
            title: field.title,
            value: value
          };
          if (!$scope.filterExists(newFilter)) {
            $scope.config.appliedFilters.push(newFilter);

            if ($scope.config.onFilterChange) {
              $scope.config.onFilterChange($scope.config.appliedFilters);
            }
          }
        };

        $scope.onValueKeyPress = function (keyEvent) {
          if (keyEvent.which === 13) {
            $scope.addFilter($scope.currentField, $scope.config.currentValue);
            $scope.config.currentValue = undefined;
          }
        };

        $scope.clearFilter = function (item) {
          var newFilters = [];
          $scope.config.appliedFilters.forEach(function (filter) {
            if (item.title !== filter.title || item.value !== filter.value) {
              newFilters.push(filter);
            }
          });
          $scope.config.appliedFilters = newFilters;

          if ($scope.config.onFilterChange) {
            $scope.config.onFilterChange($scope.config.appliedFilters);
          }
        };

        $scope.clearAllFilters = function () {
          $scope.config.appliedFilters = [];

          if ($scope.config.onFilterChange) {
            $scope.config.onFilterChange($scope.config.appliedFilters);
          }
        };
      },

      link: function (scope, element, attrs) {
        scope.$watch('config', function () {
          scope.setupConfig();
        }, true);
      }
    };
  }
);
