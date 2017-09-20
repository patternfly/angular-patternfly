angular.module('patternfly.select').directive('pfBootstrapSelect', function () {
  'use strict';

  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      selectPickerOptions: '=pfBootstrapSelect'
    },
    link: function (scope, element, attrs, ngModel) {
      var optionCollectionList, optionCollectionExpr, optionCollection, $render = ngModel.$render;

      var selectpickerRefresh = function (argument) {
        scope.$applyAsync(function () {
          element.selectpicker('refresh');
        });
      };

      var selectpickerDestroy = function () {
        element.selectpicker('destroy');
      };

      element.selectpicker(scope.selectPickerOptions);

      ngModel.$render = function () {
        $render.apply(this, arguments);
        selectpickerRefresh();
      };

      if (attrs.ngOptions) {
        optionCollectionList = attrs.ngOptions.split('in ');
        optionCollectionExpr = optionCollectionList[optionCollectionList.length - 1].split(/track by|\|/);
        optionCollection = optionCollectionExpr[0];

        scope.$parent.$watchCollection(optionCollection, selectpickerRefresh);
      }

      if (attrs.ngModel) {
        scope.$parent.$watch(attrs.ngModel, selectpickerRefresh);
      }

      attrs.$observe('disabled', selectpickerRefresh);

      scope.$on('$destroy', selectpickerDestroy);
    }
  };
});
