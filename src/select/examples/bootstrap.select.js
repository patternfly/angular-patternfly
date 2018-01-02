/**
 * @ngdoc directive
 * @name patternfly.select.directive:pfBootstrapSelect
 * @element select
 *
 * @param {string} ngModel Model binding using the {@link https://docs.angularjs.org/api/ng/type/ngModel.NgModelController/ NgModelController} is mandatory.
 * @param {string=} ngOptions The `{@link https://docs.angularjs.org/api/ng/directive/select/ ngOptions}` attribute can be used to dynamically generate a list of `<option>`
 * elements for the `<select>` element.
 *
 * @description
 * An AngularJS wrapper for the {@link http://silviomoreto.github.io/bootstrap-select/ Bootstrap-select} jQuery plugin which is used
 * as a default select decorator in {@link https://www.patternfly.org/widgets/#bootstrap-select Patternfly}.
 *
 * @example
 <example module="patternfly.select">

   <file name="index.html">
     <div ng-controller="SelectDemoCtrl">

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="pet">Preferred pet:</label>
         <div class="col-sm-10">
          <select pf-bootstrap-select ng-model="pet" id="pet" ng-options="o as o for o in pets"></select>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="fruit">Preferred fruit:</label>
         <div class="col-sm-10">
           <select pf-bootstrap-select ng-model="fruit" id="fruit">
             <option value="orange">Orange</option>
             <option value="apple" ng-selected="true" selected>Apple</option>
             <option value="banana">Banana</option>
           </select>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="drink">Preferred drink:</label>
         <div class="col-sm-10">
           <select pf-bootstrap-select="{ noneSelectedText: 'None' }" ng-model="drink" id="drink" ng-options="o as o for o in drinks">
             <option value="">No drink selected</option>
           </select>
         </div>
       </div>

     </form>

     <p>Your preferred pet is {{pet}}.</p>
     <p>Your preferred fruit is {{fruit}}.</p>
     <p>Your preferred drink is {{drink || 'No drink selected'}}.</p>

     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.select' ).controller( 'SelectDemoCtrl', function( $scope ) {
       $scope.drinks = ['tea', 'coffee', 'water'];
       $scope.pets = ['Dog', 'Cat', 'Chicken'];
       $scope.pet = $scope.pets[0];
       $scope.fruit = 'orange';
     });
   </file>

 </example>
 */
