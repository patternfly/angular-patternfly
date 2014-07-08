'use strict';
/**
 * @ngdoc directive
 * @name patternfly.autofocus:pfAutofocus
 * @restrict A
 * @element form
 *
 * @description
 * Adds the {@link http://www.w3schools.com/tags/att_input_autofocus.asp autofocus} functionality to AngularJS forms.
 * Simply put it as an attribute directive to your form to make it work.
 *
 * @example
 <example module="patternfly.autofocus">

 <file name="index.html">
   <div>
     <form class="form-horizontal" pf-autofocus>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="i1">Unfocused input:</label>
         <div class="col-sm-10">
           <input class="form-control" id="i1" ng-model="i1"></input>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="i2">Another unfocused:</label>
         <div class="col-sm-10">
           <input class="form-control" id="i2" ng-model="i2"></input>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="i3">Focused input:</label>
         <div class="col-sm-10">
           <input class="form-control" id="i3" ng-model="i3" autofocus></input>
         </div>
       </div>

     </form>
   </div>
 </file>
 </example>
 */
angular.module('patternfly.autofocus', []).directive('pfAutofocus', function($timeout) {
  return {
    priority: 1,
    restrict: 'A',
    link: function (scope, element) {
      $timeout(function () {
        var elems = element.find('[autofocus]');
        if (elems && elems.length > 0) {
          elems[0].focus();
        }
      }, 0);
    }
  };
})

/**
 * @ngdoc directive
 * @name patternfly.autofocus:pfFocused
 * @restrict A
 * @element ANY
 * @param {expression=} pfFocused If the expression is true, the element is focused and selected (if possible).
 *
 * @description
 * The focus on element is evaluated from given expression. If the expression provided as an attribute to this directive
 * is evaluated as true, the element is selected (and focused).
 *
 * @example
 <example module="patternfly.autofocus">

 <file name="index.html">
   <div>
   <form class="form-horizontal">

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i1">Focus next input:</label>
       <div class="col-sm-10">
         <input class="form-control" id="i1" ng-model="isFocus" type="checkbox"></input>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i2">Focused input:</label>
       <div class="col-sm-10">
         <input class="form-control" id="i1" ng-model="i2" pf-focused="isFocus" placeholder="This will be selected after checking the box above."></input>
       </div>
     </div>

   </form>
   </div>
 </file>

 </example>
 */

.directive('pfFocused', function($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.pfFocused, function(newValue) {
        $timeout(function () {
          if (newValue) {
            element[0].focus();
            if (element[0].select) {
              element[0].select();
            }
          }
        });
      });
    }
  };
});