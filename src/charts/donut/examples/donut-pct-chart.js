/**
 * @ngdoc directive
 * @name patternfly.charts.component:pfDonutPctChart
 * @restrict E
 *
 * @description
 *   Component for rendering a percentage used donut/radial chart.  The Used Percentage fill starts at 12 o’clock and
 *   moves clockwise.  Whatever portion of the donut not Used, will be represented as Available, and rendered as a
 *   gray fill.
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *   The directive will calculate the Available Percentage (Total - Used), and display it as a grey radial fill.
 *
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration properties for the donut chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId        - the unique id of the donut chart
 * <li>.units          - unit label for values, ex: 'MHz','GB', etc..
 * <li>.thresholds     - warning and error percentage thresholds used to determine the Usage Percentage fill color (optional)
 * <li>.tooltipFn(d)   - user defined function to customize the tool tip (optional)
 * <li>.centerLabelFn  - user defined function to customize the text of the center label (optional)
 * <li>.onClickFn(d,i) - user defined function to handle when donut arc is clicked upon.
 * <li>.labelConfig    - object containing properties for external label (optional) - default: undefined
 *   <ul>
 *       <li>.orientation - string with possible values: 'left', 'right' (optional) - default: 'center'
 *       <li>.title       - string representing a prefix or title (optional) - default: empty string
 *       <li>.label       - the wording format to display, possible values: 'used', 'available', 'percent', 'none' (optional) - default: 'used'
 *       <li>.units       - unit label for values, ex: 'MHz','GB', etc.. (optional) - default: empty string
 *       <li>.labelFn     - function to customize the text of the external label. This callback returns no data. Updated display data can be accessed through the passed and updated parameter 'data'. (optional) - default: undefined
 *   </ul>
 * </li>
 * </ul>
 *
 * @param {object} data the Total and Used values for the donut chart.  Available is calculated as Total - Used.<br/>
 * <ul style='list-style-type: none'>
 * <li>.used          - number representing the amount used
 * <li>.percent       - number representing the percentage used
 * <li>.total         - number representing the total amount
 * <li>.dataAvailable - Flag if there is data available - default: true
 * </ul>
 *
 * @param {string=} center-label specifies the contents of the donut's center label.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'used'      - displays the Used amount in the center label (default)
 * <li> 'available' - displays the Available amount in the center label
 * <li> 'percent'   - displays the Usage Percent of the Total amount in the center label
 * <li> 'none'      - does not display the center label
 * </ul>
 *
 * @param {int=} chartHeight height of the donut chart
 * @param {function (threshold)} on-threshold-change user defined function to handle when thresolds change <br/>
 * <strong>'threshold' Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'ok'      - when ok threshold is set
 * <li> 'warning' - when warning threshold is set
 * <li> 'error'   - when error threshold is set
 * </ul>


 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div class="container-fluid">
         <div class="row">
           <div class="col-md-3 text-center">
             <label>Error Threshold</label>
             <p class="text-right">
               <pf-donut-pct-chart config="configErr" data="dataErr" chart="chartErr"></pf-donut-pct-chart>
             </p>
           </div>
           <div class="col-md-3 text-center">
             <label>Warning Threshold</label>
             <pf-donut-pct-chart config="configWarn" data="dataWarn"></pf-donut-pct-chart>
           </div>
           <div class="col-md-3 text-center">
             <label class="camelcase">{{threshLabel}} Threshold</label>
             <p class="text-left">
               <pf-donut-pct-chart config="configDynamic" data="dataDynamic" center-label="labelDynamic"
                                   on-threshold-change="thresholdChanged(threshold)">
               </pf-donut-pct-chart>
             </p>
           </div>
           <div class="col-md-3 text-center">
             <label>No Threshold</label>
             <pf-donut-pct-chart config="configNoThresh" data="dataNoThresh"></pf-donut-pct-chart>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12">
             <hr>
           </div>
         </div>

         <div class="row">
           <div class="col-md-3 text-center">
             <label>center-label = 'used'</label>
             <pf-donut-pct-chart config="usedConfig" data="usedData" center-label="usedLabel"></pf-donut-pct-chart>
           </div>
           <div class="col-md-3 text-center">
             <label>center-label = 'available'</label>
             <pf-donut-pct-chart config="availConfig" data="availData" center-label="availLabel"></pf-donut-pct-chart>
           </div>
           <div class="col-md-3 text-center">
             <label>center-label = 'percent'</label>
             <pf-donut-pct-chart config="pctConfig" data="pctData" center-label="pctLabel"></pf-donut-pct-chart>
           </div>
           <div class="col-md-3 text-center">
             <label>center-label = 'none'</label>
             <pf-donut-pct-chart config="noneConfig" data="noneData" center-label="noLabel"></pf-donut-pct-chart>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12">
             <hr>
           </div>
         </div>

         <div class="row">
           <div class="col-md-4 text-center">
             <label>Sized with orientation left 'configLabel'</label>
             <p class="text-right">
               <pf-donut-pct-chart config="configOrientationLeft" data="dataOrientationLeft"></pf-donut-pct-chart>
             </p>
           </div>
           <div class="col-md-4 text-center">
             <label>Sized with 'configLabel'</label>
             <pf-donut-pct-chart config="configOrientationCenter" data="dataOrientationCenter"></pf-donut-pct-chart>
           </div>
           <div class="col-md-4 text-center">
             <label>Sized with orientation right 'configLabel'</label>
             <p class="text-left">
               <pf-donut-pct-chart config="configOrientationRight" data="dataOrientationRight"></pf-donut-pct-chart>
             </p>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12">
             <hr>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12 text-center">
             <label>Custom Tooltip, Legend, Click handling, and Center Label</label><br>
             <label><strong>Click on Donut Arc!</strong></label>
             <pf-donut-pct-chart config="custConfig" chart-height="custChartHeight" data="custData"></pf-donut-pct-chart>
           </div>
         </div>
         <div class="row">
           <div class="col-md-3">
             <form role="form">
               <div class="form-group">
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="custData.dataAvailable">Data Available</input>
                 </label>
               </div>
             </form>
           </div>
           <div class="col-md-3">
             <form role="form" >
               <div class="form-group">
                 <label>Chart Height</label>
                 </br>
                 <input style="height:25px; width:60px;" type="number" ng-model="custChartHeight"/>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope, $interval ) {
       // start demo 1st row
       $scope.configErr = {
         'chartId': 'chartErr',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataErr = {
         'used': '950',
         'total': '1000'
       };

       $scope.ChartErr = {};

       $scope.configWarn = {
         'chartId': 'chartWarn',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataWarn = {
         'used': '650',
         'total': '1000'
       };

       $scope.configDynamic = {
         'chartId': 'chartOk',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataDynamic = {
         'used': '550',
         'total': '1000'
       };

       $scope.labelDynamic = "used";

       $scope.thresholdChanged = function(threshold) {
          $scope.threshLabel = threshold;
       };

       $interval(function () {
         $scope.dataDynamic.used = Number($scope.dataDynamic.used) + 40;
         if ($scope.dataDynamic.used > 1000) {
           $scope.dataDynamic.used = 10;
         }

         if ($scope.dataDynamic.used < 500) {
           $scope.labelDynamic = "used";
         } else {
           $scope.labelDynamic = "percent";
         }
       }, 1000);

       $scope.configNoThresh = {
         'chartId': 'chartNoThresh',
         'units': 'GB'
       };

       $scope.dataNoThresh = {
         'used': '750',
         'total': '1000'
       };

       //start demo 2nd row
       $scope.usedConfig = {
         'chartId': 'usedChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.usedData = {
         'used': '350',
         'total': '1000'
       };

       $scope.usedLabel = "used";

       $scope.availConfig = {
         'chartId': 'availChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.availData = {
          'used': '350',
          'total': '1000'
        };

       $scope.availLabel = "available";

       $scope.pctConfig = {
         'chartId': 'pctChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.pctData = {
         'used': '350',
         'total': '1000'
       };

       $scope.pctLabel = "percent";

       $scope.noneConfig = {
         'chartId': 'noneChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.noneData = {
         'used': '350',
         'total': '1000'
       };

       $scope.noLabel = "none";

       //start demo 3rd row
       $scope.configOrientationLeft = {
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'},
         'labelConfig': {
           'orientation': 'left',
           'labelFn': function () {
             return "<strong>Lorem ipsum</strong><br/>" + $scope.dataOrientationLeft.used + " GB used";
           }
         },
         'size': {
           'height': 85,
           'width': 85
         },
         'centerLabelFn': function () {
           return $scope.dataOrientationLeft.used + "GB";
         }
       };

       $scope.dataOrientationLeft = {
         'used': '350',
         'total': '1000'
       };

       $scope.configOrientationCenter = {
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'},
         'labelConfig': {
           'label': 'available',
           'units': 'GB',
           'title': 'Lorem ipsum,'
         },
         'size': {
           'height': 115,
           'width': 115
         },
         'centerLabelFn': function () {
           return $scope.dataOrientationCenter.used + "GB";
         }
       };

       $scope.dataOrientationCenter = {
          'used': '350',
          'total': '1000'
        };

       $scope.configOrientationRight = {
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'},
         'labelConfig': {
           'orientation': 'right',
           'labelFn': function () {
             return "<strong>Lorem ipsum</strong><br/>" + $scope.dataOrientationRight.percent + "% used";
           }
         },
         'size': {
           'height': 85,
           'width': 85
         },
         'centerLabelFn': function () {
           return $scope.dataOrientationRight.percent + "%";
         }
       };

       $scope.dataOrientationRight = {
         'used': '350',
         'total': '1000'
       };

       //start demo 4th row
       $scope.custConfig = {
         'chartId': 'custChart',
         'units': 'MHz',
         'thresholds':{'warning':'60','error':'90'},
         "legend":{"show":true},
         'tooltipFn': function (d) {
           return '<span class="donut-tooltip-pf"style="white-space: nowrap;">' +
                    d[0].value + ' ' + d[0].name +
                  '</span>';
           },
         'centerLabelFn': function () {
           return $scope.custData.available + " GB";
           },
         'onClickFn': function (d, i) {
           alert("You Clicked On The Donut!");
           }
         };

       $scope.custData = {
         'dataAvailable': true,
         'used': '670',
         'total': '1000'
       };

       $scope.custChartHeight = 200;
     });
   </file>
 </example>
 */

