/**
 * @ngdoc directive
 * @name patternfly.modals.component:pfAboutModal
 * @restrict E
 *
 * @description
 * Component for rendering modal windows.
 *
 * @param {string=} additionalInfo Text explaining the version or copyright
 * @param {string=} copyright Product copyright information
 * @param {string=} imgAlt The alt text for the corner grahpic
 * @param {string=} imgSrc The source for the corner grahpic
 * @param {boolean=} isOpen Flag indicating that the modal should be opened
 * @param {function=} onClose Function to call when modal is closed
 * @param {object=} productInfo data for the modal:<br/>
 * <ul style='list-style-type: none'>
 * <li>.product - the product label
 * <li>.version - the product version
 * </ul>
 * @param {string=} title The product title for the modal
 *
 * @example
 <example module="patternfly.modals">
 <file name="index.html">
 <div ng-controller="ModalCtrl">
 <button ng-click="open()" class="btn btn-default">Launch About Modal</button>
 <pf-about-modal is-open="isOpen" on-close="onClose()" additional-info="additionalInfo"
 product-info="productInfo" title="title" copyright="copyright" img-alt="imgAlt" img-src="imgSrc"></pf-about-modal>
 </div>
 </file>
 <file name="script.js">
 angular.module('patternfly.modals').controller('ModalCtrl', function ($scope) {
       $scope.additionalInfo = "Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum " +
         "laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. " +
         "Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.";
       $scope.copyright = "Trademark and Copyright Information";
       $scope.imgAlt = "Patternfly Symbol";
       $scope.imgSrc = "img/logo-alt.svg";
       $scope.title = "Product Title";
       $scope.productInfo = [
         { name: 'Version', value: '1.0.0.0.20160819142038_51be77c' },
         { name: 'Server Name', value: 'Localhost' },
         { name: 'User Name', value: 'admin' },
         { name: 'User Role', value: 'Administrator' }];
       $scope.open = function () {
         $scope.isOpen = true;
       };
       $scope.onClose = function() {
         $scope.isOpen = false;
       };
     });
 </file>
 </example>
 */

