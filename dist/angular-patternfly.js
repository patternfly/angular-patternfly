/**
 * @name  patternfly card
 *
 * @description
 *   Card module for patternfly.
 *
 */
angular.module('patternfly.card', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Charts module for patternfly. Must Include d3.js and c3.js to use
 *
 */
angular.module('patternfly.charts', []);

;/**
 * @name  patternfly.form
 *
 * @description
 *   Module for formting related functionality, primarily filters.
 */
angular.module('patternfly.form', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Base module for patternfly.
 */
angular.module('patternfly', [
  'patternfly.autofocus',
  'patternfly.card',
  'patternfly.form',
  'patternfly.notification',
  'patternfly.select',
  'patternfly.validation'
]);

;'use strict';
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

angular.module('patternfly.autofocus', []).directive('pfFocused', function($timeout) {
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
;/**
 * @ngdoc directive
 * @name patternfly.card:pfCard
 * @restrict A
 * @element ANY
 * @param {headTitle=} Title for the card - required
 * @param {subtTtle=} Subtitle for the card - optional
 * @param {showTopBorder=} Show Top Border, true shows top border, false (default) hides top border - optional
 *
 * @description
 * Directive for easily displaying a card with html content
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
    <div pf-card head-title="My Card Title" sub-title="My card subtitle" show-top-border="true">
      <button>Click Me</button>
    </div>
 </file>

 </example>
 */
angular.module('patternfly.card').directive('pfCard', function() {
  'use strict';

  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headTitle: '@',
      subTitle: '@',
      showTopBorder: '@'
    }
  };
});


;'use strict';
angular.module('patternfly.charts').constant('c3ChartDefaults', {
  getDefaultDonut: function (title) {
    return {
      title: title,
      label: {
        show: false
      },
      width: 10
    };
  },
  getDefaultDonutSize: function () {
    return {
      height: 130
    };
  },
  getDefaultDonutColor: function () {
    return {
      pattern: ['#0088CE', '#D1D1D1']
    };
  },
  getDefaultDonutTooltip: function () {
    return {
      show: false
    };
  },
  getDefaultDonutLegend: function () {
    return {
      show: false
    };
  },
  getDefaultDonutConfig: function (title) {
    return {
      donut: this.getDefaultDonut(title),
      size: this.getDefaultDonutSize(),
      legend: this.getDefaultDonutLegend(),
      color: this.getDefaultDonutColor(),
      tooltip: this.getDefaultDonutTooltip()
    };
  }
});
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfC3Chart
 *
 * @description
 *   Directive for wrapping c3 library
 *
 *   Note: The 'patternfly.charts' module is not a dependency in the default angular 'patternfly' module.
 *   In order to use patternfly charts you must add 'patternfly.charts' as a dependency in your application.
 *
 *
 * @param {string} id the ID of the container that the chart should bind to
 * @param {expression} config the c3 configuration options for the chart
 *
 * @example
 <example module="patternfly.charts">
<file name="index.html">
 <div ng-controller="ChartCtrl">
   <div pf-c3-chart id="chartId"  config="chartConfig"></div>

   <form role="form" style="width:300px">
     Total = {{total}}, Used = {{used}}, Available = {{available}}
     <div class="form-group">
       <label>Used</label>
       <input type="text" class="form-control" ng-model="newUsed">
     </div>
     <input type="button" ng-click="submitform(newUsed)" value="Go" />
   </form>
 </div>
 </file>

<file name="script.js">
 function ChartCtrl($scope) {
    $scope.used = 950;
    $scope.total = 1000;
    $scope.available =  $scope.total - $scope.used;

    $scope.chartConfig = {"donut":
                     {"title":"MHz Used",
                      "label":{"show":false},
                      "width":10
                     },
                     "size":{"height":130},
                     "legend":{"show":false},
                     "color":{"pattern":["#0088CE","#D1D1D1"]},
                     "tooltip":{},
                     "data":{"columns":[["Used","950"],["Available",50]],
                     "type":"donut",
                     "donut":{
                         "label":{"show":false}
                      },
                      "groups":[["used","available"]],
                      "order":null
                      }
                  };

    $scope.updateAvailable = function(val){
      $scope.available =  $scope.total - $scope.used;
    }

    $scope.submitform = function(val){
      $scope.used = val;
      $scope.updateAvailable();
      $scope.chartConfig.data.columns = [["Used",$scope.used],["Available",$scope.available]];
   };
 }
 </file>
 </example>
 */
(function(c3){
  'use strict';

  angular.module('patternfly.charts')
  .directive('pfC3Chart', ['$timeout', function($timeout) {

    return {
      restrict: 'A',
      scope: {
        config: '='
      },
      template: '<div id=""></div>',
      replace: true,
      link: function(scope, element, attrs) {
        scope.$watch('config', function() {
          $timeout(function () {
            //generate c3 chart data
            var chartData = scope.config;
            chartData.bindto = '#' + attrs.id;
            c3.generate(chartData);
          });
        },true);
      }
    };
  }]);
}(c3));
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfDonutPctChart
 *
 * @description
 *   Directive for rendering a percentage used donut/radial chart.  The Used Percentage fill starts at 12 o’clock and
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
 * @param {object} config configuration properties for the donut chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId       - the unique id of the donut chart
 * <li>.units         - unit label for values, ex: 'MHz','GB', etc..
 * <li>.thresholds    - warning and error percentage thresholds used to determine the Usage Percentage fill color (optional)
 * <li>.tooltipFn     - user defined function to customize the tool tip (optional)
 * <li>.centerLabelFn - user defined function to customize the center label (optional)
 * </ul>
 *
 * @param {object} data the Total and Used values for the donut chart.  Available is calculated as Total - Used.<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
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
 * @example
 <example module="patternfly.charts">
 <file name="index.html">
   <style>
     hr {
       display: block;
       height: 1px;
       border: 0;
       border-top: 1px solid #525252;
       margin: 1em 0;
       padding: 0;
     }
   </style>
   <div ng-controller="ChartCtrl" style="display:inline-block;">

     <div class="col-md-4">
       </br> <div pf-donut-pct-chart config="config" data="data"></div>
     </div>

     <div class="col-md-8">
       Total = {{data.total}}, Used = {{data.used}}, Available = {{data.available}}<br/>
       Percent Used = {{(data.used / data.total) * 100;}} %</br>
       Thresholds:</br>
       <div class="col-md-2">
         Error:</br>
         Warning:</br>
         Ok:
       </div>
       <div class="col-md-10">
         {{config.thresholds.error}}% Used (red)</br>
         {{config.thresholds.warning}}% Used (orange)</br>
         Not reached a threshold (blue)
       </div>

       <form role="form" style="width:200px">
         <div class="form-group">
           <label>Show</label>
           </br>
           <label class="radio-inline">
             <input type="radio" ng-model="newUsed" value="950">Error</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="newUsed" value="650">Warning</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="newUsed" value="350">Ok</input>
           </label>
         </div>
       </form>
     </div>

     <div class="col-md-12">
       <hr>
     </div>

     <div class="col-md-3">
       <div pf-donut-pct-chart config="usedConfig" data="usedData" center-label="used"></div>
       center-label =<br> 'used'
     </div>
     <div class="col-md-3">
       <div pf-donut-pct-chart config="availConfig" data="availData" center-label="available"></div>
       center-label =<br> 'available'
     </div>
     <div class="col-md-3">
       <div pf-donut-pct-chart config="pctConfig" data="pctData" center-label="percent"></div>
       center-label =<br> 'percent'
     </div>
     <div class="col-md-3">
       <div pf-donut-pct-chart config="noneConfig" data="noneData" center-label="none"></div>
       center-label =<br> ' none'
     </div>

     <div class="col-md-12">
       <hr>
     </div>

     <div class="col-md-12">
       Custom Tooltip and Center Label
       <div pf-donut-pct-chart config="custConfig" data="custData"></div>
     </div>
   </div>
</file>

<file name="script.js">
   function ChartCtrl($scope) {

     $scope.config = {
       'chartId': 'chartA',
       'units': 'GB',
       'thresholds':{'warning':'60','error':'90'}
     };

     $scope.data = {
         'used': '950',
         'total': '1000'
     };

     $scope.newUsed = $scope.data.used;

     $scope.$watch('newUsed', function(val) {
       $scope.data.used = val;
     });

     $scope.usedConfig = {
       'chartId': 'usedChart',
       'units': 'GB',
       'thresholds':{'warning':'60','error':'90'}
     };

     $scope.usedData = {
         'used': '350',
         'total': '1000'
     };
     $scope.availConfig = {
       'chartId': 'availChart',
       'units': 'GB',
       'thresholds':{'warning':'60','error':'90'}
     };

     $scope.availData = {
         'used': '350',
         'total': '1000'
     };
     $scope.pctConfig = {
       'chartId': 'pctChart',
       'units': 'GB',
       'thresholds':{'warning':'60','error':'90'}
     };

     $scope.pctData = {
         'used': '350',
         'total': '1000'
     };
     $scope.noneConfig = {
       'chartId': 'noneChart',
       'units': 'GB',
       'thresholds':{'warning':'60','error':'90'}
     };

     $scope.noneData = {
         'used': '350',
         'total': '1000'
     };

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
       'centerLabelFn': function (scope) {
         return '<tspan dy="0" x="0" class="donut-title-big-pf">' +
                  scope.data.available + '</tspan>' +
                '<tspan dy="20" x="0" class="donut-title-small-pf">' +
                  'Free' +
                '</tspan>';
       }
     };

     $scope.custData = {
         'used': '670',
         'total': '1000'
     };

   };
 </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfDonutPctChart', ['c3ChartDefaults', '$timeout',
  function(c3ChartDefaults, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '=',
        centerLabel: '@'
      },
      replace: true,
      templateUrl: 'charts/donut/donut-pct-chart.html',
      controller: ['$scope',
        function($scope) {
          var donutTooltip;

          $scope.donutChartId = 'donutChart';
          if ($scope.config.chartId) {
            $scope.donutChartId = $scope.config.chartId + $scope.donutChartId;
          }

          $scope.updateAvailable = function(){
            $scope.data.available = $scope.data.total - $scope.data.used;
          };

          if ($scope.data.available === undefined) {
            $scope.updateAvailable();
          }

          $scope.getStatusColor = function(used, thresholds) {
            var color = '#0088CE';

            if (thresholds) {
              if (used >= thresholds.error) {
                color = '#CC0000';
              } else if (used >= thresholds.warning) {
                color = '#EC7A08';
              }
            }

            return color;
          };

          $scope.statusDonutColor = function(scope) {
            var color, percentUsed;

            color = { pattern: [] };
            percentUsed = scope.data.used / scope.data.total * 100.0;
            color.pattern[0] = $scope.getStatusColor(percentUsed, scope.config.thresholds);
            color.pattern[1] = '#D1D1D1';
            return color;
          };

          donutTooltip = function(scope) {
            return {
              contents: function (d) {
                var tootipHtml;

                if (scope.config.tooltipFn) {
                  tootipHtml = '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                                  scope.config.tooltipFn(d) +
                               '</span>';
                  return tootipHtml;
                } else {
                  return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                            Math.round(d[0].ratio * 100) + '%' + ' ' + $scope.config.units + ' ' + d[0].name +
                         '</span>';
                }
              }
            };
          };

          $scope.getDonutData = function(scope) {
            return {
              columns: [
                ['Used', scope.data.used],
                ['Available', scope.data.available]
              ],
              type: 'donut',
              donut: {
                label: {
                  show: false
                }
              },
              groups: [
                ['used', 'available']
              ],
              order: null
            };
          };

          $scope.updateAll = function(scope) {
            $scope.updateAvailable();
            $scope.config.data = $scope.getDonutData($scope);
            $scope.config.color = $scope.statusDonutColor($scope);
            $scope.config.tooltip = donutTooltip(scope);
          };

          $scope.config = $.extend(true, c3ChartDefaults.getDefaultDonutConfig(), $scope.config);
          $scope.updateAll($scope);
        }
      ],
      link: function(scope, element, attrs) {
        scope.$watch('config', function() {
          scope.updateAll(scope);
          setupDonutChartTitle();
        },true);

        scope.$watch('data', function() {
          scope.updateAll(scope);
          setupDonutChartTitle();
        },true);

        attrs.$observe('centerLabel', function() {
          setupDonutChartTitle();
        });

        var setupDonutChartTitle = function() {
          $timeout(function() {
            var donutChartTitle, bigText, smText;

            donutChartTitle = element[0].querySelector('text.c3-chart-arcs-title');
            if (scope.config.centerLabelFn) {
              donutChartTitle.innerHTML = scope.config.centerLabelFn(scope);
            } else if(attrs.centerLabel === 'none') {
              donutChartTitle.innerHTML = '';
            } else {
              // default to 'used' info.
              bigText = scope.data.used;
              smText = scope.config.units + ' Used';

              if (attrs.centerLabel === 'available') {
                bigText = scope.data.available;
                smText = scope.config.units + ' Available';
              } else if (attrs.centerLabel === 'percent') {
                bigText = scope.data.used / scope.data.total * 100.0 + '%';
                smText = 'of ' + scope.data.total + ' ' + scope.config.units;
              }
              if (donutChartTitle) {
                donutChartTitle.innerHTML =
                  '<tspan dy="0" x="0" class="donut-title-big-pf">' +
                  bigText +
                  '</tspan>' +
                  '<tspan dy="20" x="0" class="donut-title-small-pf">' +
                  smText +
                  '</tspan>';
              }
            }
          }, 300);
        };
      }
    };
  }]);
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfDatepicker
 *
 * @description
 *  Angular directive to wrap the bootstrap datepicker http://bootstrap-datepicker.readthedocs.org/en/latest/
 *
 * @param {string} date the date model
 * @param {string} options the configuration options for the date picker
 *
 * @example
 <example module="patternfly.form">

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
     function FormDemoCtrl ($scope) {
        $scope.setToday = function () {
          $scope.date = new Date();
        }

        $scope.options = {
          autoclose: true,
          todayBtn: 'linked',
          todayHighlight: true
        };
      }
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfDatepicker', function() {
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
    link: function($scope, element) {

      //Make sure the date picker is set with the correct options
      element.datepicker($scope.options);

      //Set the initial value of the date picker
      element.datepicker('update', $scope.date);

      //Change happened on the date picker side. Update the underlying date model
      element.datepicker($scope.date).on('changeDate', function(elem) {
        $scope.$apply(function(){
          $scope.date = elem.date;
        });
      });

      //Update the date picker if there is a change on the date model
      $scope.$watch('date', function(newValue, oldValue) {
        if (oldValue !== newValue) {
          element.datepicker('update', newValue);
        }
      });
    }
  };
});
;'use strict';
/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormButtons
 *
 * @description
 *   Encapsulates the standard structure and styling for create and cancel buttons
 *   when used with a form.
 *
 *   This directive creates new scope.
 *
 * @param {function} pfHandleCancel function to call when the user clicks cancel.
 * @param {function} pfHandleSave function to call when the user clicks save.
 * @param {expression} pfWorking the model to store the working status in.
 * @param {string} pfButtonClass the class of the button container.
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <div ng-controller="FormButtonCtrl">
       <p>Saved?</p>
       <p>{{ status }}</p>
       <form>
         <div class="form-group>
           <label class="control-label col-sm-2">Input</label>
           <input class="form-control col-sm-5" name="item" ng-model="input" type="text">
         </div>
         <div pf-form-buttons pf-on-cancel="cancel()" pf-on-save="save(item)" pf-working="working"></div>
       </form>
     </div>
   </file>

   <file name="script.js">
     function FormButtonCtrl ($scope, $timeout) {
       $scope.status = 'Not yet Saved'
       $scope.working = false;

       $scope.save = function (item) {
         $scope.status = 'saved';
         $scope.working = true;

         $timeout(function () {
           $scope.working = false;
         }, 1000);
       };

       $scope.cancel = function () {
         $scope.status = 'cancelled';
         $scope.input = null;
       };
     }
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormButtons', function () {
  return {
    replace: true,
    require: '^form',
    templateUrl: 'form/form-buttons/form-buttons.html',
    scope: {
      pfHandleCancel: '&pfOnCancel',
      pfHandleSave: '&pfOnSave',
      pfWorking: '=',
      pfButtonContainerClass: '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      if (scope.pfWorking === undefined) {
        scope.pfWorking = false;
      }

      scope.isInvalid = function () {
        var invalid = controller.$invalid;

        angular.forEach(controller, function (value) {
          if (value && value.$error) {
            if (value.$error.server) {
              invalid = false;
            }
          }
        });

        return invalid;
      };
    }
  };
});
;'use strict';
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
       <div pf-form-group pf-label="Name" required>
         <input id="name" name="name"
                ng-model="item.name" type="text" required/>
       </div>

       <div pf-form-group pf-input-class="col-sm-9" pf-label="Description">
         <textarea id="description" name="description" ng-model="item.description">
           {{ item.description }}
         </textarea>
       </div>
     </form>
   </file>

   <file name="script.js">
     function FormDemoCtrl ($scope) {
        $scope.item = {
          name: 'Homer Simpson',
          description: 'I like donuts and Duff.  Doh!'
        };
      }
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormGroup', function () {
  function getInput(element) {
    // table is used for bootstrap3 date/time pickers
    var input = element.find('table');

    if (input.length === 0) {
      input = element.find('input');

      if (input.length === 0) {
        input = element.find('select');

        if (input.length === 0) {
          input = element.find('textarea');
        }
      }
    }
    return input;
  }

  return {
    transclude: true,
    replace: true,
    require: '^form',
    templateUrl: 'form/form-group/form-group.html',
    scope: {
      'pfLabel': '@',
      'pfField': '@',
      'pfLabelClass': '@',
      'pfInputClass': '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      var input = getInput(iElement),
        type = input.attr('type'),
        field;

      if (!iAttrs.pfLabelClass) {
        iAttrs.pfLabelClass = 'col-sm-2';
      }

      if (!iAttrs.pfInputClass) {
        iAttrs.pfInputClass = 'col-sm-5';
      }

      if (!scope.pfField) {
        scope.pfField = input.attr('id');
      }
      field = scope.pfField;

      if (['checkbox', 'radio', 'time'].indexOf(type) === -1) {
        input.addClass('form-control');
      }

      if (input.attr('required')) {
        iElement.addClass('required');
      }

      if (controller[field]) {
        scope.error = controller[field].$error;
      }

      scope.hasErrors = function () {
        return controller[field] && controller[field].$invalid && controller[field].$dirty;
      };
    }
  };
});
;'use strict';
/**
 * @ngdoc service
 * @name patternfly.notification.Notification
 * @requires $rootScope
 *
 * @description
 * Notification service used to notify user about important events in the application.
 *
 * ## Configuring the service
 *
 * You can configure the service with: setDelay, setVerbose and setPersist.
 *
 * ### Notifications.setDelay
 * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
 * delay is 5000 ms.
 *
 * ### Notifications.setVerbose
 * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console,
 * too. This is done using the default angular.js $log service.
 *
 * ### Notifications.setPersist
 * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
 * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
 * The input is an object in format {mode: persistValue}.
 *
 * ## Configuration Example
 * ```js
 * angular.module('myApp', []).config(function(NotificationsProvider){
 *   NotificationsProvider.setDelay(10000).setVerbose(false).setPersist({'error': true, 'httpError': true, 'warn': true});
 * });
 * ```
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">
     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
angular.module('patternfly.notification', []).provider('Notifications', function() {
  // time (in ms) the notifications are shown

  this.delay = 5000;
  this.verbose = true;
  this.notifications = {};
  this.persist = {'error': true, 'httpError': true};

  this.setDelay = function(delay){
    this.delay = delay;
    return this;
  };

  this.setVerbose = function(verbose){
    this.verbose = verbose;
    return this;
  };

  this.setPersist = function(persist){
    this.persist = persist;
  };

  this.$get = ['$rootScope', '$timeout', '$log', function($rootScope, $timeout, $log) {

    var delay = this.delay;
    var notifications = this.notifications;
    var verbose = this.verbose;
    var persist = this.persist;

    $rootScope.notifications = {};
    $rootScope.notifications.data = [];

    $rootScope.notifications.remove = function(index){
      $rootScope.notifications.data.splice(index,1);
    };

    var scheduleMessagePop = function() {
      $timeout(function() {
        for (var i = 0; i < $rootScope.notifications.data.length; i++){
          if (!$rootScope.notifications.data[i].isPersistent){
            $rootScope.notifications.data.splice(i,1);
          }
        }
      }, delay);
    };

    if (!$rootScope.notifications) {
      $rootScope.notifications.data = [];
    }

    notifications.message = function(type, header, message, isPersistent) {
      $rootScope.notifications.data.push({
        type : type,
        header: header,
        message : message,
        isPersistent: isPersistent
      });

      scheduleMessagePop();
    };

    var modes = {
      info: { type: 'info', header: 'Info!', log: 'info'},
      success: { type: 'success', header: 'Success!', log: 'info'},
      error: { type: 'danger', header: 'Error!', log: 'error'},
      warn: { type: 'warning', header: 'Warning!', log: 'warn'}
    };

    function createNotifyMethod(mode){
      return function (message) {
        notifications.message(modes[mode].type, modes[mode].header, message, persist[mode]);
        if (verbose) {
          $log[modes[mode].log](message);
        }
      };
    }

    for (var mode in modes) {
      notifications[mode] = createNotifyMethod(mode);
    }

    notifications.httpError = function(message, httpResponse) {
      message += ' (' + (httpResponse.data.message || httpResponse.data.cause || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
      notifications.message('danger', 'Error!', message, persist.httpError);
      if (verbose) {
        $log.error(message);
      }
    };

    return notifications;
  }];

})

/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotification
 * @restrict E
 * @scope
 *
 * @param {expression=} pfNotificationType The type of the notification message. Allowed value is one of these: 'success','info','danger', 'warning'.
 * @param {expression=} pfNotificationMessage The main text message of the notification.
 * @param {expression=} pfNotificationHeader The header text of the notification.
 * @param {expression=} pfNotificationPersistent The notification won't disappear after delay timeout, but has to be closed manually with the close button.
 *
 * @description
 * The main visual element of the notification message.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification pf-notification-type="type"
                      pf-notification-header="header"
                      pf-notification-message="message"
                      pf-notification-persistent="isPersistent">
     </pf-notification>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="header">Header:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="header" id="header"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Persistent:</label>
         <div class="col-sm-10">
          <input type="checkbox" ng-model="isPersistent"></input>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope) {
    $scope.types = ['success','info','danger', 'warning'];
    $scope.type = $scope.types[0];
    $scope.isPersistent = false;

    $scope.header = 'Default Header.';
    $scope.message = 'Default Message.';
  }
 </file>

 </example>
 */
.directive('pfNotification', function () {
  return {
    scope: {
      'pfNotificationType': '=',
      'pfNotificationMessage': '=',
      'pfNotificationHeader': '=',
      'pfNotificationPersistent': '=',
      'pfNotificationIndex': '='
    },
    restrict: 'E',
    templateUrl: 'notification/notification.html'
  };
})
/**
 * @ngdoc directive
 * @name patternfly.notification:pfNotificationList
 * @restrict E
 *
 * @description
 * Using this directive automatically creates a list of notifications generated by the {@link api/patternfly.notification.Notification notification} service.
 *
 * @example
 <example module="patternfly.notification">

 <file name="index.html">
   <div ng-controller="NotificationDemoCtrl">

     <pf-notification-list></pf-notification-list>

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="type">Type:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
         </div>
       </div>
       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Message:</label>
         <div class="col-sm-10">
          <input type="text" class="form-control" ng-model="message" id="message"/>
         </div>
       </div>
       <div class="form-group">
         <div class="col-sm-12">
          <button ng-click="notify()">Add notification - Click me several times</button>
         </div>
       </div>
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope, Notifications) {

    $scope.message = 'Default Message.';

    var typeMap = { 'Info': Notifications.info,
                    'Success': Notifications.success,
                    'Warning': Notifications.warn,
                    'Danger': Notifications.error };

    $scope.types = Object.keys(typeMap);

    $scope.type = $scope.types[0];
    $scope.message = 'Default notification message.';

    $scope.notify = function(){
      typeMap[$scope.type]($scope.message);
    }
  }
 </file>

 </example>
 */
.directive('pfNotificationList', function () {
  return {
    restrict: 'E',
    templateUrl: 'notification/notification-list.html'
  };
});
;'use strict';
/**
 * @ngdoc directive
 * @name patternfly.select:pfSelect
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
      <select pf-select ng-model="pet" id="pet" ng-options="o as o for o in pets"></select>
     </div>
   </div>

   <div class="form-group">
     <label class="col-sm-2 control-label" for="fruit">Preferred fruit:</label>
     <div class="col-sm-10">
       <select pf-select ng-model="fruit" id="fruit">
         <option value="orange">Orange</option>
         <option value="apple" ng-selected="true" selected>Apple</option>
         <option value="banana">Banana</option>
       </select>
     </div>
   </div>

   <div class="form-group">
     <label class="col-sm-2 control-label" for="drink">Preferred drink:</label>
     <div class="col-sm-10">
       <select pf-select="{ noneSelectedText: 'None' }" ng-model="drink" id="drink" ng-options="o as o for o in drinks">
         <option value="">No drink selected</option>
       </select>
     </div>
   </div>

 </form>

 <p>Your preferred pet is {{pet}}.</p>

 </div>
 </file>

 <file name="script.js">
 function SelectDemoCtrl($scope) {
    $scope.drinks = ['tea', 'coffee', 'water'];
    $scope.pets = ['Dog', 'Cat', 'Chicken'];
    $scope.pet = $scope.pets[0];
  }
 </file>

 </example>
 */
angular.module('patternfly.select', []).directive('pfSelect', function($timeout) {
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      selectPickerOptions: '=pfSelect'
    },
    link: function (scope, element, attrs, ngModel) {
      element.selectpicker(scope.selectPickerOptions);

      var $render = ngModel.$render;

      ngModel.$render = function(){
        $render.apply(this, arguments);
        $timeout(function() {
          element.selectpicker('refresh');
        },0,false);
      };

      if (attrs.ngOptions){
        var optionCollectionList = attrs.ngOptions.split('in ');
        var optionCollection = optionCollectionList[optionCollectionList.length - 1];

        scope.$watchCollection(optionCollection, function() {
          element.selectpicker('refresh');
        });
      }

      attrs.$observe('disabled', function() {
        element.selectpicker('refresh');
      });
    }
  };
});
;'use strict';
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
 * @param {expression=} pfValidationDisabled If true, the validation is disabled, it is enabled otherwise.
 *
 * @example
 <example module="patternfly.validation">

 <file name="index.html">
   <div ng-controller="ValidationDemoCtrl">
   <form class="form-horizontal">

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Initially valid:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValueValid" pf-validation="isNumber(input)"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Fixed Number:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Number:</label>
       <div class="col-sm-10">
         <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)" pf-validation-disabled="isValidationDisabled"/>
         <span class="help-block">The value you typed is not a number.</span>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="message">Validation disabled:</label>
       <div class="col-sm-10">
         <input class="form-control" type="checkbox" ng-model="isValidationDisabled"/>
       </div>
     </div>
   </form>
   </div>
 </file>

 <file name="script.js">
 function ValidationDemoCtrl($scope) {
    $scope.myValue = "Change this value to be a number";
    $scope.myValueValid = 42;
    $scope.isValidationDisabled = false;

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
      pfValidationDisabled: '='
    },
    link: function (scope, element, attrs, ctrl) {

      scope.inputCtrl = ctrl;
      scope.valEnabled = !attrs.pfValidationDisabled;

      scope.$watch('pfValidationDisabled', function(newVal){
        scope.valEnabled = !newVal;
        if (newVal) {
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
        if (isValid) {
          toggleErrorClass(false);
        } else {
          toggleErrorClass(true);
        }
      });

      scope.$watch('inputCtrl.$modelValue', function(){
        validate();
      });

      function validate() {
        var val = scope.inputCtrl.$modelValue;

        var valFunc = scope.pfValidation({'input':val});

        if(!attrs.pfValidation){
          valFunc = true;
        }
        var valid = !val || valFunc  || val === '';

        if (scope.valEnabled && !valid){
          toggleErrorClass(true);
        } else {
          toggleErrorClass(false);
        }
      }

      function toggleErrorClass(add) {
        var messageElement = element.next();
        var parentElement = element.parent();
        var hasErrorM = parentElement.hasClass('has-error');
        var wasHidden = messageElement.hasClass('ng-hide');

        scope.inputCtrl.$setValidity('pf-validation', !add);

        if (add){
          if (!hasErrorM) {
            parentElement.addClass('has-error');
          }
          if (wasHidden){
            messageElement.removeClass('ng-hide');
          }
        }

        if (!add){
          if(hasErrorM) {
            parentElement.removeClass('has-error');
          }
          if (!wasHidden) {
            messageElement.addClass('ng-hide');
          }
        }
      }
    }
  };
});;angular.module('patternfly.card').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('card/basic/card.html',
    "<div ng-class=\"showTopBorder === 'true' ? 'card-pf card-pf-accented' : 'card-pf'\"><div class=card-pf-heading><h2 class=card-pf-title>{{headTitle}}</h2></div><span ng-if=subTitle class=card-pf-subtitle>{{subTitle}}</span><div class=card-pf-body><div ng-transclude></div></div></div>"
  );

}]);
;angular.module('patternfly.charts').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('charts/donut/donut-pct-chart.html',
    "<div class=donut-chart-pf><div pf-c3-chart id={{donutChartId}} config=config></div></div>"
  );

}]);
;angular.module('patternfly.form').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form/datepicker/datepicker.html',
    "<div class=\"input-group date\"><input class=\"form-control\"> <span class=input-group-addon><span class=\"fa fa-calendar\"></span></span></div>"
  );


  $templateCache.put('form/form-buttons/form-buttons.html',
    "<div class=form-group><div class=\"{{ pfButtonContainerClass }}\"><div class=\"control-group buttons\"><button class=\"btn btn-default\" type=button ng-click=pfHandleCancel() ng-disabled=pfWorking translate>Cancel</button> <button class=\"btn btn-primary\" ng-click=\"pfHandleSave(); pfWorking = true\" ng-disabled=\"isInvalid() || pfWorking\"><i class=\"icon-spinner icon-spin\" ng-show=pfWorking></i> <span ng-show=pfWorking translate>Saving...</span> <span ng-hide=pfWorking translate>Save</span></button></div></div></div>"
  );


  $templateCache.put('form/form-group/form-group.html',
    "<div class=form-group ng-class=\"{ 'has-error' : hasErrors() }\"><label for=\"{{ pfField }}\" class=\"control-label {{ pfLabelClass }}\">{{ pfLabel }}</label><div class=\"{{ pfInputClass }}\"><span ng-transclude></span> <span class=help-block ng-show=error.messages><ul><li ng-repeat=\"message in error.messages\">{{ message }}</li></ul></span></div></div>"
  );

}]);
;angular.module('patternfly.notification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('notification/notification-list.html',
    "<div data-ng-show=\"notifications.data.length > 0\"><div ng-repeat=\"notification in notifications.data\"><pf-notification pf-notification-type=notification.type pf-notification-header=notification.header pf-notification-message=notification.message pf-notification-persistent=notification.isPersistent pf-notification-index=$index></pf-notification></div></div>"
  );


  $templateCache.put('notification/notification.html',
    "<div class=\"alert alert-{{pfNotificationType}}\"><button ng-show=pfNotificationPersistent type=button class=close ng-click=$parent.notifications.remove($index)><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button> <span class=\"pficon pficon-ok\" ng-show=\"pfNotificationType == 'success'\"></span> <span class=\"pficon pficon-info\" ng-show=\"pfNotificationType == 'info'\"></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'danger'\"><span class=\"pficon pficon-error-octagon\"></span> <span class=\"pficon pficon-error-exclamation\"></span></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'warning'\"><span class=\"pficon pficon-warning-triangle\"></span> <span class=\"pficon pficon-warning-exclamation\"></span></span> <strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}</div>"
  );

}]);
