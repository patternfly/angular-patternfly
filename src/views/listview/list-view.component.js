angular.module('patternfly.views').component('pfListView', {
  bindings: {
    config: '=?',
    items: '=',
    actionButtons: '=?',
    enableButtonForItemFn: '=?',
    menuActions: '=?',
    hideMenuForItemFn: '=?',
    menuClassForItemFn: '=?',
    updateMenuActionForItemFn: '=?',
    actions: '=?',
    updateActionForItemFn: '=?',
    customScope: '=?',
    emptyStateConfig: '=?'
  },
  transclude: {
    expandedContent: '?listExpandedContent'
  },
  templateUrl: 'views/listview/list-view.html',
  controller: function ($window, $element) {
    'use strict';
    var ctrl = this;

    var setDropMenuLocation = function (parentDiv) {
      var dropButton = parentDiv.querySelector('.dropdown-toggle');
      var dropMenu =  parentDiv.querySelector('.dropdown-menu');
      var parentRect = $element[0].getBoundingClientRect();
      var buttonRect = dropButton.getBoundingClientRect();
      var menuRect = dropMenu.getBoundingClientRect();
      var menuTop = buttonRect.top - menuRect.height;
      var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;

      if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
        ctrl.dropdownClass = 'dropdown';
      } else {
        ctrl.dropdownClass = 'dropup';
      }
    };

    ctrl.defaultConfig = {
      selectItems: false,
      multiSelect: false,
      dblClick: false,
      dragEnabled: false,
      dragEnd: null,
      dragMoved: null,
      dragStart: null,
      selectionMatchProp: 'uuid',
      selectedItems: [],
      checkDisabled: false,
      useExpandingRows: false,
      showSelectBox: true,
      onSelect: null,
      onSelectionChange: null,
      onCheckBoxChange: null,
      onClick: null,
      onDblClick: null
    };


    ctrl.dropdownClass = 'dropdown';

    ctrl.handleButtonAction = function (action, item) {
      if (!ctrl.checkDisabled(item) && action && action.actionFn && ctrl.enableButtonForItem(action, item)) {
        action.actionFn(action, item);
      }
    };

    ctrl.handleMenuAction = function (action, item) {
      if (!ctrl.checkDisabled(item) && action && action.actionFn && (action.isDisabled !== true)) {
        action.actionFn(action, item);
      }
    };

    ctrl.enableButtonForItem = function (action, item) {
      var enable = true;
      if (typeof ctrl.enableButtonForItemFn === 'function') {
        return ctrl.enableButtonForItemFn(action, item);
      }
      return enable;
    };

    ctrl.updateActions = function (item) {
      if (typeof ctrl.updateMenuActionForItemFn === 'function') {
        ctrl.menuActions.forEach(function (action) {
          ctrl.updateMenuActionForItemFn(action, item);
        });
      }
    };

    ctrl.getMenuClassForItem = function (item) {
      var menuClass = '';
      if (angular.isFunction(ctrl.menuClassForItemFn)) {
        menuClass = ctrl.menuClassForItemFn(item);
      }

      return menuClass;
    };

    ctrl.hideMenuForItem = function (item) {
      var hideMenu = false;
      if (angular.isFunction(ctrl.hideMenuForItemFn)) {
        hideMenu = ctrl.hideMenuForItemFn(item);
      }

      return hideMenu;
    };

    ctrl.toggleItemExpansion = function (item) {
      item.isExpanded = !item.isExpanded;
    };

    ctrl.setupActions = function (item, event) {
      // Ignore disabled items completely
      if (ctrl.checkDisabled(item)) {
        return;
      }

      // update the actions based on the current item
      ctrl.updateActions(item);

      $window.requestAnimationFrame(function () {
        var parentDiv = undefined;
        var nextElement;

        nextElement = event.target;
        while (nextElement && !parentDiv) {
          if (nextElement.className.indexOf('dropdown-kebab-pf') !== -1) {
            parentDiv = nextElement;
            if (nextElement.className.indexOf('open') !== -1) {
              setDropMenuLocation (parentDiv);
            }
          }
          nextElement = nextElement.parentElement;
        }
      });
    };

    ctrl.itemClick = function (e, item) {
      var alreadySelected;
      var selectionChanged = false;
      var continueEvent = true;
      var enableRowExpansion = ctrl.config && ctrl.config.useExpandingRows && !ctrl.config.compoundExpansionOnly && item && !item.disableRowExpansion;

      // Ignore disabled item clicks completely
      if (ctrl.checkDisabled(item)) {
        return continueEvent;
      }

      if (ctrl.config && ctrl.config.selectItems && item) {
        if (ctrl.config.multiSelect && !ctrl.config.dblClick) {

          alreadySelected = _.find(ctrl.config.selectedItems, function (itemObj) {
            return itemObj === item;
          });

          if (alreadySelected) {
            // already selected so deselect
            ctrl.config.selectedItems = _.without(ctrl.config.selectedItems, item);
          } else {
            // add the item to the selected items
            ctrl.config.selectedItems.push(item);
            selectionChanged = true;
          }
        } else {
          if (ctrl.config.selectedItems[0] === item) {
            if (!ctrl.config.dblClick) {
              ctrl.config.selectedItems = [];
              selectionChanged = true;
            }
            continueEvent = false;
          } else {
            ctrl.config.selectedItems = [item];
            selectionChanged = true;
          }
        }

        if (selectionChanged && ctrl.config.onSelect) {
          ctrl.config.onSelect(item, e);
        }
        if (selectionChanged && ctrl.config.onSelectionChange) {
          ctrl.config.onSelectionChange(ctrl.config.selectedItems, e);
        }
      }
      if (ctrl.config.onClick) {
        if (ctrl.config.onClick(item, e) !== false && enableRowExpansion) {
          ctrl.toggleItemExpansion(item);
        }
      } else if (enableRowExpansion) {
        ctrl.toggleItemExpansion(item);
      }

      return continueEvent;
    };

    ctrl.dblClick = function (e, item) {
      // Ignore disabled item clicks completely
      if (ctrl.checkDisabled(item)) {
        return continueEvent;
      }

      if (ctrl.config.onDblClick) {
        ctrl.config.onDblClick(item, e);
      }
    };

    ctrl.checkBoxChange = function (item) {
      if (ctrl.config.onCheckBoxChange) {
        ctrl.config.onCheckBoxChange(item);
      }
    };

    ctrl.isSelected = function (item) {
      var matchProp = ctrl.config.selectionMatchProp;
      var selected = false;

      if (ctrl.config.showSelectBox) {
        selected = item.selected;
      } else if (ctrl.config.selectItems && ctrl.config.selectedItems.length) {
        selected = _.find(ctrl.config.selectedItems, function (itemObj) {
          return itemObj[matchProp] === item[matchProp];
        });
      }
      return selected;
    };

    ctrl.checkDisabled = function (item) {
      return ctrl.config.checkDisabled && ctrl.config.checkDisabled(item);
    };

    ctrl.$onInit = function () {
      // Setting bound variables to new variables loses it's binding
      //   ctrl.config = pfUtils.merge(ctrl.defaultConfig, ctrl.config);
      // Instead, use _.defaults to update the existing variable
      _.defaults(ctrl.config, ctrl.defaultConfig);
      if (!ctrl.config.selectItems) {
        ctrl.config.selectedItems = [];
      }
      if (!ctrl.config.multiSelect && ctrl.config.selectedItems && ctrl.config.selectedItems.length > 0) {
        ctrl.config.selectedItems = [ctrl.config.selectedItems[0]];
      }
      if (ctrl.config.selectItems && ctrl.config.showSelectBox) {
        throw new Error('pfListView - ' +
          'Illegal use of pListView component! ' +
          'Cannot allow both select box and click selection in the same list view.');
      }
    };

    ctrl.dragEnd = function () {
      if (angular.isFunction(ctrl.config.dragEnd)) {
        ctrl.config.dragEnd();
      }
    };

    ctrl.dragMoved = function () {
      if (angular.isFunction(ctrl.config.dragMoved)) {
        ctrl.config.dragMoved();
      }
    };

    ctrl.isDragOriginal = function (item) {
      return (item === ctrl.dragItem);
    };

    ctrl.dragStart = function (item) {
      ctrl.dragItem = item;

      if (angular.isFunction(ctrl.config.dragStart)) {
        ctrl.config.dragStart(item);
      }
    };
  }
});
