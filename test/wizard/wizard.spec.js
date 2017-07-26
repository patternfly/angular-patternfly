describe('Component:  pfWizard', function () {
  var $scope,
      $rootScope,
      $compile,
      $httpBackend,
      $templateCache,
      $timeout,
      element;

  // load the controller's module
  beforeEach(module(
    'patternfly.wizard',
    'wizard/wizard-substep.html',
    'wizard/wizard-step.html',
    'wizard/wizard-review-page.html',
    'wizard/wizard.html',
    'form/form-group/form-group.html',
    'test/wizard/wizard-test-steps.html',
    'test/wizard/deployment.html',
    'test/wizard/detail-page.html',
    'test/wizard/review-second-template.html',
    'test/wizard/review-template.html',
    'test/wizard/summary.html',
    'test/wizard/wizard-container.html',
    'test/wizard/wizard-container-hidden.html',
    'test/wizard/wizard-container-step-class.html',
    'test/wizard/wizard-container-step-side-class.html',
    'test/wizard/wizard-container-hide-back.html'
  ));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$templateCache_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;
  }));

  var compileHtml = function (markup, scope) {
    var element = angular.element(markup);
    $compile(element)(scope);
    scope.$digest();
    return element;
  };

  var setupWizardScope = function () {
    var initializeWizard = function () {
      $scope.data = {
        name: '',
        description: '',
        lorem: 'default setting',
        ipsum: ''
      };
      $scope.hideIndicators = false;

      $scope.secondaryLoadInformation = 'ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu eget nunc amet.';
      $timeout(function () {
        $scope.deployReady = true;
      });
      $scope.nextButtonTitle = "Next >";
    };

    var startDeploy = function () {
      $timeout(function() { }, 2000);
      $scope.deployInProgress = true;
    };

    $scope.data = {};

    $scope.wasNextCalled = false;
    $scope.nextCallback = function () {
      $scope.wasNextCalled = true;
      return true;
    };

    $scope.wasBackCalled = false;
    $scope.backCallback = function () {
      $scope.wasBackCalled = true;
      return true;
    };

    $scope.$on("wizard:stepChanged", function (e, parameters) {
      if (parameters.step.stepId === 'review-summary') {
        $scope.nextButtonTitle = "Deploy";
      } else if (parameters.step.stepId === 'review-progress') {
        $scope.nextButtonTitle = "Close";
      } else {
        $scope.nextButtonTitle = "Next >";
      }
    });

    $scope.cancelDeploymentWizard = function () {
      $rootScope.$emit('wizard.done', 'cancel');
    };

    $scope.finishedWizard = function () {
      $rootScope.$emit('wizard.done', 'done');
      return true;
    };
    initializeWizard();
  };

  var setupWizard = function(wizardHtml) {
    setupWizardScope();

    var modalHtml = $templateCache.get(wizardHtml);
    element = compileHtml(modalHtml, $scope);
    $scope.$digest();

    // there are two dependent timeouts in the wizard that need to be flushed
    $timeout.flush();
    $timeout.flush();
  };

  it('should dispatch the cancel event on the close button click', function () {
    setupWizard('test/wizard/wizard-container.html');

    var closeButton = element.find('.close');
    spyOn($rootScope, '$emit');
    eventFire(closeButton[0], 'click');
    $scope.$digest();
    expect($rootScope.$emit).toHaveBeenCalledWith('wizard.done', 'cancel');
  });

  it('should have three step indicators in the header', function () {
    setupWizard('test/wizard/wizard-container.html');
    var stepsIndicator = element.find('.wizard-pf-steps .wizard-pf-step');
    expect(stepsIndicator.length).toBe(3);
  });

  it('should have two sections in the left-hand pane', function () {
    setupWizard('test/wizard/wizard-container.html');
    var stepsIndicator = element.find('.wizard-pf-sidebar .list-group-item');
    var hiddenStepsIndicator = element.find('section.ng-hide .wizard-pf-sidebar .list-group-item');

    //find all hidden steps and remove them from total step count to make sure correct number are visible
    expect(stepsIndicator.length - hiddenStepsIndicator.length).toBe(2);
  });

  it('should have disabled the next button', function () {
    setupWizard('test/wizard/wizard-container.html');
    var checkDisabled = element.find('.wizard-pf-next').attr('disabled');
    expect(checkDisabled).toBe('disabled');
  });

  it('should have enabled the next button after input and allowed navigation', function () {
    setupWizard('test/wizard/wizard-container.html');
    var nextButton = element.find('.wizard-pf-next');
    var nameBox = element.find('#new-name');
    nameBox.val('test').triggerHandler('input');
    eventFire(nextButton[0], 'click');
    var stepIndicator = element.find('.wizard-pf-sidebar .list-group-item.active .wizard-pf-substep-number');
    expect(stepIndicator.text()).toBe('1B.');
  });

  it('should call the next callback and back callback when buttons are clicked', function () {
    setupWizard('test/wizard/wizard-container.html');
    var nextButton = element.find('.wizard-pf-next');
    var nameBox = element.find('#new-name');
    nameBox.val('test').triggerHandler('input');

    expect($scope.wasNextCalled).toBe(false);
    eventFire(nextButton[0], 'click');
    expect($scope.wasNextCalled).toBe(true);

    var backButton = element.find('#backButton');

    expect($scope.wasBackCalled).toBe(false);
    eventFire(backButton[0], 'click');
    expect($scope.wasBackCalled).toBe(true);
  });

  it('should have allowed moving back to first page after input and allowed navigation', function () {
    setupWizard('test/wizard/wizard-container.html');
    var nextButton = element.find('.wizard-pf-next');
    var nameBox = element.find('#new-name');
    nameBox.val('test').triggerHandler('input');
    eventFire(nextButton[0], 'click');
    var stepIndicator = element.find('.wizard-pf-sidebar .list-group-item.active .wizard-pf-substep-number');
    expect(stepIndicator.text()).toBe('1B.');

    var backButton = element.find('#backButton');
    eventFire(backButton[0], 'click');
    var stepIndicator = element.find('.wizard-pf-sidebar .list-group-item.active .wizard-pf-substep-number');
    expect(stepIndicator.text()).toBe('1A.');
  });

  it('should have allowed navigation to review page', function () {
    setupWizard('test/wizard/wizard-container.html');

    var nameBox = element.find('#new-name');
    nameBox.val('test').triggerHandler('input');
    $scope.$digest();

    $scope.currentStep = 'Review';
    $scope.$digest();

    // Two timeouts occur when navigating to a specified page (one to get the wizard setup, one to allow for the step.onShow function).
    $timeout.flush();
    $timeout.flush();

    var stepIndicator = element.find('section.current .wizard-pf-sidebar .list-group-item.active .wizard-pf-substep-number');
    expect(stepIndicator.text()).toBe('3A.');
  });

  it('should hide indicators if the property is set', function () {
    setupWizard('test/wizard/wizard-container.html');

    $scope.hideIndicators = true;
    $scope.$digest();
    var indicators = element.find('.wizard-pf-steps');
    expect(indicators.children().length).toBe(0);

    // make sure indicators can be turned back on
    $scope.hideIndicators = false;
    $scope.$digest();
    var indicators = element.find('.wizard-pf-steps');
    expect(indicators.children().length).toBe(1);
  });

  it('clicking indicators should navigate wizard', function () {
    setupWizard('test/wizard/wizard-container.html');
    var indicator = element.find('.wizard-pf-steps .wizard-pf-step a');
    var nameBox = element.find('#new-name');
    nameBox.val('test').triggerHandler('input');

    eventFire(indicator[1], 'click');
    $scope.$digest();

    var selectedSectionTitle = element.find('.wizard-pf-step.active .wizard-pf-step-title').text();
    expect(selectedSectionTitle).toBe('Second Step');
  });

  it('clicking indicators should not navigate wizard if prevented from doing so', function () {
    setupWizard('test/wizard/wizard-container.html');
    var indicator = element.find('.wizard-pf-steps .wizard-pf-step a');
    eventFire(indicator[1], 'click');
    $scope.$digest();

    var selectedSectionTitle = element.find('.wizard-pf-row section.current').attr("step-title");
    expect(selectedSectionTitle).not.toBe('Second Step');
  });

  it('should hide the sidebar when set', function () {
    setupWizard('test/wizard/wizard-container-hidden.html');

    var sidebar = element.find('.wizard-pf-sidebar');

    expect(sidebar.length).toBe(0);
  });

  it('should hide the header when set', function () {
    setupWizard('test/wizard/wizard-container-hidden.html');
    var header = element.find('.modal-header');

    expect(header.length).toBe(0);
  });

  it('should set the step class when given', function () {
    setupWizard('test/wizard/wizard-container-step-class.html');

    var mainStepPanel = element.find('.wizard-pf-main');
    expect(mainStepPanel.length).toBe(3);

    var sidebarPanel = element.find('.wizard-pf-sidebar.test-step-class');
    expect(sidebarPanel.length).toBe(3);
  });

  it('should set the sidebar class when given', function () {
    setupWizard('test/wizard/wizard-container-step-side-class.html');

    var mainStepPanel = element.find('.wizard-pf-main');
    expect(mainStepPanel.length).toBe(3);

    var sidebarPanel = element.find('.wizard-pf-sidebar.test-step-class');
    expect(sidebarPanel.length).toBe(0);

    var sidebarPanel = element.find('.wizard-pf-sidebar.test-sidebar-class');
    expect(sidebarPanel.length).toBe(3);
  });

  it('should show the back button when not specified', function () {
    setupWizard('test/wizard/wizard-container.html');

    var backButton = element.find('.wizard-pf-footer #backButton');
    expect(backButton.length).toBe(1);
  });

  it('should hide the back button when specified', function () {
    $scope.hideBackButton = true;
    setupWizard('test/wizard/wizard-container-hide-back.html');

    var backButton = element.find('.wizard-pf-footer #backButton');
    expect(backButton.length).toBe(0);
  });

  it('should not hide the back button when specified', function () {
    $scope.hideBackButton = false;
    setupWizard('test/wizard/wizard-container-hide-back.html');

    var backButton = element.find('.wizard-pf-footer #backButton');
    expect(backButton.length).toBe(1);
  });
});
