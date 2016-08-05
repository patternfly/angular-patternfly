/**
 * @ngdoc directive
 * @name patternfly.navigation.directive:pfVerticalNavigation
 *
 * @description
 *   Directive for vertical navigation. This sets up the nav bar header with the collapse button (hamburger) and the
 *   application brand image (or text) as well as the vertical navigation bar containing the navigation items. This
 *   directive supports primary, secondary, and tertiary navigation with options to allow pinning of the secondary and
 *   tertiary navigation menus as well as the option for persistent secondary menus.
 *   <br><br>
 *   The remaining parts of the navbar header can be transcluded.
 *   <br><br>
 *   Tha navigation items are marked active based on the current location and the href value for the item. If not using
 *   href's on the items to navigate, set update-active-items-on-click to "true".
 *   <br><br>
 *   This directive works in conjunction with the main content container if the 'container-pf-nav-pf-vertical' class
 *   selector is added to the main content container.
 *
 * @param {string} brandSrc src for brand image
 * @param {string} brandAlt  Text for product name when brand image is not available
 * @param {boolean} hasSubMenus Flag if there are secondary and/or tertiary navigation items, default: true
 * @param {boolean} persistentSecondary Flag to use persistent secondary menus, default: false
 * @param {boolean} hiddenIcons Flag to not show icons on the primary menu, default: false
 * @param {array} items List of navigation items
 * <ul style='list-style-type: none'>
 * <li>.title          - (string) Name of item to be displayed on the menu
 * <li>.iconClass      - (string) Classes for icon to be shown on the menu (ex. "fa fa-dashboard")
 * <li>.href           - (string) href link to navigate to on click
 * <li>.children       - (array) Submenu items (same structure as top level items)
 * </ul>
 * @param {function} navigateCallback function(item) Callback method invoked on a navigation item click (one with no submenus)
 * @param {function} itemClickCallback function(item) Callback method invoked on an item click
 * @param {boolean} updateActiveItemsOnClick Flag if active items should be marked on click rather than on navigation change, default: false
 * @param {boolean} ignoreMobile Flag if mobile state should be ignored (use only if absolutely necessary) default: false
 *
 * @example
 <example module="patternfly.navigation" deps="patternfly.utils, patternfly.filters, patternfly.sort, patternfly.views">
  <file name="index.html">
  <div>
    <button class="btn btn-primary" id="showVerticalNav" onclick="showVerticalNav">Show Vertical Navigation</button>
    <label class="example-info-text">This will display the vertical nav bar and some mock content over the content of this page.</label>
    <label class="example-info-text">Exit the demo to return back to this page.</label>
  </div>
  <div id="verticalNavLayout" class="layout-pf layout-pf-fixed faux-layout hidden" ng-controller="vertNavController">
    <div pf-vertical-navigation items="navigationItems" brand-alt="ANGULAR PATTERNFLY"
         has-sub-menus="true" pinnable-menus="true" update-active-items-on-click="true"
         navigate-callback="handleNavigateClick">
      <div>
        <ul class="nav navbar-nav">
        <li><button id="hideVerticalNav" class="hide-vertical-nav">Exit Vertical Navigation Demo</button></li>
        </ul>
        <ul class="nav navbar-nav navbar-right navbar-iconic">
          <li class="dropdown">
          </li>
          <li class="dropdown">
            <a class="dropdown-toggle nav-item-iconic" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <span title="Help" class="fa pficon-help"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a href="#">Help</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a class="dropdown-toggle nav-item-iconic" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <span title="Username" class="fa pficon-user"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><a href="#">Preferences</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div id="contentContainer" class="container-fluid container-cards-pf container-pf-nav-pf-vertical container-pf-nav-pf-vertical-with-sub-menus example-page-container">
      <div id="includedContent"></div>
      </div>
    </div>
  </file>
  <file name="script.js">
  angular.module('patternfly.navigation').controller('vertNavController', ['$scope',
    function ($scope) {
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
           children: [
              {
                 title: "Intellegam",
                 children: [
                    {
                       title: "Recteque",
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
        },
        {
           title: "Exit Demo"
        }
      ];
      $scope.handleNavigateClick = function (item) {
        if (item.title === "Exit Demo") {
          angular.element(document.querySelector("#verticalNavLayout")).addClass("hidden");
        }
      };
    }
  ]);
  </file>
  <file name="add_content.js">
    $(document).ready(function() {
      $("#includedContent")[0].innerHTML = '\
      <div class="row row-cards-pf"> \
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status" style="height: 89px;">\
            <h2 class="card-pf-title" style="height: 17px;">\
            <span class="fa fa-shield"></span><span class="card-pf-aggregate-status-count">0</span> Ipsum\
            </h2>\
            <div class="card-pf-body" style="height: 50px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <span class="card-pf-aggregate-status-notification"><a href="#" class="add" data-toggle="tooltip" data-placement="top" title="Add Ipsum"><span class="pficon pficon-add-circle-o"></span></a></span>\
              </p>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status" style="height: 89px;">\
            <h2 class="card-pf-title" style="height: 17px;">\
              <a href="#"><span class="fa fa-shield"></span><span class="card-pf-aggregate-status-count">20</span> Amet</a>\
            </h2>\
            <div class="card-pf-body" style="height: 50px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <span class="card-pf-aggregate-status-notification"><a href="#"><span class="pficon pficon-error-circle-o"></span>4</a></span>\
                <span class="card-pf-aggregate-status-notification"><a href="#"><span class="pficon pficon-warning-triangle-o"></span>1</a></span>\
              </p>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
            <div class="card-pf card-pf-accented card-pf-aggregate-status" style="height: 89px;">\
              <h2 class="card-pf-title" style="height: 17px;">\
                <a href="#"><span class="fa fa-shield"></span><span class="card-pf-aggregate-status-count">9</span> Adipiscing</a>\
              </h2>\
              <div class="card-pf-body" style="height: 50px;">\
                <p class="card-pf-aggregate-status-notifications">\
                  <span class="card-pf-aggregate-status-notification"><span class="pficon pficon-ok"></span></span>\
                </p>\
              </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status" style="height: 89px;">\
            <h2 class="card-pf-title" style="height: 17px;">\
              <a href="#"><span class="fa fa-shield"></span><span class="card-pf-aggregate-status-count">12</span> Lorem</a>\
            </h2>\
            <div class="card-pf-body" style="height: 50px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <a href="#"><span class="card-pf-aggregate-status-notification"><span class="pficon pficon-error-circle-o"></span>1</span></a>\
              </p>\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="row row-cards-pf">\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status card-pf-aggregate-status-mini" style="height: 59px;">\
            <h2 class="card-pf-title" style="height: 42px;">\
              <span class="fa fa-rebel"></span>\
              <span class="card-pf-aggregate-status-count">0</span> Ipsum\
            </h2>\
            <div class="card-pf-body" style="height: 24px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <span class="card-pf-aggregate-status-notification"><a href="#" class="add" data-toggle="tooltip" data-placement="top" title="Add Ipsum"><span class="pficon pficon-add-circle-o"></span></a></span>\
              </p>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status card-pf-aggregate-status-mini" style="height: 59px;">\
            <h2 class="card-pf-title" style="height: 42px;">\
              <a href="#">\
                <span class="fa fa-paper-plane"></span>\
                <span class="card-pf-aggregate-status-count">20</span> Amet\
              </a>\
            </h2>\
            <div class="card-pf-body" style="height: 24px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <span class="card-pf-aggregate-status-notification"><a href="#"><span class="pficon pficon-error-circle-o"></span>4</a></span>\
              </p>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status card-pf-aggregate-status-mini" style="height: 59px;">\
            <h2 class="card-pf-title" style="height: 42px;">\
              <a href="#">\
                <span class="pficon pficon-cluster"></span>\
                <span class="card-pf-aggregate-status-count">9</span> Adipiscing\
              </a>\
            </h2>\
            <div class="card-pf-body" style="height: 24px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <span class="card-pf-aggregate-status-notification"><span class="pficon pficon-ok"></span></span>\
              </p>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6 col-md-3">\
          <div class="card-pf card-pf-accented card-pf-aggregate-status card-pf-aggregate-status-mini" style="height: 59px;">\
            <h2 class="card-pf-title" style="height: 42px;">\
              <a href="#">\
                <span class="pficon pficon-image"></span>\
                <span class="card-pf-aggregate-status-count">12</span> Lorem\
              </a>\
            </h2>\
            <div class="card-pf-body" style="height: 24px;">\
              <p class="card-pf-aggregate-status-notifications">\
                <a href="#"><span class="card-pf-aggregate-status-notification"><span class="pficon pficon-error-circle-o"></span>1</span></a>\
              </p>\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="row row-cards-pf">\
        <div class="col-xs-12 col-sm-6">\
          <div class="card-pf" style="height: 360px;">\
            <div class="card-pf-heading">\
              <h2 class="card-pf-title" style="height: 17px;">\
                Top Utilized\
              </h2>\
            </div>\
            <div class="card-pf-body" style="height: 280px;">\
              <div class="progress-description">\
                Ipsum\
              </div>\
              <div class="progress progress-label-top-right">\
                <div class="progress-bar progress-bar-danger" role="progressbar"style="width: 95%;" data-toggle="tooltip" title="95% Used">\
                  <span><strong>190.0 of 200.0 GB</strong> Used</span>\
                </div>\
                <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 5%;" data-toggle="tooltip" title="5% Available">\
                  <span class="sr-only">5% Available</span>\
                </div>\
              </div>\
              <div class="progress-description">\
                Amet\
              </div>\
              <div class="progress progress-label-top-right">\
                <div class="progress-bar progress-bar-success" role="progressbar" style="width: 50%;" data-toggle="tooltip" title="50% Used">\
                  <span><strong>100.0 of 200.0 GB</strong> Used</span>\
                </div>\
                <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 50%;" data-toggle="tooltip" title="50% Available">\
                  <span class="sr-only">50% Available</span>\
                </div>\
              </div>\
              <div class="progress-description">\
                Adipiscing\
              </div>\
              <div class="progress progress-label-top-right">\
                <div class="progress-bar progress-bar-warning" role="progressbar" style="width: 70%;" data-toggle="tooltip" title="70% Used">\
                  <span><strong>140.0 of 200.0 GB</strong> Used</span>\
                </div>\
                <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 30%;" data-toggle="tooltip" title="30% Available">\
                  <span class="sr-only">30% Available</span>\
                </div>\
              </div>\
              <div class="progress-description">\
                Lorem\
              </div>\
              <div class="progress progress-label-top-right">\
                <div class="progress-bar progress-bar-warning" role="progressbar" style="width: 76.5%;" data-toggle="tooltip" title="76.5% Used">\
                  <span><strong>153.0 of 200.0 GB</strong> Used</span>\
                </div>\
                <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 23.5%;" data-toggle="tooltip" title="23.5% Available">\
                  <span class="sr-only">23.5% Available</span>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="col-xs-12 col-sm-6">\
          <div class="card-pf" style="height: 360px;">\
            <div class="card-pf-heading">\
              <h2 class="card-pf-title" style="height: 17px;">\
                Quotas\
              </h2>\
            </div>\
            <div class="card-pf-body" style="height: 280px;">\
              <div class="progress-container progress-description-left progress-label-right">\
                <div class="progress-description">\
                  Ipsum\
                </div>\
                <div class="progress">\
                  <div class="progress-bar" role="progressbar" style="width: 25%;" data-toggle="tooltip" title="25% Used">\
                    <span><strong>115 of 460</strong> MHz</span>\
                  </div>\
                  <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 75%;" data-toggle="tooltip" title="75% Available">\
                    <span class="sr-only">75% Available</span>\
                  </div>\
                </div>\
              </div>\
              <div class="progress-container progress-description-left progress-label-right">\
                <div class="progress-description">\
                  Amet\
                </div>\
                <div class="progress">\
                  <div class="progress-bar" role="progressbar" style="width: 50%;" data-toggle="tooltip" title="8 GB Used">\
                    <span><strong>8 of 16</strong> GB</span>\
                  </div>\
                  <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 50%;" data-toggle="tooltip" title="8 GB Available">\
                    <span class="sr-only">50% Available</span>\
                  </div>\
                </div>\
              </div>\
              <div class="progress-container progress-description-left progress-label-right">\
                <div class="progress-description">\
                  Adipiscing\
                </div>\
                <div class="progress">\
                  <div class="progress-bar" role="progressbar" style="width: 62.5%;" data-toggle="tooltip" title="62.5% Used">\
                    <span><strong>5 of 8</strong> Total</span>\
                  </div>\
                  <div class="progress-bar progress-bar-remaining" role="progressbar" style="width: 37.5%;" data-toggle="tooltip" title="37.5% Available">\
                    <span class="sr-only">37.5% Available</span>\
                  </div>\
                </div>\
              </div>\
              <div class="progress-container progress-description-left progress-label-right">\
                <div class="progress-description">\
                  Lorem\
                </div>\
                <div class="progress">\
                  <div class="progress-bar" role="progressbar" style="width: 100%;" data-toggle="tooltip" title="100% Used">\
                    <span><strong>2 of 2</strong> Total</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
      ';
    });
  </file>
  <file name="hide-show.js">
    $(document).ready(function() {
      $(document).on('click', '#showVerticalNav', function() {
        $(document.getElementById("verticalNavLayout")).removeClass("hidden");
      });
      $(document).on('click', '#hideVerticalNav', function() {
        $(document.getElementById("verticalNavLayout")).addClass("hidden");
      });
    });
  </file>
</example>
*/
 angular.module('patternfly.navigation').directive('pfVerticalNavigation', ['$location', '$rootScope', '$window', '$document', '$timeout',
  function (location, rootScope, $window, $document, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        brandSrc: '@',
        brandAlt: '@',
        hasSubMenus: '@',
        persistentSecondary: '@',
        pinnableMenus: '@',
        hiddenIcons: '@',
        items: '=',
        navigateCallback: '=?',
        itemClickCallback: '=?',
        updateActiveItemsOnClick: '@',
        ignoreMobile: '@'
      },
      replace: true,
      templateUrl: 'navigation/vertical-navigation.html',
      transclude: true,
      controller: function ($scope) {
        var routeChangeListener;

        $scope.hasSubMenus = $scope.hasSubMenus !== 'false';
        $scope.persistentSecondary = $scope.persistentSecondary === 'true';
        $scope.pinnableMenus = $scope.pinnableMenus === 'true';
        $scope.hiddenIcons = $scope.hiddenIcons === 'true';
        $scope.updateActiveItemsOnClick = $scope.updateActiveItemsOnClick === 'true';
        $scope.ignoreMobile = $scope.ignoreMobile === 'true';

        $scope.clearActiveItems = function () {
          $scope.items.forEach(function (item) {
            item.isActive = false;
            if (item.children) {
              item.children.forEach(function (secondary) {
                secondary.isActive = false;
                if (secondary.children) {
                  secondary.children.forEach(function (tertiary) {
                    tertiary.isActive = false;
                  });
                }
              });
            }
          });
        };

        $scope.setActiveItems = function () {
          var updatedRoute = "#" + location.path();
          //Setting active state on load
          $scope.items.forEach(function (topLevel) {
            if (updatedRoute.indexOf(topLevel.href) > -1) {
              topLevel.isActive = true;
            }
            if (topLevel.children) {
              topLevel.children.forEach(function (secondLevel) {
                if (updatedRoute.indexOf(secondLevel.href) > -1) {
                  secondLevel.isActive = true;
                  topLevel.isActive = true;
                }
                if (secondLevel.children) {
                  secondLevel.children.forEach(function (thirdLevel) {
                    if (updatedRoute.indexOf(thirdLevel.href) > -1) {
                      thirdLevel.isActive = true;
                      secondLevel.isActive = true;
                      topLevel.isActive = true;
                    }
                  });
                }
              });
            }
          });
        };

        if (!$scope.updateActiveItemsOnClick) {
          routeChangeListener = rootScope.$on( "$routeChangeSuccess", function (event, next, current) {
            $scope.clearActiveItems();
            $scope.setActiveItems();
          });

          $scope.$on('$destroy', routeChangeListener);
        }
      },
      link: function ($scope) {
        var breakpoints = {
          'tablet': 768,
          'desktop': 1200
        };

        var bodyContentElement = angular.element(document.querySelector('.container-pf-nav-pf-vertical'));
        var explicitCollapse = false;
        var hoverDelay = 500;
        var hideDelay = hoverDelay + 200;

        var updateMobileMenu = function (selected, secondaryItem) {
          $scope.items.forEach(function (item) {
            item.isMobileItem = false;
            if (item.children) {
              item.children.forEach(function (nextSecondary) {
                nextSecondary.isMobileItem = false;
              });
            }
          });

          if (selected) {
            selected.isMobileItem = true;
            if (secondaryItem) {
              secondaryItem.isMobileItem = true;
              $scope.showMobileSecondary = false;
              $scope.showMobileTertiary = true;
            } else {
              $scope.showMobileSecondary = true;
              $scope.showMobileTertiary = false;
            }
          } else {
            $scope.showMobileSecondary = false;
            $scope.showMobileTertiary = false;
          }
        };

        var checkNavState = function () {
          var width = $window.innerWidth;

          // Check to see if we need to enter/exit the mobile state
          if (!$scope.ignoreMobile && width < breakpoints.tablet) {
            if (!$scope.inMobileState) {
              $scope.inMobileState = true;

              //Set the body class to the correct state
              bodyContentElement.removeClass('collapsed-nav');
              bodyContentElement.addClass('hidden-nav');

              // Reset the collapsed states
              updateSecondaryCollapsedState(false);
              updateTertiaryCollapsedState(false);

              explicitCollapse = false;
            }
          } else  {
            $scope.inMobileState = false;
            $scope.showMobileNav = false;

            // Set the body class back to the default
            bodyContentElement.removeClass('hidden-nav');
          }

          if (explicitCollapse) {
            $scope.navCollapsed = true;
            bodyContentElement.addClass('collapsed-nav');
          } else {
            $scope.navCollapsed = false;
            bodyContentElement.removeClass('collapsed-nav');
          }
        };

        var collapseMenu = function () {
          $scope.navCollapsed = true;

          //Set the body class to the correct state
          bodyContentElement.addClass('collapsed-nav');

          explicitCollapse = true;
        };

        var expandMenu = function () {
          $scope.navCollapsed = false;

          //Set the body class to the correct state
          bodyContentElement.removeClass('collapsed-nav');

          explicitCollapse = false;

          // Dispatch a resize event when showing the expanding then menu to
          // allow content to adjust to the menu sizing
          angular.element($window).triggerHandler('resize');
        };

        var forceHideSecondaryMenu = function () {
          $scope.forceHidden = true;
          $timeout(function () {
            $scope.forceHidden = false;
          }, 500);
        };

        var setFirstChildActive = function (item) {
          if (item && item.children && item.children.length > 0) {
            if ($scope.updateActiveItemsOnClick ) {
              item.children[0].isActive = true;
            }
            setFirstChildActive(item.children[0]);
          } else if (item && $scope.navigateCallback) {
            $scope.navigateCallback(item);
          }
        };

        var setParentActive = function (item) {
          $scope.items.forEach(function (topLevel) {
            if (topLevel.children) {
              topLevel.children.forEach(function (secondLevel) {
                if (secondLevel === item) {
                  topLevel.isActive = true;
                }
                if (secondLevel.children) {
                  secondLevel.children.forEach(function (thirdLevel) {
                    if (thirdLevel === item) {
                      topLevel.isActive = true;
                      secondLevel.isActive = true;
                    }
                  });
                }
              });
            }
          });
        };

        var navigateToItem = function (item) {
          var navTo = item.href;
          if (!item.children || item.children.length < 1) {
            $scope.showMobileNav = false;
            if (navTo) {
              if (navTo.startsWith('#/')) {
                navTo = navTo.substring(2);
              }
              location.path(navTo);
            }
            if ($scope.navigateCallback) {
              $scope.navigateCallback(item);
            }
          }

          if ($scope.itemClickCallback) {
            $scope.itemClickCallback(item);
          }

          if ($scope.updateActiveItemsOnClick ) {
            $scope.clearActiveItems();
            item.isActive = true;
            setParentActive(item);
          }

          setFirstChildActive(item);
        };

        var primaryHover = function () {
          var hover = false;
          $scope.items.forEach(function (item) {
            if (item.isHover) {
              hover = true;
            }
          });
          return hover;
        };

        var secondaryHover = function () {
          var hover = false;
          $scope.items.forEach(function (item) {
            if (item.children && item.children.length > 0) {
              item.children.forEach(function (secondaryItem) {
                if (secondaryItem.isHover) {
                  hover = true;
                }
              });
            }
          });
          return hover;
        };

        var updateSecondaryCollapsedState = function (setCollapsed, collapsedItem) {
          if (collapsedItem) {
            collapsedItem.secondaryCollapsed = setCollapsed;
          }
          if (setCollapsed) {
            $scope.collapsedSecondaryNav = true;

            bodyContentElement.addClass('collapsed-secondary-nav-pf');
          } else {
            // Remove any collapsed secondary menus
            if ($scope.items) {
              $scope.items.forEach(function (item) {
                item.secondaryCollasped = false;
              });
            }
            $scope.collapsedSecondaryNav = false;

            bodyContentElement.removeClass('collapsed-secondary-nav-pf');
          }
        };

        var updateTertiaryCollapsedState = function (setCollapsed, collapsedItem) {
          if (collapsedItem) {
            collapsedItem.tertiaryCollapsed = setCollapsed;
          }
          if (setCollapsed) {
            $scope.collapsedTertiaryNav = true;

            bodyContentElement.addClass('collapsed-tertiary-nav-pf');
            updateSecondaryCollapsedState(false);
          } else {
            // Remove any collapsed secondary menus
            if ($scope.items) {
              $scope.items.forEach(function (item) {
                if (item.children && item.children.length > 0) {
                  item.children.forEach(function (secondaryItem) {
                    secondaryItem.tertiaryCollasped = false;
                  });
                }
              });
            }
            $scope.collapsedTertiaryNav = false;

            bodyContentElement.removeClass('collapsed-tertiary-nav-pf');
          }
        };

        $scope.showMobileNav = false;
        $scope.showMobileSecondary = false;
        $scope.showMobileTertiary = false;
        $scope.hoverSecondaryNav = false;
        $scope.hoverTertiaryNav = false;
        $scope.collapsedSecondaryNav = false;
        $scope.collapsedTertiaryNav = false;
        $scope.navCollapsed = false;
        $scope.forceHidden = false;

        if ($scope.hasSubMenus) {
          bodyContentElement.addClass('container-pf-nav-pf-vertical-with-sub-menus');
        }
        if ($scope.persistentSecondary) {
          bodyContentElement.addClass('nav-pf-persistent-secondary');
        }
        if ($scope.hiddenIcons) {
          bodyContentElement.addClass('hidden-icons-pf');
        }

        $scope.handleNavBarToggleClick = function () {

          if ($scope.inMobileState) {
            // Toggle the mobile nav
            if ($scope.showMobileNav) {
              $scope.showMobileNav = false;
            } else {
              // Always start at the primary menu
              updateMobileMenu();
              $scope.showMobileNav = true;
            }
          } else if ($scope.navCollapsed) {
            expandMenu();
          } else {
            collapseMenu();
          }
        };

        $scope.handlePrimaryClick = function (item, event) {
          if ($scope.inMobileState) {
            if (item.children && item.children.length > 0) {
              updateMobileMenu(item);
            } else {
              updateMobileMenu();
              navigateToItem(item);
            }
          } else {
            navigateToItem(item);
          }
        };

        $scope.handleSecondaryClick = function (primary, secondary, event) {
          if ($scope.inMobileState) {
            if (secondary.children && secondary.children.length > 0) {
              updateMobileMenu(primary, secondary);
            } else {
              updateMobileMenu();
              navigateToItem(secondary);
            }
          } else {
            navigateToItem(secondary);
          }
        };

        $scope.handleTertiaryClick = function (primary, secondary, tertiary, event) {
          if ($scope.inMobileState) {
            updateMobileMenu();
          }

          navigateToItem(tertiary);
        };

        // Show secondary nav bar on hover of primary nav items
        $scope.handlePrimaryHover = function (item) {
          if (item.children && item.children.length > 0) {
            if (!$scope.inMobileState) {
              if (item.navUnHoverTimeout !== undefined) {
                $timeout.cancel(item.navUnHoverTimeout);
                item.navUnHoverTimeout = undefined;
              } else if ($scope.navHoverTimeout === undefined && !item.isHover) {
                item.navHoverTimeout = $timeout(function () {
                  $scope.hoverSecondaryNav = true;
                  item.isHover = true;
                  item.navHoverTimeout = undefined;
                }, hoverDelay);
              }
            }
          }
        };

        $scope.handlePrimaryUnHover = function (item) {
          if (item.children && item.children.length > 0) {
            if (item.navHoverTimeout !== undefined) {
              $timeout.cancel(item.navHoverTimeout);
              item.navHoverTimeout = undefined;
            } else if (item.navUnHoverTimeout === undefined && item.isHover) {
              item.navUnHoverTimeout = $timeout(function () {
                item.isHover = false;
                if (!primaryHover()) {
                  $scope.hoverSecondaryNav = false;
                }
                item.navUnHoverTimeout = undefined;
              }, hideDelay);
            }
          }
        };

        // Show tertiary nav bar on hover of secondary nav items
        $scope.handleSecondaryHover = function (item) {
          if (item.children && item.children.length > 0) {
            if (!$scope.inMobileState) {
              if (item.navUnHoverTimeout !== undefined) {
                $timeout.cancel(item.navUnHoverTimeout);
                item.navUnHoverTimeout = undefined;
              } else if ($scope.navHoverTimeout === undefined) {
                item.navHoverTimeout = $timeout(function () {
                  $scope.hoverTertiaryNav = true;
                  item.isHover = true;
                  item.navHoverTimeout = undefined;
                }, hoverDelay);
              }
            }
          }
        };

        $scope.handleSecondaryUnHover = function (item) {
          if (item.children && item.children.length > 0) {
            if (item.navHoverTimeout !== undefined) {
              $timeout.cancel(item.navHoverTimeout);
              item.navHoverTimeout = undefined;
            } else if (item.navUnHoverTimeout === undefined) {
              item.navUnHoverTimeout = $timeout(function () {
                item.isHover = false;
                if (!secondaryHover()) {
                  $scope.hoverTertiaryNav = false;
                }
                item.navUnHoverTimeout = undefined;
              }, hideDelay);
            }
          }
        };

        $scope.collapseSecondaryNav = function (item, event) {
          if ($scope.inMobileState) {
            updateMobileMenu();
          } else {
            if (item.secondaryCollapsed) {
              updateSecondaryCollapsedState(false, item);
              forceHideSecondaryMenu();
            } else {
              updateSecondaryCollapsedState(true, item);
            }
          }

          $scope.hoverSecondaryNav = false;
          event.stopImmediatePropagation();
        };

        $scope.collapseTertiaryNav = function (item, event) {
          if ($scope.inMobileState) {
            $scope.items.forEach(function (primaryItem) {
              if (primaryItem.children) {
                primaryItem.children.forEach(function (secondaryItem) {
                  if (secondaryItem === item) {
                    updateMobileMenu(primaryItem);
                  }
                });
              }
            });
          } else {
            if (item.tertiaryCollapsed) {
              updateTertiaryCollapsedState(false, item);
              forceHideSecondaryMenu();
            } else {
              updateTertiaryCollapsedState(true, item);
            }
          }

          $scope.hoverSecondaryNav = false;
          $scope.hoverTertiaryNav = false;
          event.stopImmediatePropagation();
        };

        checkNavState();

        angular.element($window).bind('resize', function () {
          checkNavState();
          try {
            $scope.$apply();
          } catch (e) {
            // Ignore, if we already applied, that is fine.
          }
        });
      }
    };
  }]);

