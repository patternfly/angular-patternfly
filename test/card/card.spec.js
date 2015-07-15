describe('Directive: pfCard', function() {
  var $scope, $compile, element, title, subtitle;

  beforeEach(module(
    'patternfly.card',
    'card/card.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  beforeEach(function() {
    element = '<div pf-card headtitle="My card title" subtitle="My card subtitle title">Inner content goes here</div>';
    element = $compile(element)($scope);
    $scope.$digest();
  });

  it("should set the title and subtitle", function() {
    title = angular.element(element).find('.card-pf-title').html();
    expect(title).toBe("My card title");

    subtitle = angular.element(element).find('.card-pf-subtitle').html();
    expect(subtitle).toBe("My card subtitle title");
  });
});
