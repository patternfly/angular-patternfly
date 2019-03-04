/**
 * @ngdoc directive
 * @name patternfly.pagination.directive:pfPagination
 * @restrict E
 *
 * @param {number} pageNumber The current page number
 * @param {number} numTotalItems The total number of items in the data set.  When a filter is applied, update the <code>numTotalItems</code>
 * accordingly.
 * @param {Array<Number>} pageSizeIncrements (optional) Page size increments for the 'per page' dropdown.  If not
 * specified, the default values are: [5, 10, 20, 40, 80, 100]
 * @param {number} pageSize (optional) The initial page size to use.  If not specified, the default will be
 * the first increment in the <code>pageSizeIncrements</code> array.
 * @description
 * Component for pagination controls used in various views (list, card, table)
 *
 * @example
 <example module="patternfly.pagination">

 <file name="index.html">
   <div ng-controller="PageCtrl">
     <div class="col-md-12">
       <div ng-repeat="item in items | startFrom:(pageNumber - 1)*pageSize | limitTo:pageSize" class="col-md-12">
         <div class="row">
           <div class="col-md-3">
             <span>{{item.id}}</span>
           </div>
           <div class="col-md-7">
             <span>{{item.status}}</span>
           </div>
           <div class="col-md-2">
             <span>{{item.value}}</span>
           </div>
         </div>
       </div>
     </div>
     <pf-pagination
         page-size="pageSize"
         page-number="pageNumber"
         num-total-items="numTotalItems">
     </pf-pagination>
   </div>
 </file>
 <file name="script.js">
 angular.module( 'patternfly.pagination').controller( 'PageCtrl', function( $scope ) {
   $scope.pageSize = 10;
   $scope.pageNumber = 1;

   $scope.items = [];
   for(i = 1; i <= 126; i++) {
      $scope.items.push({id: i, status: 'Ok', value: Math.floor(Math.random() * (1000 - 1 + 1)) + 1});
   }

   $scope.numTotalItems = $scope.items.length;
 });
 </file>
 </example>
 */
angular.module('patternfly.pagination').component('pfPagination', {
  transclude: true,
  templateUrl: 'pagination/pagination.html',
  bindings: {
    pageNumber: '=?',
    numTotalItems: "<",
    pageSizeIncrements: '<?',
    pageSize: "=?",
    updatePageSize: "&",
    updatePageNumber: "&"
  },
  controller: function ($scope, $log) {
    'use strict';
    var ctrl = this;

    var defaultPageSizeIncrements = [5, 10, 20, 40, 80, 100];

    ctrl.$onInit = function () {
      if (angular.isUndefined(ctrl.pageNumber)) {
        ctrl.pageNumber = 1;
      }
      if (angular.isUndefined(ctrl.pageSizeIncrements)) {
        ctrl.pageSizeIncrements = defaultPageSizeIncrements;
      }
      if (angular.isUndefined(ctrl.pageSize)) {
        ctrl.pageSize = ctrl.pageSizeIncrements[0];
      }
      ctrl.lastPageNumber = getLastPageNumber();
    };

    ctrl.$onChanges = function (changesObj) {
      if (changesObj.numTotalItems && !changesObj.numTotalItems.isFirstChange()) {
        ctrl.lastPageNumber = getLastPageNumber();
        ctrl.gotoFirstPage();
      }
    };

    ctrl.onPageSizeChange = function (newPageSize) {
      ctrl.pageSize = newPageSize;
      ctrl.lastPageNumber = getLastPageNumber();
      ctrl.gotoFirstPage();
      if (ctrl.updatePageSize) {
        ctrl.updatePageSize({
          $event: {
            pageSize: newPageSize
          }
        });
      }
    };

    ctrl.onPageNumberChange = function () {
      var newPageNumber = parseInt(ctrl.pageNumber, 10);
      if (newPageNumber > ctrl.lastPageNumber) {
        updatePageNumber(ctrl.lastPageNumber);
      } else if (newPageNumber < 1 || isNaN(ctrl.pageNumber)) {
        updatePageNumber(1);
      } else {
        updatePageNumber(newPageNumber);
      }
    };

    ctrl.gotoFirstPage = function () {
      if (ctrl.pageNumber !== 1) {
        updatePageNumber(1);
      }
    };

    ctrl.gotoPreviousPage = function () {
      if (ctrl.pageNumber !== 1) {
        updatePageNumber(ctrl.pageNumber - 1);
      }
    };

    ctrl.gotoNextPage = function () {
      if (ctrl.pageNumber < ctrl.lastPageNumber) {
        updatePageNumber(ctrl.pageNumber + 1);
      }
    };

    ctrl.gotoLastPage = function () {
      if (ctrl.pageNumber < ctrl.lastPageNumber) {
        updatePageNumber(ctrl.lastPageNumber);
      }
    };

    ctrl.getStartIndex = function () {
      return ctrl.numTotalItems ? ctrl.pageSize * (ctrl.pageNumber - 1) + 1 : 0;
    };

    ctrl.getEndIndex = function () {
      var numFullPages = Math.floor(ctrl.numTotalItems / ctrl.pageSize);
      var numItemsOnLastPage = ctrl.numTotalItems - (numFullPages * ctrl.pageSize) || ctrl.pageSize;
      var numItemsOnPage = isLastPage() ? numItemsOnLastPage : ctrl.pageSize;
      return ctrl.numTotalItems ? ctrl.getStartIndex() + numItemsOnPage - 1 : 0;
    };

    function updatePageNumber (newPageNumber) {
      ctrl.pageNumber = newPageNumber;
      if (ctrl.updatePageNumber) {
        ctrl.updatePageNumber({
          $event: {
            pageNumber: ctrl.pageNumber
          }
        });
      }
    }

    function getLastPageNumber () {
      return Math.ceil(ctrl.numTotalItems / ctrl.pageSize);
    }

    function isLastPage () {
      return ctrl.pageNumber === ctrl.lastPageNumber;
    }
  }
});
