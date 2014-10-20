/**
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
  'patternfly.form',
  'patternfly.notification',
  'patternfly.select',
  'patternfly.validation',
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
    templateUrl: 'form/views/form-buttons.html',
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
    templateUrl: 'form/views/form-group.html',
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
    templateUrl: 'notification/views/notification.html'
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
    templateUrl: 'notification/views/notification-list.html'
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
});;angular.module('patternfly.form').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form/views/form-buttons.html',
    "<div class=form-group><div class=\"{{ pfButtonContainerClass }}\"><div class=\"control-group buttons\"><button class=\"btn btn-default\" type=button ng-click=pfHandleCancel() ng-disabled=pfWorking translate>Cancel</button> <button class=\"btn btn-primary\" ng-click=\"pfHandleSave(); pfWorking = true\" ng-disabled=\"isInvalid() || pfWorking\"><i class=\"icon-spinner icon-spin\" ng-show=pfWorking></i> <span ng-show=pfWorking translate>Saving...</span> <span ng-hide=pfWorking translate>Save</span></button></div></div></div>"
  );


  $templateCache.put('form/views/form-group.html',
    "<div class=form-group ng-class=\"{ 'has-error' : hasErrors() }\"><label for=\"{{ pfField }}\" class=\"control-label {{ pfLabelClass }}\">{{ pfLabel }}</label><div class=\"{{ pfInputClass }}\"><span ng-transclude></span> <span class=help-block ng-show=error.messages><ul><li ng-repeat=\"message in error.messages\">{{ message }}</li></ul></span></div></div>"
  );

}]);
;angular.module('patternfly.notification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('notification/views/notification-list.html',
    "<div data-ng-show=\"notifications.data.length > 0\"><div ng-repeat=\"notification in notifications.data\"><pf-notification pf-notification-type=notification.type pf-notification-header=notification.header pf-notification-message=notification.message pf-notification-persistent=notification.isPersistent pf-notification-index=$index></pf-notification></div></div>"
  );


  $templateCache.put('notification/views/notification.html',
    "<div class=\"alert alert-{{pfNotificationType}}\"><button ng-show=pfNotificationPersistent type=button class=close ng-click=$parent.notifications.remove($index)><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button> <span class=\"pficon pficon-ok\" ng-show=\"pfNotificationType == 'success'\"></span> <span class=\"pficon pficon-info\" ng-show=\"pfNotificationType == 'info'\"></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'danger'\"><span class=\"pficon pficon-error-octagon\"></span> <span class=\"pficon pficon-error-exclamation\"></span></span> <span class=pficon-layered ng-show=\"pfNotificationType == 'warning'\"><span class=\"pficon pficon-warning-triangle\"></span> <span class=\"pficon pficon-warning-exclamation\"></span></span> <strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}</div>"
  );

}]);
