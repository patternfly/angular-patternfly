angular.module('patternfly.modals')
  .component('pfModalOverlay', {
    bindings: {
      showModal: '<',
      close: "&onClose",
      modalId: '=',
      modalTitle: "=",
      titleId: "=?",
      hideCloseIcon: "<?",
      backgroundClose: "<?",
      onBackgroundClick: "=?",
      isForm: "<?",
      modalBodyTemplate: "=",
      modalBodyScope: "=?",
      actionButtons: "<"
    },
    templateUrl: 'modals/modal-overlay/modal-overlay.html',
    controller: function ( $uibModal ) {
      'use strict';

      var ctrl = this;
      var modalInstance;

      ctrl.open = function () {
        modalInstance = $uibModal.open({
          component: 'pfModalOverlayContent',
          backdrop: ctrl.backgroundClose ? true : 'static',
          resolve: {
            modalId: function () {
              return ctrl.modalId;
            },
            titleId: function () {
              return ctrl.titleId || "modalTitle";
            },
            modalTitle: function () {
              return ctrl.modalTitle;
            },
            hideCloseIcon: function () {
              return ctrl.hideCloseIcon;
            },
            onBackgroundClick: function() {
              return ctrl.onBackgroundClick;
            },
            isForm: function() {
              return ctrl.isForm;
            },
            modalBodyTemplate: function() {
              return ctrl.modalBodyTemplate;
            },
            modalBodyScope: function() {
              return ctrl.modalBodyScope;
            },
            actionButtons: function () {
              return ctrl.actionButtons;
            }
          }
        });

        modalInstance.result.then(
          function (dismissCause) {
            ctrl.close({'dismissCause': dismissCause}); // closed
          },
          function (dismissCause) {
            ctrl.close({'dismissCause': dismissCause}); // dismissed
          }
        );
      };

      ctrl.$onInit = function () {
        if (ctrl.showModal === undefined) {
          ctrl.showModal = false;
        }
      };

      ctrl.$onChanges = function (changesObj) {
        if (changesObj.showModal) {
          if (changesObj.showModal.currentValue === true) {
            ctrl.open();
          } else if (changesObj.showModal.currentValue === false && modalInstance) {
            modalInstance.dismiss('showModal set to false');
          }
        }
      };
    }
  });


angular.module('patternfly.modals').component('pfModalOverlayContent', {
  templateUrl: 'modal-overlay-template.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function ($scope) {
    'use strict';
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.modalId = ctrl.resolve.modalId;
      ctrl.titleId = ctrl.resolve.titleId || "modalTitle";
      ctrl.modalTitle = ctrl.resolve.modalTitle;
      ctrl.hideCloseIcon = ctrl.resolve.hideCloseIcon || false;
      ctrl.modalBodyTemplate = ctrl.resolve.modalBodyTemplate;
      ctrl.modalBodyScope = ctrl.resolve.modalBodyScope;
      ctrl.actionButtons = ctrl.resolve.actionButtons;
      ctrl.isForm = ctrl.resolve.isForm;
      ctrl.onBackgroundClick = ctrl.resolve.onBackgroundClick;

      ctrl.ok = function (label, actionFn) {
        if (typeof actionFn === "function") {
          if (actionFn() !== false) {
            ctrl.close({$value: label});
          }
        } else {
          ctrl.close({$value: label});
        }
      };

      ctrl.cancel = function (actionFn) {
        if (typeof actionFn === "function") {
          actionFn();
        }
        ctrl.dismiss({$value: 'cancel'});
      };

      $scope.$on('modal.closing', function(event, reason, closed) {
        if (reason === "backdrop click" || reason === "escape key press") {
          event.preventDefault();
          if ( typeof ctrl.onBackgroundClick === "function" && ctrl.onBackgroundClick()) {
            ctrl.dismiss({$value: 'backdropClick'});
          } else {
            // onBackgroundClick' returned false, may have changed ctrl vars; execute $digest to refresh view
            $scope.$digest();
          }
        }
      });
    };
  }
});
