/**
 * @ngdoc directive
 * @name patternfly.jquery.directive:pfDatepicker
 *
 * @description
 *  Angular directive to wrap the bootstrap datepicker http://bootstrap-datepicker.readthedocs.org/en/latest/
 *
 * @param {string} date the date model
 * @param {string} options the configuration options for the date picker
 *
 * @example
 <example module="patternfly.datepicker">
   <file name="index.html">
     <form class="form-horizontal" ng-controller="FormDemoCtrl">
     <div>
       <button ng-click=setToday()>Set Today in Angular Model</button>
      </div>
      Date: <span ng-bind="date | date:'MM/dd/yyyy'"></span>
      <div pf-datepicker options="options" date="date"></div>
     </form>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.jquery' ).controller( 'FormDemoCtrl', function( $scope ) {
       $scope.setToday = function () {
         $scope.date = new Date();
       }

       $scope.options = {
         autoclose: true,
         todayBtn: 'linked',
         todayHighlight: true
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.jquery').directive('pfDatepicker', function () {
  'use strict';

  return {
    replace: true,
    restrict: 'A',
    require: '^form',
    templateUrl: 'form/datepicker/datepicker.html',
    scope: {
      options: '=',
      date: '='
    },
    link: function ($scope, element) {

      //Make sure the date picker is set with the correct options
      element.datepicker($scope.options);

      //Set the initial value of the date picker
      element.datepicker('update', $scope.date);

      //Change happened on the date picker side. Update the underlying date model
      element.datepicker($scope.date).on('changeDate', function (elem) {
        $scope.$apply(function () {
          $scope.date = elem.date;
        });
      });

      //Update the date picker if there is a change on the date model
      $scope.$watch('date', function (newValue, oldValue) {
        if (oldValue !== newValue) {
          element.datepicker('update', newValue);
        }
      });
    }
  };
});
