describe('Directive: pfAggregateStatusCard', function() {
  var $scope, $compile, element, cardClass, notifications;

  beforeEach(module('patternfly.card', 'card/aggregate-status/aggregate-status-card.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-aggregate-status-card directive', function () {

    var compileCard = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it("should set the title link, count, and icons class", function() {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "href":"#",
        "iconClass": "fa fa-shield",
      };

      element = compileCard('<div pf-aggregate-status-card status="status"></div>', $scope);

      //Make sure the count is getting set properly in the title
      expect(angular.element(element).find('.card-pf-aggregate-status-count').html()).toBe("793");

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').size()).toBe(1);

      //Make sure the class is getting set for the title icon
      expect(angular.element(element).find('.card-pf-title').find('.fa').hasClass('fa-shield')).toBeTruthy();

      // By default, showTopBorder if not defined, should be false, resulting in hiding the top
      // border, ie. having a .card-pf class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it("No link should be present in the title", function() {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "iconClass": "fa fa-shield"
      };

      element = compileCard('<div pf-aggregate-status-card status="status"></div>', $scope);

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').size()).toBe(0);
    });

    it("should set the notifications", function() {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "href":"#",
        "iconClass": "fa fa-shield",
        "notifications":[
         {
           "iconClass":"pficon pficon-error-circle-o",
           "count":4,
           "href":"#"
         },
         {
           "iconClass":"pficon pficon-warning-triangle-o",
           "count":1
         }
       ]
      };

      element = compileCard('<div pf-aggregate-status-card status="status"></div>', $scope);

      notifications = angular.element(element).find('.card-pf-aggregate-status-notification');

      //Make sure two notifications render
      expect(notifications.size()).toBe(2);

      //First notification should have a link
      expect(notifications.eq(0).find('a').size()).toBe(1);

      //Second notification should not have a link
      expect(notifications.eq(1).find('a').size()).toBe(0);

      //first notification should have the following class
      expect(notifications.eq(0).find('span')).toHaveClass('pficon pficon-error-circle-o');

      //second notification should have the following class
      expect(notifications.eq(1).find('span')).toHaveClass('pficon pficon-warning-triangle-o');
    });

    it("should show the top border", function() {
      element = compileCard('<div pf-aggregate-status-card show-top-border="true"></div>', $scope);

      // showTopBorder set to true, results in having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeTruthy();

    });

    it("should hide the top border", function() {
      element = compileCard('<div pf-aggregate-status-card show-top-border="false"></div>', $scope);

      // showTopBorder set to false, results in not having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

  });

});
