describe('Component: pfModalOverlay', function () {
  var $scope;
  var $compile;
  var $uibModal;
  var $templateCache;
  var modal, modal2;
  var button, button2;

  // load the controller's module
  beforeEach(module(
    'patternfly.modals',
    'modals/modal-overlay/modal-overlay.html'
  ));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$uibModal_, _$templateCache_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $uibModal = _$uibModal_;
    $templateCache = _$templateCache_;
  }));

  var compileHtml = function (markup, scope) {
    var element = angular.element(markup);
    $compile(element)(scope);
    scope.$digest();
    return element;
  };

  var closeModal = function (scope) {
    scope.showModal = false;
    scope.showModal2 = false;
    scope.$digest();

    // Although callbacks are executed properly, the modal is not removed in this
    // environment -- must remove it manually to mimic UI Bootstrap.
    var modal = angular.element(document.querySelector('.modal-overlay'));
    if (modal) {
      modal.remove();
    }
    var modalBackdrop = angular.element(document.querySelector('.modal-backdrop'));
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  };

  beforeEach(function () {
    // first example
    $scope.open = function () {
      $scope.showModal = true;
    };
    $scope.onClose = function() {
      $scope.showModal = false;
    };

    $scope.modalId = "testModal";
    $scope.modalTitle = "Test Title";
    $scope.modalBodyPath = 'modal-body.html';
    $scope.actionButtons = [
      {
        label: "Cancel",
        close: true
      },
      {
        label: "Save",
        class: "btn-primary custom-class"
      }];

    // second example
    $scope.titleId = "testTitle";
    $scope.hideCloseIcon = true;
    $scope.open2 = function () {
      $scope.showModal2 = true;
    };
    $scope.onClose2 = function() {
      $scope.showModal2 = false;
    };

    $scope.actionButtons2 = [
      {
        label: "Cancel",
        close: true
      },
      {
        label: "Test",
        isDisabled: true
      },
      {
        label: "Save",
        class: "btn-primary"
      }];

    $templateCache.put("modal-body.html", "<div class='ng-scope'>Test Html</div>");
    var buttonHtml = '<button id="testButton" ng-click="open()">Test</button>';
    var modalHtml = '<pf-modal-overlay show-modal="showModal" on-close="onClose()" modal-id="modalId" modal-body-template="modalBodyPath" modal-title="modalTitle" action-buttons="actionButtons"></pf-modal-overlay>';
    modal = compileHtml(modalHtml, $scope);
    button = compileHtml(buttonHtml, $scope);

    var buttonHtml2 = '<button id="testButton" ng-click="open2()">Test</button>';
    var modalHtml2 = '<pf-modal-overlay show-modal="showModal2" on-close="onClose2()" modal-id="modalId" hide-close-icon="hideCloseIcon" modal-body-template="modalBodyPath" modal-title="modalTitle" title-id="titleId" action-buttons="actionButtons2"></pf-modal-overlay>';
    modal2 = compileHtml(modalHtml2, $scope);
    button2 = compileHtml(buttonHtml2, $scope);
  });

  it('should open the modal with button click', function () {
    expect($("#modalTitle").length).toBe(0);
    eventFire(button[0], 'click');
    expect($("#modalTitle").length).toBe(1);
    closeModal($scope);
  });

  it('should set the id of the modal', function () {
    eventFire(button[0], 'click');
    var modal$ = $('.modal-overlay', modal[1]);
    expect(modal$.attr("id")).toBe("testModal");
    closeModal($scope);
  });

  it('should open the about modal programmatically', function () {
    expect($("#modalTitle").length).toBe(0);
    $scope.open();
    $scope.$digest();
    expect($("#modalTitle").length).toBe(1);
    closeModal($scope);
  });

  it('should set the title of the modal', function () {
    eventFire(button[0], 'click');
    var title = $('.modal-header .modal-title').text();
    expect(title).toBe('Test Title');
    closeModal($scope);
  });

  it('should set the title id to "modalTitle" if none specified', function () {
    eventFire(button[0], 'click');
    var title = $('#modalTitle');
    expect(title.length).toBe(1);
    closeModal($scope);
  });

  it('should set the title id when specified', function () {
    eventFire(button2[0], 'click');
    var title = $('#testTitle');
    expect(title.length).toBe(1);
    closeModal($scope);
  });

  it('should show the "x" close icon by default', function () {
    eventFire(button[0], 'click');
    var closeButton = $('button.close');
    expect(closeButton.length).toBe(1);
    closeModal($scope);
  });

  it('should close the modal when "x" close icon is clicked', function () {
    eventFire(button[0], 'click');
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(1);
    var closeButton = $('button.close')[0];
    eventFire(closeButton, 'click');
    $scope.$digest();
    modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });

  it('should hide the close icon when hide-close-icon set to true', function () {
    eventFire(button2[0], 'click');
    var closeButton = $('button.close');
    expect(closeButton.length).toBe(0);
    closeModal($scope);
  });

  it('should set the html in the body of the modal to <div>Test Html</div>', function () {
    eventFire(button[0], 'click');
    var body = $('.modal-body').html();
    expect(body.indexOf('<div class="ng-scope">Test Html</div>') !== -1).toBe(true);
    closeModal($scope);
  });

  it('should display 3 buttons', function() {
    eventFire(button2[0], 'click');
    var buttons = $('button.btn');
    expect(buttons.length).toBe(3);
    closeModal($scope);
  });

  it('should display "Cancel" on the first button', function() {
    eventFire(button2[0], 'click');
    var cancelButton = $('button.btn')[0];
    expect($(cancelButton).html()).toBe("Cancel");
    closeModal($scope);
  });

  it('should disable second button', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var cancelButton = $('button.btn')[0];
    expect($(cancelButton).is(":disabled")).toBe(false);

    var disabledButton = $('button.btn')[1];
    expect($(disabledButton).is(":disabled")).toBe(true);
    closeModal($scope);
  });

  it('should apply btn-primary class to third button', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var disabledButton = $('button.btn')[1];
    expect($(disabledButton).hasClass("btn-primary")).toBe(false);

    var thirdButton = $('button.btn')[2];
    expect($(thirdButton).hasClass("btn-primary")).toBe(true);
    closeModal($scope);
  });

  it('should dismiss modal when clicking "Cancel"', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var firstButton$ = $($('button.btn')[0]);
    firstButton$.click();
    $scope.$digest();
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });

  it('should close modal when clicking "Ok"', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var thirdButton$ = $($('button.btn')[2]);
    thirdButton$.click();
    $scope.$digest();
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });
});
