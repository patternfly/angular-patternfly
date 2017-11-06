describe('Component: pfPagination', function () {
  var $scope;
  var $compile;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.pagination', 'patternfly.table', 'pagination/pagination.html', 'table/tableview/table-view.html', 'views/empty-state.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    $compile(element)(scope);

    scope.$digest();
  };

  it('should show the default page size values', function () {
    var htmlTmp = '<pf-pagination></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    var pageSizeIncrements = element.find('.display-length-increment');
    expect(pageSizeIncrements.length).toBe(6);
    expect(angular.element(pageSizeIncrements[0]).text().trim()).toBe('5');
    expect(angular.element(pageSizeIncrements[pageSizeIncrements.length - 1]).text().trim()).toBe('100');

    expect(angular.element(element.find('.selected')).text().trim()).toBe('5');
  });

  it('should show the correct page size values when specified', function () {
    $scope.pageSizeIncrements = [50, 75];
    $scope.pageSize = 75;
    var htmlTmp = '<pf-pagination page-size-increments="pageSizeIncrements" page-size="pageSize"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    var pageSizeIncrements = element.find('.display-length-increment');
    expect(pageSizeIncrements.length).toBe(2);
    expect(angular.element(pageSizeIncrements[0]).text().trim()).toBe('50');
    expect(angular.element(pageSizeIncrements[pageSizeIncrements.length - 1]).text().trim()).toBe('75');

    expect(angular.element(element.find('.selected')).text().trim()).toBe('75');
  });

  it('should show the correct page item ranges, page number, and last page number', function () {
    $scope.pageSize = 10;
    $scope.pageNumber = 1;
    $scope.numTotalItems = 126;
    var htmlTmp = '<pf-pagination page-size="pageSize" page-number="pageNumber" num-total-items="numTotalItems"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('1-10');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('1');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');
  });

  it('should goto the next and previous pages', function () {
    $scope.pageSize = 10;
    $scope.pageNumber = 1;
    $scope.numTotalItems = 126;
    var htmlTmp = '<pf-pagination page-size="pageSize" page-number="pageNumber" num-total-items="numTotalItems"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    // On first page, goto prev and first page buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);

    eventFire(element.find('.goto-next-page')[0], 'click');
    $scope.$digest();

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('11-20');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('2');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');
    // On second page, no buttons should be disabled
    expect(element.find('.disabled').length).toBe(0);

    eventFire(element.find('.goto-prev-page')[0], 'click');
    $scope.$digest();

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('1-10');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('1');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');

    // On first page, goto prev and first page buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);
  });

  it('should goto the last and first pages', function () {
    $scope.pageSize = 10;
    $scope.pageNumber = 1;
    $scope.numTotalItems = 126;
    var htmlTmp = '<pf-pagination page-size="pageSize" page-number="pageNumber" num-total-items="numTotalItems"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    // On first page, goto prev and first page buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);

    eventFire(element.find('.goto-last-page')[0], 'click');
    $scope.$digest();

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('121-126');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('13');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');
    // On last page, next and  buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);

    eventFire(element.find('.goto-first-page')[0], 'click');
    $scope.$digest();

    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('1-10');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('1');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');

    // On first page, goto prev and first page buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);
  });

  it('should goto a specific page when inputted', function () {
    $scope.pageSize = 10;
    $scope.pageNumber = 1;
    $scope.numTotalItems = 126;
    var htmlTmp = '<pf-pagination page-size="pageSize" page-number="pageNumber" num-total-items="numTotalItems"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    var ctrl = element.isolateScope().$ctrl;
    spyOn(ctrl, 'updatePageNumber');

    // On first page, goto prev and first page buttons should be disabled
    expect(element.find('.disabled').length).toBe(2);

    angular.element(element.find('.pagination-pf-page ')).val('7').trigger('input').blur();
    $scope.$digest();

    expect(ctrl.updatePageNumber).toHaveBeenCalled();
    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('61-70');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('7');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('13');
  });

  it('should change the page size when selected from dropdown', function () {
    $scope.pageSize = 10;
    $scope.pageNumber = 1;
    $scope.numTotalItems = 126;
    var htmlTmp = '<pf-pagination page-size="pageSize" page-number="pageNumber" num-total-items="numTotalItems"></pf-pagination>';
    compileHTML(htmlTmp, $scope);

    var ctrl = element.isolateScope().$ctrl;
    spyOn(ctrl, 'updatePageSize');

    //Get pageSizeDropdown
    var pageSizeDropdown = element.find('div[uib-dropdown]');
    expect(pageSizeDropdown.length).toBe(1);

    //Change pageSizeDropdown to 20
    pageSizeDropdown.find('button').click();
    var pageSizeLinks = pageSizeDropdown.find('a');
    expect(pageSizeLinks.length).toBe(6);
    pageSizeLinks[2].click();  // switch to 20 items per page
    $scope.$digest();

    expect(ctrl.updatePageSize).toHaveBeenCalled();
    expect(angular.element(element.find('.pagination-pf-items-current')).text().trim()).toBe('1-20');
    expect(angular.element(element.find('.pagination-pf-items-total')).text().trim()).toBe('126');
    expect(angular.element(element.find('.pagination-pf-page')).val().trim()).toBe('1');
    expect(angular.element(element.find('.pagination-pf-pages')).text().trim()).toBe('7');
  });
});
