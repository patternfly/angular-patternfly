describe('pf-bootstrap-select', function () {
  var $scope;
  var $compile;

  beforeEach(module('patternfly.select'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Page with pf-bootstrap-select directive', function () {

    var compileSelect = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('should generate correct options from ng-options', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[1];

      var select = compileSelect('<select pf-bootstrap-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', ['b'], 'c']);

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      var bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('b');
    });

    it('should respond to changes in ng-options', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select pf-bootstrap-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect([['a'], 'b', 'c']);

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      $scope.$apply(function () {
        $scope.options.push('d');
      });

      $scope.$digest();

      expect(select.text()).toBe('abcd');
      expect(select).toEqualSelect([['a'], 'b', 'c', 'd']);

      bsSelect = angular.element(select).siblings('.dropdown-menu');
      bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abcd');
    });

    it('should respond to ng-model changes', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select pf-bootstrap-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect([['a'], 'b', 'c']);

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      var bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('a');

      $scope.$apply(function () {
        $scope.modelValue = $scope.options[1];
      });

      $scope.$digest();

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', ['b'], 'c']);

      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('b');

      $scope.$apply(function () {
        $scope.modelValue = $scope.options[2];
      });

      $scope.$digest();

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', 'b', ['c']]);

      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('c');
    });

  });
});
