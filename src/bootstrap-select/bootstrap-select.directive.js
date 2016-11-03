/**
 * @ngdoc directive
 * @name patternfly.bsselect:pfBootstrapSelect
 * @element select
 *
 * @param {array=} selections - List of possible selections. Value displayed will be the objects' label field or the object itself
 * @param {object?} currentSelection - The current selected object
 * @param {string?} updateOnSelect - Flag to update the current selected object on user seleection, optional - default is true
 * @param {function?} onChange - Optional callback function when user selection is made
 * @param {string?} placeholder - placeholder text to show when there is no current selection
 * @param {string?}  dropdownMenuClass - Class to add to the dropdown menu (typically dropdown-menu-right and such)
 *
 * @description
 * An AngularJS wrapper for the {@link  https://angular-ui.github.io/bootstrap/#/dropdown} Angular Bootstrap dropdown directive
 *
 * @example
 <example module="patternfly.bsselect" deps="">

 <file name="index.html">
 <div ng-controller="SelectDemoCtrl">

 <form class="form-horizontal">
   <div class="form-group">
     <label class="col-sm-2 control-label" for="pet">Preferred pet:</label>
     <div class="col-sm-4">
       <div pf-bootstrap-select selections="pets" current-selection="pet" placeholder="No pet selected">
         </div>
       </div>
   </div>
 </form>

 <p>Your preferred pet is {{pet || 'None'}}.</p>

 </div>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.bsselect' ).controller( 'SelectDemoCtrl', function( $scope ) {
       $scope.pets = ['Dog', 'Cat', 'Chicken'];
       $scope.pet = null;
     });
 </file>

 </example>
 */
angular.module('patternfly.bsselect').directive('pfBootstrapSelect', ['$timeout', function ($timeout) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      selections: '=',
      currentSelection: '=?',
      updateOnSelect: '@',
      onChange: "=?",
      placeholder: '@',
      dropdownMenuClass: "@"
    },
    templateUrl: 'bootstrap-select/bootstrap-select.html',
    controller: function ($scope) {
      $scope.menuOpen = false;
      $scope.updateOnSelect = !angular.isDefined($scope.updateOnSelect) || $scope.updateOnSelect !== 'false' || $scope.updateOnSelect === false;

      $scope.selectItem = function (item) {
        if ($scope.updateOnSelect === true) {
          $scope.currentSelection = item;
        }
        if (angular.isFunction($scope.onChange)) {
          $scope.onChange(item);
        }
        $scope.menuOpen = false;
      };
    },
    link: function (scope, element, attrs) {
      scope.onItemKeyPress = function (keyEvent, item) {
        if (keyEvent.which === 13) {
          scope.selectItem(item);
        }
      };

      scope.onItemKeyDown = function (keyEvent, item) {
        if (keyEvent.which === 32) {
          keyEvent.preventDefault();
          scope.selectItem(item);
        }
      };
    }
  };
}]);
