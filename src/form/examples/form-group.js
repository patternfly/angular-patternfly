/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormGroup
 *
 * @description
 *  Encapsulates the structure and styling for a label + input used within a
 *  Bootstrap3 based form.
 *
 *  This directive creates new scope.
 *
 * @param {string} pfLabel the text for the <label> element.
 * @param {string} pfFieldId the id of the form field. Default value is id of the form field element.
 * @param {string} pfLabelClass the class of the label element. Default value is "col-sm-2".
 * @param {string} pfInputClass the class of the input element. Default value is "col-sm-5".
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <form class="form-horizontal" ng-controller="FormDemoCtrl">

       <p>Name: {{ item.name }}</p>
       <p>Description: {{ item.description }}</p>
       <pf-form-group pf-label="Name" required>
         <input id="name" name="name"
                ng-model="item.name" type="text" required/>
       </pf-form-group>

       <pf-form-group pf-input-class="col-sm-9" pf-label="Description">
         <textarea id="description" name="description" ng-model="item.description">
           {{ item.description }}
         </textarea>
       </pf-form-group>
     </form>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.form' ).controller( 'FormDemoCtrl', function( $scope ) {
       $scope.item = {
         name: 'Homer Simpson',
         description: 'I like donuts and Duff.  Doh!'
       };
     });
   </file>
 </example>
*/
