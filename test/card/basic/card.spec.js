describe('Directive: pfCard', function() {
  var $scope, $compile, element, headTitle, subTitle, cardClass, innerContent;

  beforeEach(module(
    'patternfly.card',
    'card/basic/card.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-card directive', function () {

    var compileCard = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it("should set the headTitle and subTitle and inner content", function() {

      element = compileCard('<div pf-card head-title="My card title" sub-title="My card subtitle title">Inner content goes here</div>', $scope);

      headTitle = angular.element(element).find('.card-pf-title').html();
      expect(headTitle).toBe("My card title");

      subTitle = angular.element(element).find('.card-pf-subtitle').html();
      expect(subTitle).toBe("My card subtitle title");

      innerContent = angular.element(element).find('.card-pf-body span').html();
      expect(innerContent).toBe("Inner content goes here");

      // By default, showTopBorder if not defined, should be false, resulting in hiding the top
      // border, ie. having a .card-pf class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it("should show the top border", function() {

      element = compileCard('<div pf-card head-title="My card title" sub-title="My card subtitle title" show-top-border="true">Inner content goes here</div>', $scope);

      // showTopBorder set to true, results in having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeTruthy();

    });

    it("should hide the top border", function() {

      element = compileCard('<div pf-card head-title="My card title" sub-title="My card subtitle title" show-top-border="false">Inner content goes here</div>', $scope);

      // showTopBorder set to false, results in not having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();

    });

  });
});
