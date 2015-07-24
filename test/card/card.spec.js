describe('Directive: pfCard', function() {
  var $scope, $compile, element, title, subtitle;

  beforeEach(module(
    'patternfly.card',
    'card/basic/card.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-card directive', function () {

    var compileSelect = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it("should set the title and subtitle", function() {

      element = compileSelect('<div pf-card headtitle="My card title" subtitle="My card subtitle title">Inner content goes here</div>', $scope);

      title = angular.element(element).find('#headtitle').html();
      expect(title).toBe("My card title");

      subtitle = angular.element(element).find('#subtitle').html();
      expect(subtitle).toBe("My card subtitle title");

      // By default, hidetopborder if not defined, should be false, resulting in showing the top
      // border, ie. having a .card-pf-accented class
      cardcontainer = angular.element(element).find('#cardcontainer').hasClass('card-pf-accented');
      expect(cardcontainer).toBeTruthy();
    });
    it("should hide the top border", function() {

      element = compileSelect('<div pf-card headtitle="My card title" subtitle="My card subtitle title" hidetopborder="true">Inner content goes here</div>', $scope);

      // hidetopborder set to true, results in not having the .card-pf-accented class
      cardcontainer = angular.element(element).find('#cardcontainer').hasClass('card-pf-accented');
      expect(cardcontainer).toBeFalsy();

    });
    it("should show the top border", function() {

      element = compileSelect('<div pf-card headtitle="My card title" subtitle="My card subtitle title" hidetopborder="false">Inner content goes here</div>', $scope);

      // hidetopborder set to false, results in having the .card-pf-accented class
      cardcontainer = angular.element(element).find('#cardcontainer').hasClass('card-pf-accented');
      expect(cardcontainer).toBeTruthy();

    });
  });
});
