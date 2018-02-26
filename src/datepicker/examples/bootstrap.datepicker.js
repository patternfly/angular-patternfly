/**
 * @ngdoc directive
 * @name patternfly.datepicker.componenet:pfBootstrapDatepicker
 * @element pf-bootstrap-datepicker
 *
 * @param {date} date Must be a Javascript Date - to be displayed in the input. Can be left empty.
 * @param {string} format Optional date format for displayed dates ('MM/dd/yyyy' by default).
 * @param {boolean} isOpen Optional boolean for determining whether or not to have the datepicker default to open (false by default).
 * @param {string} popupPlacement Optional configuration string used to position the popup datepicker relative to the input element. See {@link https://angular-ui.github.io/bootstrap/#datepickerPopup Angular UI Datepicker Popup}.
 * @param {object} dateOptions Optional uib-datepicker configuration object. See {@link https://angular-ui.github.io/bootstrap/#datepicker Angular UI Datepicker}.
 *
 * @description
 * A wrapper for the Angular UI {@link http://angular-ui.github.io/bootstrap/#!#datepickerPopup datepicker}.
 *
 * @example
 <example module="patternfly.datepicker">

   <file name="index.html">
      <div ng-controller="DemoBootstrapDatepicker">
          <pf-bootstrap-datepicker
                   date="date">
          </pf-bootstrap-datepicker>
          <pf-bootstrap-datepicker
                   date=""
                   format="{{format1}}"
                   is-open="isOpen"
                   popup-placement="{{popupPlacement}}"
                   date-options="dateOptions">
          </pf-bootstrap-datepicker>
      </div>
   </file>

   <file name="script.js">
   angular.module('patternfly.datepicker').controller('DemoBootstrapDatepicker', function( $scope ) {

      // first datepicker
      $scope.date = new Date("Jan 1, 2000");

      // second datepicker
      $scope.format1 = "MM/dd/yy";
      $scope.dateOptions = {
        showWeeks : true
      };
      $scope.isOpen = true;
      $scope.popupPlacement = "bottom-left";
   });
   </file>

   </example>
 */
