describe('pf-formgroup', function () {

  var $scope, $compile;

  beforeEach(module('patternfly.formgroup'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Page with pf-formgroup directive', function () {

    var compile = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('should mimic the original patternfly pattern', function () {

      var page = compile('<pf-form-group pf-label-class="col-sm-6" pf-input-class="col-sm-6" pf-label-text="Short input:" pf-id="id2">' +
      '<input type="text" class="form-control" ng-model="test"></input>' +
      '</pf-form-group>', $scope);

      var formGroup = angular.element(page.children().get(0));

      expect(formGroup).toHaveClass('form-group');

      var label = angular.element(formGroup.children().get(0));
      var div = angular.element(formGroup.children().get(1));

      expect(label).toHaveClass('control-label');
      expect(label).toHaveClass('col-sm-6');
      expect(label.attr('for')).toBe('id2');
      expect(label.html()).toBe('Short input:');
      expect(label.children().size()).toBe(0);

      expect(div).toHaveClass('col-sm-6');
      expect(label.children().size()).toBe(0);

      var input = angular.element(div.children().get(0));

      expect(input).toHaveClass('form-control');
      expect(input.attr('id')).toBe('id2');
      expect(input.attr('type')).toBe('text');

    });

    it('should mimic the original patternfly pattern with default parameters', function () {

      var page = compile('<pf-form-group pf-label-text="Long input:" pf-id="someId">'+
        '<input type="text" ng-model="test"></input>' +
      '</pf-form-group>', $scope);


      var formGroup = angular.element(page.children().get(0));

      expect(formGroup).toHaveClass('form-group');

      var label = angular.element(formGroup.children().get(0));
      var div = angular.element(formGroup.children().get(1));

      expect(label).toHaveClass('control-label');
      expect(label).toHaveClass('col-sm-2');
      expect(label.attr('for')).toBe('someId');
      expect(label.html()).toBe('Long input:');
      expect(label.children().size()).toBe(0);

      expect(div).toHaveClass('col-sm-10');
      expect(label.children().size()).toBe(0);

      var input = angular.element(div.children().get(0));

      expect(input).toHaveClass('form-control');
      expect(input.attr('id')).toBe('someId');
      expect(input.attr('type')).toBe('text');
    });

    it('should generate id if not specified', function () {

      var page = compile('<pf-form-group pf-label-text="Long input:">'+
        '<input type="text" ng-model="test"></input>' +
        '</pf-form-group>', $scope);


      var formGroup = angular.element(page.children().get(0));
      var label = angular.element(formGroup.children().get(0));
      var div = angular.element(formGroup.children().get(1));

      expect(label.attr('for').indexOf('pfID')).toBe(0);

      var id = label.attr('for');

      var input = angular.element(div.children().get(0));

      expect(input.attr('id')).toBe(id);

    });
  });
});