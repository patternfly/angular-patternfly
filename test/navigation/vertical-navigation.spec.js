describe('Directive:  pfVerticalNavigation', function () {
  var $scope;
  var $compile;
  var element;
  var isolateScope;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.navigation', 'patternfly.utils', 'navigation/vertical-navigation.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
    isolateScope = element.isolateScope();
  };

  beforeEach(function () {
    $scope.navigationItems = [
      {
        title: "Dashboard",
        iconClass: "fa fa-dashboard",
        href: "#/dashboard"
      },
      {
        title: "Dolor",
        iconClass : "fa fa-shield",
        href: "#/dolor"
      },
      {
        title: "Ipsum",
        iconClass: "fa fa-space-shuttle",
        active: true,
        children: [
          {
            title: "Intellegam",
            active: true,
            children: [
              {
                title: "Recteque",
                active: true,
                href: "#/ipsum/intellegam/recteque"
              },
              {
                title: "Suavitate",
                href: "#/ipsum/intellegam/suavitate"
              },
              {
                title: "Vituperatoribus",
                href: "#/ipsum/intellegam/vituperatoribus"
              }
            ]
          },
          {
            title: "Copiosae",
            children: [
              {
                title: "Exerci",
                href: "#/ipsum/copiosae/exerci"
              },
              {
                title: "Quaeque",
                href: "#/ipsum/copiosae/quaeque"
              },
              {
                title: "Utroque",
                href: "#/ipsum/copiosae/utroque"
              }
            ]
          },
          {
            title: "Patrioque",
            children: [
              {
                title: "Novum",
                href: "#/ipsum/patrioque/novum"
              },
              {
                title: "Pericula",
                href: "#/ipsum/patrioque/pericula"
              },
              {
                title: "Gubergren",
                href: "#/ipsum/patrioque/gubergren"
              }
            ]
          },
          {
            title: "Accumsan",
            href: "#/ipsum/Accumsan"
          }
        ]
      },
      {
        title: "Amet",
        iconClass: "fa fa-paper-plane",
        children: [
          {
            title: "Detracto",
            children: [
              {
                title: "Delicatissimi",
                href: "#/amet/detracto/delicatissimi"
              },
              {
                title: "Aliquam",
                href: "#/amet/detracto/aliquam"
              },
              {
                title: "Principes",
                href: "#/amet/detracto/principes"
              }
            ]
          },
          {
            title: "Mediocrem",
            children: [
              {
                title: "Convenire",
                href: "#/amet/mediocrem/convenire"
              },
              {
                title: "Nonumy",
                href: "#/amet/mediocrem/nonumy"
              },
              {
                title: "Deserunt",
                href: "#/amet/mediocrem/deserunt"
              }
            ]
          },
          {
            title: "Corrumpit",
            children: [
              {
                title: "Aeque",
                href: "#/amet/corrumpit/aeque"
              },
              {
                title: "Delenit",
                href: "#/amet/corrumpit/delenit"
              },
              {
                title: "Qualisque",
                href: "#/amet/corrumpit/qualisque"
              }
            ]
          },
          {
            title: "urbanitas",
            href: "#/amet/urbanitas"
          }
        ]
      },
      {
        title: "Adipscing",
        iconClass: "fa fa-graduation-cap",
        href: "#/adipscing"
      },
      {
        title: "Lorem",
        iconClass: "fa fa-gamepad",
        href: "#/lorem"
      }
    ];

    $scope.handleNavigateClick = function (item) {
      $scope.navigateItem = item.title;
    };

    $scope.handleItemClick = function (item) {
      $scope.clickItem = item.title;
    };

    var htmlTmp = '' +
      '<div id="verticalNavLayout" class="layout-pf layout-pf-fixed">' +
      '  <div pf-vertical-navigation items="navigationItems" brand-src="images/test.svg" brand-alt="ANGULAR PATTERNFLY"' +
      '       has-sub-menus="true" pinnable-menus="true" update-active-items-on-click="true"' +
      '       navigate-callback="handleNavigateClick" item-click-callback="handleItemClick"' +
      '       ignore-mobile="true"' +
      '    <div>' +
      '      <div class="test-included-content"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div id="contentContainer" class="container-pf-nav-pf-vertical">' +
      '  </div>' +
      ' </div>' +
      '';

    compileHTML(htmlTmp, $scope);
  });

  it('should add the transcluded content', function () {
    var content = element.find('.collapse.navbar-collapse .test-included-content');
    expect(content.length).toBe(1);
  });

  it('should add the vertical navigation menus', function () {
    var primaryMenu = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus');
    expect(primaryMenu.length).toBe(1);

    var primaryItems = primaryMenu.find('> .list-group > .list-group-item');
    expect(primaryItems.length).toBe(6);

    var secondaryMenu = angular.element(primaryItems[2]).find('.nav-pf-secondary-nav');
    expect(secondaryMenu.length).toBe(1);

    var secondaryItems = angular.element(secondaryMenu).find('> .list-group > .list-group-item');
    expect(secondaryItems.length).toBe(4);

    var tertiaryMenu = angular.element(secondaryItems[0]).find('.nav-pf-tertiary-nav');
    expect(tertiaryMenu.length).toBe(1);

    var tertiaryItems = angular.element(tertiaryMenu).find('> .list-group > .list-group-item');
    expect(tertiaryItems.length).toBe(3);
  });

  it('should update the content element', function () {
    var content = element.find('.container-pf-nav-pf-vertical-with-sub-menus');
    expect(content.length).toBe(0); // (1);  // This does not work for some reason the class is not there yet
  });

  it('should pin menus when specified', function () {
    var collased = element.find('.collapsed-secondary-nav-pf.nav');
    expect(collased.length).toBe(0);

    collased = element.find('.collapsed-tertiary-nav-pf');
    expect(collased.length).toBe(0);

    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item');
    expect(primaryItems.length).toBe(6);

    // third item is active, use it to check for pin icon
    var secondaryMenu = angular.element(primaryItems[2]).find('.nav-pf-secondary-nav');
    expect(secondaryMenu.length).toBe(1);

    var collapseToggle = angular.element(secondaryMenu[0]).find('.secondary-collapse-toggle-pf');
    expect(collapseToggle.length).toBe(1);

    eventFire(collapseToggle[0], 'click');
    $scope.$digest();

    collased = element.find('.collapsed-secondary-nav-pf');
    expect(collased.length).toBe(1);

    collased = element.find('.collapsed-tertiary-nav-pf');
    expect(collased.length).toBe(0);

    var secondaryItems = angular.element(secondaryMenu).find('> .list-group > .list-group-item');
    expect(secondaryItems.length).toBe(4);

    var tertiaryMenu = angular.element(secondaryItems[0]).find('.nav-pf-tertiary-nav');
    expect(tertiaryMenu.length).toBe(1);

    collapseToggle = angular.element(tertiaryMenu[0]).find('.tertiary-collapse-toggle-pf');
    expect(collapseToggle.length).toBe(1);

    eventFire(collapseToggle[0], 'click');
    $scope.$digest();

    collased = element.find('.collapsed-tertiary-nav-pf');
    expect(collased.length).toBe(1);
  });

  it('should not show icons in hiddenIcons mode', function () {
    var htmlTmp = '' +
      '<div id="verticalNavLayout" class="layout-pf layout-pf-fixed">' +
      '  <div pf-vertical-navigation items="navigationItems" brand-src="images/test.svg" brand-alt="ANGULAR PATTERNFLY"' +
      '       has-sub-menus="true" pinnable-menus="true" update-active-items-on-click="true"' +
      '       navigate-callback="handleNavigateClick" item-click-callback="handleItemClick"' +
      '       ignore-mobile="true" hidden-icons="true"' +
      '    <div>' +
      '      <div class="test-included-content"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div id="contentContainer" class="container-pf-nav-pf-vertical">' +
      '  </div>' +
      '</div>' +
      '';

    compileHTML(htmlTmp, $scope);

    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item');
    expect(primaryItems.length).toBe(6);

    var iconSpan = angular.element(primaryItems[0]).find('> a > span');
    expect(angular.element(iconSpan[0]).hasClass('hidden')).toBeTruthy();
  });

  it('should go to collapse mode when collpase toggle is clicked', function () {
    var menu = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus');
    expect(menu.length).toBe(1);

    var collapsedMenu = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus.collapsed');
    expect(collapsedMenu.length).toBe(0);

    var navBarToggle = element.find('.navbar-header .navbar-toggle');
    expect(navBarToggle.length).toBe(1);

    eventFire(navBarToggle[0], 'click');
    $scope.$digest();

    menu = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus');
    expect(menu.length).toBe(1);

    collapsedMenu = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus.collapsed');
    expect(collapsedMenu.length).toBe(1);
  });

  it('should show the alternate text when specified', function () {
    var brandIcon = element.find('.navbar-brand-icon');
    expect(brandIcon.length).toBe(1);
    var brandText = element.find('.navbar-brand-txt');
    expect(brandText.length).toBe(0);

    var htmlTmp = '' +
      '<div id="verticalNavLayout" class="layout-pf layout-pf-fixed">' +
      '  <div pf-vertical-navigation items="navigationItems" brand-alt="ANGULAR PATTERNFLY"' +
      '       has-sub-menus="true" pinnable-menus="true" update-active-items-on-click="true"' +
      '       navigate-callback="handleNavigateClick" item-click-callback="handleItemClick"' +
      '       ignore-mobile="true" hidden-icons="true"' +
      '    <div>' +
      '      <div class="test-included-content"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div id="contentContainer" class="container-pf-nav-pf-vertical">' +
      '  </div>' +
      '</div>' +
      '';

    compileHTML(htmlTmp, $scope);

    brandIcon = element.find('.navbar-brand-icon');
    expect(brandIcon.length).toBe(0);
    brandText = element.find('.navbar-brand-txt');
    expect(brandText.length).toBe(1);
  });

  it('should invoke the navigateCallback when an item is clicked', function () {
    expect($scope.navigateItem).toBeUndefined();

    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item > a');
    expect(primaryItems.length).toBe(6);

    eventFire(primaryItems[0], 'click');
    $scope.$digest();

    expect($scope.navigateItem).toBe($scope.navigationItems[0].title);

    // Clicking a non-final item
    eventFire(primaryItems[2], 'click');
    $scope.$digest();

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[0].children[0].title);
  });

  it('should invoke the itemClickCallback when any item is clicked', function () {
    expect($scope.clickItem).toBeUndefined();

    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item > a');
    expect(primaryItems.length).toBe(6);

    eventFire(primaryItems[0], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[0].title);

    // Clicking a non-final item
    eventFire(primaryItems[2], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[2].title);
  });

  it('should set active items on primary item click when updateActiveItemsOnClick is true', function () {
    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item > a');
    expect(primaryItems.length).toBe(6);

    var activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(0);

    var activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(0);

    var activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    eventFire(primaryItems[0], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[0].title);

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(1);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(0);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    expect($scope.navigateItem).toBe($scope.navigationItems[0].title);

    // Clicking a non-final item will set active items on sub menus
    eventFire(primaryItems[2], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[2].title);

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(1);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(1);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(1);

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[0].children[0].title);
  });

  it('should set active items on secondary item click when updateActiveItemsOnClick is true', function () {
    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item');
    expect(primaryItems.length).toBe(6);

    var secondaryItems = angular.element(primaryItems[2]).find('.nav-pf-secondary-nav > .list-group > .list-group-item > a');
    expect(secondaryItems.length).toBe(4);

    // Clicking a non-final item will set active items on self, parent, and first sub item
    eventFire(secondaryItems[1], 'click');
    $scope.$digest();

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(1);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(1);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(1);

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[1].children[0].title);

    // Clicking a final item will set active items on self and parent
    eventFire(secondaryItems[3], 'click');
    $scope.$digest();

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(1);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(1);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[3].title);
  });

  it('should set active items on tertiary item click when updateActiveItemsOnClick is true', function () {
    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item');
    expect(primaryItems.length).toBe(6);

    var secondaryItems = angular.element(primaryItems[2]).find('.nav-pf-secondary-nav > .list-group > .list-group-item');
    expect(secondaryItems.length).toBe(4);

    var tertiaryItems = angular.element(secondaryItems[2]).find('.nav-pf-tertiary-nav > .list-group > .list-group-item > a');
    expect(tertiaryItems.length).toBe(3);

    // Clicking a non-final item will set active items on self, parent, and first sub item
    eventFire(tertiaryItems[1], 'click');
    $scope.$digest();

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(1);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(1);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(1);

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[2].children[1].title);

    // Clicking a final item will set active items on self and parent
    eventFire(secondaryItems[3], 'click');
    $scope.$digest();
  });

  it('should not update active items when updateActiveItemsOnClick is not true', function () {
    var htmlTmp = '' +
      '<div id="verticalNavLayout" class="layout-pf layout-pf-fixed">' +
      '  <div pf-vertical-navigation items="navigationItems" brand-src="images/test.svg" brand-alt="ANGULAR PATTERNFLY"' +
      '       has-sub-menus="true" pinnable-menus="true"' +
      '       navigate-callback="handleNavigateClick" item-click-callback="handleItemClick"' +
      '       ignore-mobile="true"' +
      '    <div>' +
      '      <div class="test-included-content"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div id="contentContainer" class="container-pf-nav-pf-vertical">' +
      '  </div>' +
      ' </div>' +
      '';

    compileHTML(htmlTmp, $scope);

    var primaryItems = element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item > a');
    expect(primaryItems.length).toBe(6);

    var activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(0);

    var activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(0);

    var activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    eventFire(primaryItems[0], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[0].title);

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(0);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(0);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    expect($scope.navigateItem).toBe($scope.navigationItems[0].title);

    eventFire(primaryItems[2], 'click');
    $scope.$digest();

    expect($scope.clickItem).toBe($scope.navigationItems[2].title);

    activePrimary =  element.find('.nav-pf-vertical.nav-pf-vertical-with-sub-menus > .list-group > .list-group-item.active');
    expect(activePrimary.length).toBe(0);

    activeSecondary =  element.find('.nav-pf-secondary-nav > .list-group > .list-group-item.active');
    expect(activeSecondary.length).toBe(0);

    activeTertiary =  element.find('.nav-pf-tertiary-nav > .list-group > .list-group-item.active');
    expect(activeTertiary.length).toBe(0);

    expect($scope.navigateItem).toBe($scope.navigationItems[2].children[0].children[0].title);
  });
});
