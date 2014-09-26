describe('pf-select', function () {

  var $scope, $compile;

  beforeEach(module('patternfly.select'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Page with pf-select directive', function () {

    var compileSelect = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('should generate correct options from ng-options', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[1];

      var select = compileSelect('<select pf-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', ['b'], 'c']);
    });

    it('should respond to changes in ng-options', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select pf-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect([['a'], 'b', 'c']);

      $scope.$apply(function() {
        $scope.options.push('d');
      });

      expect(select.text()).toBe('abcd');
      expect(select).toEqualSelect([['a'], 'b', 'c', 'd']);
    });

    it('should respond to ng-model changes', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select pf-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect([['a'], 'b', 'c']);

      $scope.$apply(function() {
        $scope.modelValue = $scope.options[1];
      });

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', ['b'], 'c']);

      $scope.$apply(function() {
        $scope.modelValue = $scope.options[2];
      });

      expect(select.text()).toBe('abc');
      expect(select).toEqualSelect(['a', 'b', ['c']]);
    });

  });
});