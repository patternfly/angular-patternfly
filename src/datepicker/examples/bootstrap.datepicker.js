/**
 * @ngdoc directive
 * @name patternfly.datepicker.componenet:pfBootstrapDatepicker
 * @element pf-bootstrap-datepicker
 *
 * @param {date} date Must be a Javascript Date - to be displayed in the input. Can be left empty.
 * @param {string} format Optional date format for displayed dates ('MM/dd/yyyy' by default).
 * @param {function} on-date-change Optional user defined function which is called when the date is changed by the picker.<br/>
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
      <div ng-controller="DemoBootstrapDatepicker" class="row example-container">
        <div class="form-group">
          <label class="col-sm-2 control-label" for="date-one">Date One:</label>
            <pf-bootstrap-datepicker
                   id="date-one"
                   date="dateOne"
                   on-date-change="firstDateChanged(newDate)">
            </pf-bootstrap-datepicker>
          <label class="col-sm-2 control-label" for="date-one">Date Two:</label>
            <pf-bootstrap-datepicker
                   id="date-two"
                   date="dateTwo"
                   format="{{format1}}"
                   is-open="isOpen"
                   popup-placement="{{popupPlacement}}"
                   date-options="dateOptions"
                   on-date-change="secondDateChanged(newDate)">
            </pf-bootstrap-datepicker>
        </div>
        <div class="col-md-12">
          <label style="font-weight:normal;vertical-align:center;">Events: </label>
        </div>
        <div class="col-md-12">
          <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
        </div>
      </div>
   </file>

   <file name="script.js">
   angular.module('patternfly.datepicker').controller('DemoBootstrapDatepicker', function( $scope ) {
      $scope.eventText = '';

      // first datepicker
      $scope.dateOne = new Date("Jan 1, 2000");
      $scope.firstDateChanged = function(date) {
        $scope.eventText = 'Date One Updated to: ' + date + '\r\n' + $scope.eventText;
      };

      // second datepicker
      $scope.dateTwo = new Date("Feb 1, 2000");
      $scope.format1 = "MM/dd/yy";
      $scope.dateOptions = {
        showWeeks : true
      };
      $scope.isOpen = true;
      $scope.popupPlacement = "bottom-left";

      $scope.secondDateChanged = function(date) {
          $scope.eventText = 'Date Two Updated to: ' + date + '\r\n' + $scope.eventText;
       };
   });
   </file>

   </example>
 */
