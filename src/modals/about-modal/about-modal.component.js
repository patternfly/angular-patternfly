angular.module('patternfly.modals')

.directive("pfAboutModalTransclude", function ($parse) {
  'use strict';
  return {
    link: function (scope, element, attrs) {
      element.append($parse(attrs.pfAboutModalTransclude)(scope));
    }
  };
})
.component('pfModalContent', {
  templateUrl: 'about-modal-template.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    'use strict';
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.additionalInfo = $ctrl.resolve.additionalInfo;
      $ctrl.copyright = $ctrl.resolve.copyright;
      $ctrl.imgAlt = $ctrl.resolve.imgAlt;
      $ctrl.imgSrc = $ctrl.resolve.imgSrc;
      $ctrl.isOpen = $ctrl.resolve.isOpen;
      $ctrl.productInfo = $ctrl.resolve.productInfo;
      $ctrl.title = $ctrl.resolve.title;
      $ctrl.template = $ctrl.resolve.content;
    };
  }
})
  .component('pfAboutModal', {
    bindings: {
      additionalInfo: '=?',
      copyright: '=?',
      close: "&onClose",
      imgAlt: '=?',
      imgSrc: '=?',
      isOpen: '<?',
      productInfo: '=',
      title: '=?'
    },
    templateUrl: 'modals/about-modal/about-modal.html',
    transclude: true,
    controller: function ($uibModal, $transclude) { //$uibModal, $transclude, $window
      'use strict';
      var ctrl = this;

      // The ui-bootstrap modal only supports either template or templateUrl as a way to specify the content.
      // When the content is retrieved, it is compiled and linked against the provided scope by the $uibModal service.
      // Unfortunately, there is no way to provide transclusion there.
      //
      // The solution below embeds a placeholder directive (i.e., pfAboutModalTransclude) to append the transcluded DOM.
      // The transcluded DOM is from a different location than the modal, so it needs to be handed over to the
      // placeholder directive. Thus, we're passing the actual DOM, not the parsed HTML.
      ctrl.openModal = function () {
        $uibModal.open({
          component: 'pfModalContent',
          resolve: {
            content: function () {
              var transcludedContent;
              $transclude(function (clone) {
                transcludedContent = clone;
              });
              return transcludedContent;
            },
            additionalInfo: function () {
              return ctrl.additionalInfo;
            },
            copyright: function () {
              return ctrl.copyright;
            },
            close: function () {
              return ctrl.close;
            },
            imgAlt: function () {
              return ctrl.imgAlt;
            },
            imgSrc: function () {
              return ctrl.imgSrc;
            },
            isOpen: function () {
              return ctrl.isOpen;
            },
            productInfo: function () {
              return ctrl.productInfo;
            },
            title: function () {
              return ctrl.title;
            }
          }
        })
        .result.then(
          function () {
            ctrl.close(); // closed
          },
          function () {
            ctrl.close(); // dismissed
          }
        );
      };
      ctrl.$onInit = function () {
        if (ctrl.isOpen === undefined) {
          ctrl.isOpen = false;
        }
      };

      ctrl.$onChanges = function (changesObj) {
        if (changesObj.isOpen && changesObj.isOpen.currentValue === true) {
          ctrl.openModal();
        }
      };
    }
  });
