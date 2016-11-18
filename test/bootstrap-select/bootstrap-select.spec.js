describe('pf-bootstrap-select', function () {
  var $scope;
  var $compile;
  var element;
  var isoScope;

  beforeEach(module('patternfly.bsselect', 'bootstrap-select/bootstrap-select.html'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
    $timeout = _$timeout_;
  }));

  describe('Page with pf-bootstrap-select directive', function () {

    var compileHTML = function (markup, scope) {
      element = angular.element(markup);
      var el = $compile(element)(scope);

      scope.$digest();

      isoScope = el.isolateScope();
    };

    it('should generate correct options from selections', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[1];

      compileHTML('<div pf-bootstrap-select current-selection="modelValue" selections="options" placeholder="test placeholder"></div>', $scope);

      var selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('b');

      var bsToggle = element.find('.dropdown-toggle');
      expect(bsToggle.length).toBe(1);

      var bsSelect = angular.element(bsToggle).siblings('.dropdown-menu');
      expect(bsSelect.length).toBe(1);

      var bsSelItems = bsSelect.find('li > a > span.text');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(angular.element(bsSelItems[0]).text()).toBe($scope.options[0]);
      expect(angular.element(bsSelItems[1]).text()).toBe($scope.options[1]);
      expect(angular.element(bsSelItems[2]).text()).toBe($scope.options[2]);

      var bsSelected = bsSelect.find('li.selected .text');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('b');
    });

    it('should show the placeholder when there is no current selection', function () {
      $scope.options = ['a','b','c'];
      $scope.modelValue = null;

      compileHTML('<div pf-bootstrap-select current-selection="modelValue" selections="options" placeholder="test placeholder"></div>', $scope);

      var selection = element.find('.filter-option');
      expect(selection.length).toBe(1);
      expect(selection.text()).toBe('test placeholder');
    });

    it('should respond to changes in selections', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      compileHTML('<div pf-bootstrap-select current-selection="modelValue" selections="options" placeholder="test placeholder"></div>', $scope);

      var bsToggle = element.find('.dropdown-toggle');
      expect(bsToggle.length).toBe(1);

      var bsSelect = angular.element(bsToggle).siblings('.dropdown-menu');
      expect(bsSelect.length).toBe(1);

      var bsSelItems = bsSelect.find('li > a > span.text');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(angular.element(bsSelItems[0]).text()).toBe($scope.options[0]);
      expect(angular.element(bsSelItems[1]).text()).toBe($scope.options[1]);
      expect(angular.element(bsSelItems[2]).text()).toBe($scope.options[2]);

      $scope.$apply(function() {
        $scope.options.push('d');
      });

      $timeout.flush();

      var bsToggle = element.find('.dropdown-toggle');
      expect(bsToggle.length).toBe(1);

      var bsSelItems = bsSelect.find('li > a > span.text');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(angular.element(bsSelItems[0]).text()).toBe($scope.options[0]);
      expect(angular.element(bsSelItems[1]).text()).toBe($scope.options[1]);
      expect(angular.element(bsSelItems[2]).text()).toBe($scope.options[2]);
      expect(angular.element(bsSelItems[3]).text()).toBe($scope.options[3]);
    });

    it('should respond to current selection change', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      compileHTML('<div pf-bootstrap-select current-selection="modelValue" selections="options" placeholder="test placeholder"></div>', $scope);

      var selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('a');

      $scope.$apply(function() {
        $scope.modelValue = $scope.options[1];
      });

      selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('b');

      $scope.$apply(function() {
        $scope.modelValue = $scope.options[2];
      });

      selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('c');
    });

    it('should not update selection when updateOnSelect is false', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      compileHTML('<div pf-bootstrap-select current-selection="modelValue" update-on-select="false" selections="options" placeholder="test placeholder"></div>', $scope);

      var selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('a');

      var bsToggle = element.find('.dropdown-toggle');
      expect(bsToggle.length).toBe(1);

      var bsSelect = angular.element(bsToggle).siblings('.dropdown-menu');
      expect(bsSelect.length).toBe(1);

      var bsSelItems = bsSelect.find('li > a');

      eventFire(bsSelItems[1], 'click');
      $scope.$digest();

      selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('a');
    });

    it('should invoke the onChange callback when an item is selected', function () {

      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];

      var selectedItem = null;
      $scope.handleChange = function (item) {
        selectedItem = item;
      };

      compileHTML('<div pf-bootstrap-select current-selection="modelValue" on-change="handleChange" selections="options" placeholder="test placeholder"></div>', $scope);

      var selection = element.find('.filter-option');
      expect(selection.length).toBe(1);

      expect(selection.text()).toBe('a');

      expect(selectedItem).toBeNull();

      var bsToggle = element.find('.dropdown-toggle');
      expect(bsToggle.length).toBe(1);

      var bsSelect = angular.element(bsToggle).siblings('.dropdown-menu');
      expect(bsSelect.length).toBe(1);

      var bsSelItems = bsSelect.find('li > a');

      eventFire(bsSelItems[1], 'click');
      $scope.$digest();

      expect(selectedItem).toBe($scope.options[1]);
    });

    it('should add the class to the dropdown menu when specified', function () {
      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];

      compileHTML('<div pf-bootstrap-select current-selection="modelValue" dropdown-menu-class="dropdown-menu-right" selections="options" placeholder="test placeholder"></div>', $scope);

      var menu = element.find('.dropdown-menu.dropdown-menu-right');
      expect(menu.length).toBe(1);
    });
  });
});
