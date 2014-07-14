'use strict';
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
});;'use strict';
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
});;'use strict';
/**
 * @ngdoc service
 * @name patternfly.notification.Notification
 * @requires $rootScope
 *
 * @description
 * Notification service used to notify user about important events in the application.
 *
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
angular.module('patternfly.notification', []).factory('Notifications', function($rootScope, $timeout, $log) {
  // time (in ms) the notifications are shown
  var delay = 5000;

  var notifications = {};

  $rootScope.notifications = {};
  $rootScope.notifications.data = [];

  $rootScope.notifications.remove = function(index){
    $rootScope.notifications.data.splice(index,1);
  };

  var scheduleMessagePop = function() {
    $timeout(function() {
      $rootScope.notifications.data.splice(0,1);
    }, delay);
  };

  if (!$rootScope.notifications) {
    $rootScope.notifications.data = [];
  }

  notifications.message = function(type, header, message) {
    $rootScope.notifications.data.push({
      type : type,
      header: header,
      message : message
    });

    scheduleMessagePop();
  };

  notifications.info = function(message) {
    notifications.message('info', 'Info!', message);
    $log.info(message);
  };

  notifications.success = function(message) {
    notifications.message('success', 'Success!', message);
    $log.info(message);
  };

  notifications.error = function(message) {
    notifications.message('danger', 'Error!', message);
    $log.error(message);
  };

  notifications.warn = function(message) {
    notifications.message('warning', 'Warning!', message);
    $log.warn(message);
  };

  notifications.httpError = function(message, httpResponse) {
    message += ' (' + (httpResponse.data.message || httpResponse.data.cause || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
    notifications.message('danger', 'Error!', message);
    $log.error(message);
  };

  return notifications;
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
                      pf-notification-message="message">
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
     </form>
   </div>
 </file>

 <file name="script.js">
 function NotificationDemoCtrl($scope) {
    $scope.types = ['success','info','danger', 'warning'];
    $scope.type = $scope.types[0];

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
      'pfNotificationHeader': '='
    },
    restrict: 'E',
    template: '<div class="alert alert-{{pfNotificationType}}" ng-click="notifications.remove($index)">' +
                '<span class="pficon pficon-ok" ng-show="pfNotificationType == \'success\'"></span>' +
                '<span class="pficon pficon-info" ng-show="pfNotificationType == \'info\'"></span>' +
                '<span class="pficon-layered" ng-show="pfNotificationType == \'danger\'">' +
                  '<span class="pficon pficon-error-octagon"></span>' +
                  '<span class="pficon pficon-error-exclamation"></span>' +
                '</span>' +
                '<span class="pficon-layered" ng-show="pfNotificationType == \'warning\'">' +
                  '<span class="pficon pficon-warning-triangle"></span>' +
                  '<span class="pficon pficon-warning-exclamation"></span>' +
                '</span>' +
                '<strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}' +
              '</div>'
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
    template: '<div data-ng-show="notifications.data.length > 0">' +
                '<div ng-repeat="notification in notifications.data">' +
                  '<pf-notification pf-notification-type="notification.type" ' +
                                   'pf-notification-header="notification.header" ' +
                                   'pf-notification-message="notification.message">' +
                  '</pf-notification>' +
                '</div>' +
              '</div>'
  };
});;'use strict';
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

 <form>
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
       <select pf-select ng-model="drink" id="drink" ng-options="o as o for o in drinks">
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
    link: function (scope, element, attrs, ngModel) {
      element.selectpicker();

      ngModel.$render = function() {
        $timeout(function() {
          element.selectpicker('refresh');
        },0,false);
      };

      if (attrs.ngOptions){
        var optionCollectionList = attrs.ngOptions.split('in ');
        var optionCollection = optionCollectionList[optionCollectionList.length - 1];

        scope.$watch(optionCollection, function() {
          element.selectpicker('refresh');
        });
      }

      attrs.$observe('disabled', function() {
        element.selectpicker('refresh');
      });
    }
  };
});;'use strict';
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
});