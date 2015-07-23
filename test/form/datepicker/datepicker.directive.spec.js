describe('Directive: pfDatepicker', function() {
  var $scope, $compile, $timeout, element, dateInput;

  beforeEach(module('patternfly.form', 'form/datepicker/datepicker.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileDatepicker = function(markup, $scope) {
    var el = $compile(markup)($scope);
    $scope.$apply();
    return el;
  };

  it("should set the date picker input", function() {
    $scope.options = {};

    //$scope.date = 'Thu Jul 20 2015 15:55:39 GMT-0400 (EDT)';

    var datepicker = compileDatepicker('<form><div pf-datepicker options="options" date="date"></div></form>', $scope);
    var dateInput = angular.element(datepicker).find('input');
    expect(dateInput.val()).toBe('');

    $scope.$apply(function(){
      $scope.date = new Date("October 13, 2014 11:13:00");
    });

    expect(dateInput.val()).toBe('10/13/2014');
  });

  it("should set the angular model", function() {
    $scope.options = {};

    var datepicker = compileDatepicker('<form><div pf-datepicker options="options" date="date"></div></form>', $scope);
    var dateInput = angular.element(datepicker).find('input');

    var newDate = new Date("October 4, 2015 11:13:00");
    dateInput.datepicker('update', newDate);

    $scope.$digest();
    console.log($scope.date);

    expect(dateInput.val()).toBe('10/04/2015');
  });

});
