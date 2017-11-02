describe('Component: pfInfoStatusCard', function () {
  var $scope;
  var $compile;
  var element;
  var cardClass;

  beforeEach(module('patternfly.card', 'card/info-status/info-status-card.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-info-status-card component', function () {

    var compileCard = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('should set the title link, and icons class', function () {

      $scope.status = {
        'title': 'TinyCore-local',
        'href': '#',
        'iconClass': 'fa fa-shield',
        'info': [
          'VM Name: aapdemo002'
        ]
      };

      element = compileCard('<pf-info-status-card status="status"></pf-info-status-card>', $scope);

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').length).toBe(1);

      //Make sure the class is getting set for the title icon
      expect(angular.element(element).find('.fa').hasClass('fa-shield')).toBeTruthy();

      // By default, showTopBorder if not defined, should be false, resulting in hiding the top
      // border, ie. having a .card-pf class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it('No link should be present in the title', function () {

      $scope.status = {
        'title': 'TinyCore-local',
        'iconClass': 'fa fa-shield',
        'info': [
          'VM Name: aapdemo002'
        ]
      };

      element = compileCard('<pf-info-status-card status="status"></pf-info-status-card>', $scope);

      //Make sure a link renders in the title
      expect(angular.element(element).find('.card-pf-title').find('a').length).toBe(0);
    });

    it('should set the info', function () {

      $scope.status = {
        'title': 'TinyCore-local',
        'href': '#',
        'iconClass': 'fa fa-shield',
        'info': [
          'VM Name: aapdemo002',
          'Host Name: localhost.localdomian',
          'IP Address: 10.9.62.100',
          'Power status: on'
        ]
      };

      element = compileCard('<pf-info-status-card status="status"></pf-info-status-card>', $scope);

      info = angular.element(element).find('.card-pf-info-item');

      //Make sure four info blocks render
      expect(info.length).toBe(4);
    });

    it('should show the top border', function () {
      element = compileCard('<pf-info-status-card show-top-border="true"></pf-info-status-card>', $scope);

      // showTopBorder set to true, results in having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeTruthy();
    });

    it('should hide the top border', function () {
      element = compileCard('<pf-info-status-card show-top-border="false"></pf-info-status-card>', $scope);

      // showTopBorder set to false, results in not having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();
    });

    it("should show and hide the spinner", function() {

      // When data is loaded, spinner should be hidden
      $scope.dataLoading = false;
      element = compileCard('<pf-info-status-card status="infoStatus2" show-spinner="dataLoading"></pf-info-status-card>', $scope);
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
      element = compileCard('<pf-info-status-card status="infoStatus2" show-spinner="dataLoading"></pf-info-status-card>', $scope);
      cardClass = angular.element(element).find('.loading-text');
      expect(cardClass.html()).toBeUndefined();

      // When data is loading, spinner text should be present
      $scope.dataLoading = true;
      element = compileCard('<pf-info-status-card status="infoStatus2" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-info-status-card>', $scope);
      cardClass = angular.element(element).find('.loading-text');
      expect(cardClass.html()).toContain('Test Loading Message');
    });

    it("should have a loading card height when specified", function() {

      // When a height is specified it should be present
      $scope.dataLoading = true;
      element = compileCard('<pf-info-status-card status="infoStatus2" spinner-card-height="200px" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-info-status-card>', $scope);
      cardClass = angular.element(element).find('.card-pf');
      expect(cardClass.css('height')).toBe('200px');

      // When a height is not specified there should be none
      element = compileCard('<pf-info-status-card status="infoStatus2" show-spinner="dataLoading" spinner-text="Test Loading Message"></pf-info-status-card>', $scope);
      cardClass = angular.element(element).find('.card-pf');
      expect(cardClass.css('height')).toBe('0px');
    });

    it('should set of the iconImage value', function () {

      $scope.status = {
        'iconImage': 'img/OpenShift-logo.svg',
        'info': [
          'Infastructure: VMware',
          'Vmware: 1 CPU (1 socket x 1 core), 1024 MB',
          '12 Snapshots',
          'Drift History: 1'
        ]
      };

      element = compileCard('<pf-info-status-card status="status"></pf-info-status-card>', $scope);

      // should have the images
      imageElements = angular.element(element).find('.info-img');
      expect(imageElements.length).toBe(1);
      expect(angular.element(imageElements[0]).attr('src')).toBe('img/OpenShift-logo.svg');
    });
  });
});
