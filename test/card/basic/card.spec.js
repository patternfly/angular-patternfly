describe('Component: pfCard', function() {
  var $scope, $compile, element, headTitle, subTitle, cardClass, innerContent, isoScope;

  beforeEach(module(
    'patternfly.card',
    'card/basic/card.html',
    'card/basic/card-filter.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('Page with pf-card component', function () {

    var compileCard = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      isoScope = el.controller("pf-card");
      return el;
    };

    it("should set the headTitle and subTitle and inner content", function() {

      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title"><span>Inner content goes here</span></pf-card>', $scope);

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

      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title" show-top-border="true">Inner content goes here</pf-card>', $scope);

      // showTopBorder set to true, results in having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeTruthy();

    });

    it("should hide the top border", function() {

      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title" show-top-border="false">Inner content goes here</pf-card>', $scope);

      // showTopBorder set to false, results in not having the .card-pf-accented class
      cardClass = angular.element(element).find('.card-pf').hasClass('card-pf-accented');
      expect(cardClass).toBeFalsy();

    });

    it("should show and hide the bottom border", function() {

      // by default, bottom border should be shown
      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title">Inner content goes here</pf-card>', $scope);
      cardClass = angular.element(element).find('.card-pf-heading');
      expect(cardClass.length).toBe(1);
      cardClass = angular.element(element).find('.card-pf-heading-no-bottom');
      expect(cardClass.length).toBe(0);

      // setting to false should hide the bottom border
      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title" show-titles-separator="false">Inner content goes here</pf-card>', $scope);
      cardClass = angular.element(element).find('.card-pf-heading');
      expect(cardClass.length).toBe(0);
      cardClass = angular.element(element).find('.card-pf-heading-no-bottom');
      expect(cardClass.length).toBe(1);

      // setting to true should show the bottom border
      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title" show-titles-separator="true">Inner content goes here</pf-card>', $scope);
      cardClass = angular.element(element).find('.card-pf-heading');
      expect(cardClass.length).toBe(1);
      cardClass = angular.element(element).find('.card-pf-heading-no-bottom');
      expect(cardClass.length).toBe(0);

    });

    it("should hide the action bar footer by default", function() {

      // by default, if footer not defined, footer should not be shown
      element = compileCard('<pf-card head-title="My card title" sub-title="My card subtitle title">Inner content goes here</pf-card>', $scope);
      cardClass = angular.element(element).find('.card-pf-footer');
      expect(cardClass.length).toBe(0);
    });

    it("should show the action bar footer", function() {

      // show a footer with a href
      $scope.actionBarConfig = {
        'href'      : '#addCluster',
        'iconClass' : 'fa fa-plus-circle',
        'text'      : 'Add New Cluster'
      };

      element = compileCard('<pf-card head-title="title" footer="actionBarConfig">Inner content</pf-card>', $scope);
      cardClass = angular.element(element).find('a');
      expect(cardClass.attr('href')).toBe('#addCluster');
      var spans = cardClass.find('span');
      expect(spans.length).toBe(2);
      expect(spans.eq(0)).toHaveClass('fa fa-plus-circle');
      expect(spans.eq(1).html()).toBe('Add New Cluster');

      // show a footer with a callback function
      $scope.actionBarConfig = {
        'iconClass' : 'fa fa-flag',
        'text'      : 'View All Events',
        'callBackFn': function () {
          return "Footer Callback Fn Called";
        }
      };

      element = compileCard('<pf-card head-title="title" footer="actionBarConfig">Inner content</pf-card>', $scope);
      cardClass = angular.element(element).find('a');
      expect(cardClass.attr('href')).toBeUndefined();

      cardClass.click();
      $scope.$digest();

      expect(isoScope.footerCallBackResult).toEqual('Footer Callback Fn Called');

      spans = cardClass.find('span');
      expect(spans.length).toBe(2);
      expect(spans.eq(0)).toHaveClass('fa fa-flag');
      expect(spans.eq(1).html()).toBe('View All Events');
    });

    it("should hide the filter in the footer by default", function() {

      // show a footer with a href
      $scope.actionBarConfig = {
        'href'      : '#addCluster',
        'iconClass' : 'fa fa-plus-circle',
        'text'      : 'Add New Cluster'
      };

      element = compileCard('<pf-card head-title="title" footer="actionBarConfig">Inner content</pf-card>', $scope);
      cardClass = angular.element(element).find('.card-pf-footer').find('button');
      expect(cardClass.length).toBe(0);
    });

    it("should show the filter in the footer if specified", function() {

      $scope.filterConfig = {
        'filters' : [{label:'Last 30 Days', value:'30'},
                     {label:'Last 15 Days', value:'15'},
                     {label:'Today', value:'today'}],
        'callBackFn': function (f) {
          return "Footer Filter Callback Fn Called: label='" + f.label + "' value = " + f.value;
         },
        'defaultFilter' : 2
      };

      element = compileCard('<pf-card head-title="title" footer="{}" filter="filterConfig">Inner content</pf-card>', $scope);

      // should find 3 filters
      cardClass = angular.element(element).find('.card-pf-footer').find('a');
      expect(cardClass.length).toBe(3);

      // test setting default menu item
      var filterItem = angular.element(element).find('.card-pf-footer').find('button');
      expect(filterItem.html()).toContain('Today');

      // test callbackfn gets called
      eventFire(cardClass[0], 'click');
      $scope.$digest();
      expect(isoScope.filterCallBackResult).toEqual("Footer Filter Callback Fn Called: label='Last 30 Days' value = 30");
      // test dropdown set after selection
      filterItem = angular.element(element).find('.card-pf-footer').find('button');
      expect(filterItem.html()).toContain('Last 30 Days');
    });

    it("should show the filter in the header if specified", function() {

      $scope.filterConfig = {
        'filters' : [{label:'Last 30 Days', value:'30'},
          {label:'Last 15 Days', value:'15'},
          {label:'Today', value:'today'}],
        'callBackFn': function (f) {
          return "Header Filter Callback Fn Called: label='" + f.label + "' value = " + f.value;
        },
        'defaultFilter' : 2,
        'position' : 'header'
      };

      element = compileCard('<pf-card head-title="title" footer="{}" filter="filterConfig">Inner content</pf-card>', $scope);

      // should NOT find any filters in the footer
      cardClass = angular.element(element).find('.card-pf-footer').find('a');
      expect(cardClass.length).toBe(0);

      // should find filters in the header
      cardClass = angular.element(element).find('.card-pf-heading').find('a');
      expect(cardClass.length).toBe(3);

      // test setting default menu item
      var filterItem = angular.element(element).find('.card-pf-heading').find('button');
      expect(filterItem.html()).toContain('Today');

      // test callbackfn gets called
      eventFire(cardClass[0], 'click');
      $scope.$digest();
      expect(isoScope.filterCallBackResult).toEqual("Header Filter Callback Fn Called: label='Last 30 Days' value = 30");
      // test dropdown set after selection
      filterItem = angular.element(element).find('.card-pf-heading').find('button');
      expect(filterItem.html()).toContain('Last 30 Days');
    });

    it("should not show the header if no title or filter specified", function() {

      element = compileCard('<pf-card>Inner content</pf-card>', $scope);

      // should NOT find any header artifacts
      cardClass = angular.element(element).find('.card-pf-heading');
      expect(cardClass.length).toBe(0);

      // should find filters in the header
      cardClass = angular.element(element).find('.card-pf-heading-no-bottom');
      expect(cardClass.length).toBe(0);
    });
  });

});
