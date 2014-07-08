'use strict';
/**
 * @ngdoc directive
 * @name patternfly.formgroup:pfFormGroup
 * @restrict E
 * @scope
 *
 * @description
 * The main form element created to get rid of the patternfly forms boilerplate.
 *
 * @param {string=} pfId ID used in the input element and its matching label. If not specified ID is randomly generated.
 * @param {string=} pfLabelClass The class of the label element. Default value is "col-sm-2".
 * @param {string=} pfInputClass The class of the input element. Default value is "col-sm-10".
 * @param {string=} pfLabelText The label text.
 *
 * @example
 <example module="patternfly.formgroup">

 <file name="index.html">
   <div ng-controller="FormGroupDemoCtrl">
     <form class="form-horizontal">
       <pf-form-group pf-label-text="Long input:">
          <input type="text" ng-model="test"></input>
       </pf-form-group>

       <pf-form-group pf-label-class="col-sm-6" pf-input-class="col-sm-6" pf-label-text="Short input:" pf-id="id2">
          <input type="text" class="form-control" ng-model="test"></input>
       </pf-form-group>

       <hr/>
       <p>This is how the boilerplate looks like:</p>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
           <input type="text" ng-model="test" class="form-control"></input>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function FormGroupDemoCtrl($scope) {
    $scope.header = 'Default Header.';
    $scope.message = 'Default Message.';
    $scope.test = 'testing message';
  }
 </file>

 </example>
 */
angular.module('patternfly.formgroup', []).directive('pfFormGroup', function () {
  return {
    restrict: 'E',
    transclude: true,
    link: function (scope, element, attrs, ctrl, transclude) {

      if (!attrs.pfId){
        attrs.pfId = 'pfID' + Math.floor((Math.random()*1000000)+1);
      }

      if (!attrs.pfLabelClass) {
        attrs.pfLabelClass = 'col-sm-2';
      }

      if (!attrs.pfInputClass) {
        attrs.pfInputClass = 'col-sm-10';
      }

      element.append('<div class="form-group">' +
      '<label class="control-label ' + attrs.pfLabelClass + '" for="' + attrs.pfId + '">' + attrs.pfLabelText + '</label>' +
      '<div class="' + attrs.pfInputClass + '">' +
      '</div>' +
      '</div>');

      transclude(scope, function (clone) {
        var transcludeDiv = angular.element(element.find('div').get(1));
        transcludeDiv.append(clone);
        var transcludeInput = angular.element(transcludeDiv.find('input').get(0));
        transcludeInput.addClass('form-control');
        transcludeInput.attr('id', attrs.pfId);
      });
    }
  };
});