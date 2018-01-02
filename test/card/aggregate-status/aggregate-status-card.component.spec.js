describe('Component: pfAggregateStatusCard', function () {
  var $scope;
  var $compile;
  var element;
  var cardClass;
  var notifications;

  beforeEach(module('patternfly.card', 'card/aggregate-status/aggregate-status-card.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-aggregate-status-card component', function () {

    var compileCard = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it("should set the title link, count, and icons class", function () {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "href":"#",
        "iconClass": "fa fa-shield"
      };

      element = compileCard('<pf-aggregate-status-card status="status"></pf-aggregate-status-card>', $scope);

      //Make sure the count is getting set properly in the title
      expect(angular.element(element).find('.card-pf-aggregate-status-count').html()).toBe("793");

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').length).toBe(1);

      //Make sure the class is getting set for the title icon
      expect(angular.element(element).find('.card-pf-title').find('.fa').hasClass('fa-shield')).toBeTruthy();

      // By default, showTopBorder if not defined, should be false, resulting in hiding the top
      // border, ie. having a .card-pf class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it("No link should be present in the title", function () {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "iconClass": "fa fa-shield"
      };

      element = compileCard('<pf-aggregate-status-card status="status"></pf-aggregate-status-card>', $scope);

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').length).toBe(0);
    });

    it("should set the notifications", function () {

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

      element = compileCard('<pf-aggregate-status-card status="status"></pf-aggregate-status-card>', $scope);

      notifications = angular.element(element).find('.card-pf-aggregate-status-notification');

      //Make sure two notifications render
      expect(notifications.length).toBe(2);

      //First notification should have a link
      expect(notifications.eq(0).find('a').length).toBe(1);

      //Second notification should not have a link
      expect(notifications.eq(1).find('a').length).toBe(0);

      //first notification should have the following class
      expect(notifications.eq(0).find('span')).toHaveClass('pficon pficon-error-circle-o');

      //second notification should have the following class
      expect(notifications.eq(1).find('span')).toHaveClass('pficon pficon-warning-triangle-o');
    });

    it("should show the top border", function () {
      element = compileCard('<pf-aggregate-status-card show-top-border="true"></pf-aggregate-status-card>', $scope);

      // showTopBorder set to true, results in having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeTruthy();

    });

    it("should hide the top border", function () {
      element = compileCard('<pf-aggregate-status-card show-top-border="false"></pf-aggregate-status-card>', $scope);

      // showTopBorder set to false, results in not having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it("should show and hide the spinner", function() {

      // When data is loaded, spinner should be hidden
      $scope.dataLoading = false;
      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt2" show-spinner="dataLoading"></pf-aggregate-status-card>', $scope);
      cardClass = angular.element(element).find('.spinner-lg');
      expect(cardClass.length).toBe(0);

      // When data is loading, spinner should be present
      $scope.dataLoading = true;
      $scope.$digest();
      cardClass = angular.element(element).find('.spinner-lg');
      expect(cardClass.length).toBe(1);
    });

    it("should show and hide the spinner text", function() {

      // When no spinner text is given, it should be undefined
      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt2" show-spinner="dataLoading"></pf-aggregate-status-card>', $scope);
      cardClass = angular.element(element).find('.loading-text');
      expect(cardClass.html()).toBeUndefined();

      // When data is loading, spinner text should be present
      $scope.dataLoading = true;
      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt2" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-aggregate-status-card>', $scope);
      cardClass = angular.element(element).find('.loading-text');
      expect(cardClass.html()).toContain('Test Loading Message');
    });

    it("should have a loading card height when specified", function() {

      // When a height is specified it should be present
      $scope.dataLoading = true;
      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt2" spinner-card-height="150" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-aggregate-status-card>', $scope);
      cardClass = angular.element(element).find('.card-pf');
      expect(cardClass.css('height')).toBe('150px');

      // When a height is not specified there should be none
      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt2" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-aggregate-status-card>', $scope);
      cardClass = angular.element(element).find('.card-pf');
      expect(cardClass.css('height')).toBe('0px');
    });

    it("should show mini layout", function () {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "href":"#",
        "iconClass": "fa fa-shield",
        "notification": {
          "iconClass": "pficon pficon-error-circle-o",
          "count": 4,
          "href": "#"
        }
      };

      element = compileCard('<pf-aggregate-status-card status="status" layout="mini"></pf-aggregate-status-card>', $scope);

      // should have the mini layout class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-aggregate-status-mini');
      expect(cardClass).toBeTruthy();

      // should show the main icon
      cardClass = angular.element(element).find('.fa-shield');
      expect(cardClass.length).toBe(1);

      notifications = angular.element(element).find('.card-pf-aggregate-status-notification');

      //notification should have an icon
      expect(notifications.eq(0).find('span').hasClass('pficon-error-circle-o')).toBeTruthy();

      //notification should have a count
      expect(notifications.eq(0).find('span').eq(1).html()).toBe('4');

    });

    it("should show mini layout, and hide optional items", function () {

      $scope.status = {
        "title":"Nodes",
        "count":793,
        "notification": {
          "count":6
        }
      };

      element = compileCard('<pf-aggregate-status-card status="status" layout="mini"></pf-aggregate-status-card>', $scope);

      // should have the mini layout class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-aggregate-status-mini');
      expect(cardClass).toBeTruthy();

      // should not show the main icon
      cardClass = angular.element(element).find('.fa-shield');
      expect(cardClass.length).toBe(0);

      notifications = angular.element(element).find('.card-pf-aggregate-status-notification');

      //notification should not have an icon
      expect(notifications.eq(0).find('span').hasClass('pficon-error-circle-o')).toBeFalsy();

      //notification should have a count
      expect(notifications.eq(0).find('span').eq(1).html()).toBe('6');


      $scope.status = {
        "title":"Nodes",
        "count":793,
        "notification": {
          "iconClass":"pficon pficon-error-circle-o"
        }
      };

      element = compileCard('<pf-aggregate-status-card status="status" layout="mini"></pf-aggregate-status-card>', $scope);

      notifications = angular.element(element).find('.card-pf-aggregate-status-notification');

      //notification should have an icon
      expect(notifications.eq(0).find('span').hasClass('pficon-error-circle-o')).toBeTruthy();

      //notification should not have a count
      expect(notifications.eq(0).find('span').eq(1).html()).not.toBe('6');
    });

    it("should set of the iconImage value", function () {

      $scope.aggStatusAlt = {
        "title":"Providers",
        "count":3,
        "notifications":[
          {
            "iconImage":"img/kubernetes.svg",
            "count":1,
            "href":"#"
          },
          {
            "iconImage":"img/OpenShift-logo.svg",
            "count":2
          }
        ]
      };

      element = compileCard('<pf-aggregate-status-card status="aggStatusAlt" layout="tall"></pf-aggregate-status-card>', $scope);

      // should have the images
      imageElements = angular.element(element).find('.card-pf-icon-image');
      expect(imageElements.length).toBe(2);
      expect(angular.element(imageElements[0]).attr('src')).toBe('img/kubernetes.svg');
      expect(angular.element(imageElements[1]).attr('src')).toBe('img/OpenShift-logo.svg');
    });
  });
});
