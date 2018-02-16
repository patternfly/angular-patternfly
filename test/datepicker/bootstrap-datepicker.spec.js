describe('Component:  pfBootstrapDatepicker', function () {
  var $scope;
  var $compile;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.datepicker', 'datepicker/datepicker.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  beforeEach(function () {
    $scope.date = new Date("Jan 1, 2000");
    $scope.format = "MMM dd, yyyy";
    $scope.dateOptions = {
      showWeeks : true
    };

    var htmlTmp = '<pf-bootstrap-datepicker date="date" format="{{format}}"></pf-bootstrap-datepicker>';

    compileHTML(htmlTmp, $scope);
  });

  it('should display the date in the correct format', function () {
    var input = element.find('input.datepicker')[0];
    expect(input.value).toBe("Jan 01, 2000");
  });

  it('should open datepicker when button clicked', function () {
    var button = element.find('button.datepicker')[0],
      datepicker;

    datepicker = element.find('ul.uib-datepicker-popup');
    expect(datepicker.length).toBe(0);

    eventFire(button, 'click');

    datepicker = element.find('ul.uib-datepicker-popup');
    expect(datepicker.length).toBe(1);
  });

  it('should not display week numbers by default on datepicker', function () {
    var button = element.find('button.datepicker')[0],
      week;

    eventFire(button, 'click');
    week = $(element.find('.uib-weeks')[0]);
    expect($("td", week).length).toBe(7);

  });

  it('should display week numbers if dateOptions is modified', function () {

    // rebuild the element with the dateOptions included
    var htmlTmp = '<pf-bootstrap-datepicker date="date" format="{{format}}" date-options="dateOptions"></pf-bootstrap-datepicker>';
    compileHTML(htmlTmp, $scope);

    // check each uib-weeks row in the datepicker has the week number + the seven days
    var button = element.find('button.datepicker')[0],
      week;
    eventFire(button, 'click');
    week = $(element.find('.uib-weeks')[0]);
    expect($("td", week).length).toBe(8);

  });

});
