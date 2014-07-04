'use strict';
/**
 * @ngdoc directive
 * @name patternfly.validation:pfValidation
 * @restrict E
 * @element INPUT
 * @scope
 *
 * @description
 * Directive used for input validation based on custom function.
 *
 * @param {expression=} pfValidationEnabled If true, the validation is enabled, it is disabled otherwise.
 *
 * @example
 <example module="patternfly.validation">

 <file name="index.html">
   <div ng-controller="ValidationDemoCtrl">
   <form class="form-horizontal">
     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Number:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)" pf-validation-enabled="isValidationEnabled"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Validation enabled:</label>
       <div class="col-sm-10">
         <input class="form-control" type="checkbox" ng-model="isValidationEnabled"/>
       </div>
     </div>
   </form>
   </div>
 </file>

 <file name="script.js">
 function ValidationDemoCtrl($scope) {
    $scope.myValue = "Change this value to be a number";
    $scope.isValidationEnabled = true;

    $scope.isNumber = function(value) {

      if (isNaN(value)){
        return false;
      }

      return true;
    }
  }
 </file>

 </example>
 */
angular.module('patternfly.validation', []).directive('pfValidation', function($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      pfValidation: '&',
      pfValidationEnabled: '='
    },
    link: function (scope, element, attrs, ctrl) {
      scope.inputCtrl = ctrl;
      scope.valEnabled = attrs.pfValidationEnabled;

      scope.$watch('pfValidationEnabled', function(newVal){
        scope.valEnabled = newVal;
        if (!newVal) {
          scope.inputCtrl.$setValidity('pfValidation',true);
          toggleErrorClass(false);
        } else {
          validate();
        }
      });

      // If validation function is set
      if (attrs.pfValidation) {
        // using $timeout(0) to get the actual $modelValue
        $timeout(function () {
          validate();
        }, 0);
      } else if (!scope.inputCtrl.$valid && scope.inputCtrl.$dirty){
        toggleErrorClass(true);
      }

      scope.$watch('inputCtrl.$valid', function(isValid){
        if (scope.inputCtrl.$dirty) {
          if (isValid) {
            toggleErrorClass(false);
          } else {
            toggleErrorClass(true);
          }
        }
      });

      scope.$watch('inputCtrl.$modelValue', function(newVal){
        var valid = !newVal || scope.pfValidation( {'input': newVal} ) || newVal === '';
        if (scope.valEnabled && !valid){
          scope.inputCtrl.$setValidity('pfValidation',false);
        } else {
          scope.inputCtrl.$setValidity('pfValidation',true);
        }
      });

      function validate() {
        var val = scope.inputCtrl.$modelValue;

        var valid = !val || scope.pfValidation({'input':val})  || val === '';
        if (scope.valEnabled && !valid){
          toggleErrorClass(true);
        }
      }

      function toggleErrorClass(add) {
        var messageElement = element.next();
        var parentElement = element.parent();

        if (add && !parentElement.hasClass('has-error')){
          parentElement.addClass('has-error');
          messageElement.removeClass('ng-hide');
        }

        if (!add && parentElement.hasClass('has-error')){
          parentElement.removeClass('has-error');
          messageElement.addClass('ng-hide');
        }
      }
    }
  };
});