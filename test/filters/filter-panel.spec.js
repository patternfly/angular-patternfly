describe('Directive:  pfFilterPanel', function () {
  var $scope;
  var $compile;
  var element;

  // load the controller's module
  beforeEach(function () {
    module('patternfly.filters', 'filters/filter-panel/filter-panel.html', 'filters/filter-panel/filter-panel-results.html');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  var compileHTML = function (markup, scope) {
    element = angular.element(markup);
    var el = $compile(element)(scope);

    scope.$digest();
  };

  var init = function () {
    var htmlTmp = '<pf-filter-panel config="filterConfig"></pf-filter-panel>';
    compileHTML(htmlTmp, $scope);
  };

  it('should show the default filter panel and results label', function () {
    $scope.filterConfig = {
      resultsCount: 9
    };
    init();

    expect(element.find('.dropdown').length).toBe(1);
    var resultsLabel = angular.element(element).find('h5').text().trim();
    expect(resultsLabel).toContain("9");
    expect(resultsLabel).toContain("Results");
  });

  it('should show custom results label', function () {
    $scope.filterConfig = {
      resultsCount: 4,
      resultsLabel: "Items"
    };
    init();

    expect(element.find('.dropdown').length).toBe(1);
    var resultsLabel = angular.element(element).find('h5').text().trim();
    expect(resultsLabel).toContain("4");
    expect(resultsLabel).toContain("Items");
  });

  it("should show 'n' of 'm' results label", function () {
    $scope.filterConfig = {
      resultsCount: 4,
      totalCount: 8,
      resultsLabel: "Items",
      appliedFilters: [
        {
          id: 'keyword',
          title: 'Keyword',
          values: ['Foobar']
        }
      ]
    };
    init();

    var resultsLabel = angular.element(element).find('h5').text().trim();
    expect(resultsLabel).toContain("4");
    expect(resultsLabel).toContain("of");
    expect(resultsLabel).toContain("8");
    expect(resultsLabel).toContain("Items");
  });

  it('should show correct filter tags', function () {
    $scope.filterConfig = {
      resultsCount: 4,
      resultsLabel: "Items",
      appliedFilters: [
        {
          id: 'keyword',
          title: 'Keyword',
          values: ['Foobar']
        },
        {
          id: 'category1',
          title: 'Category One',
          values: ['Value 1', 'Value 2', 'Value 3']
        }
      ]
    };
    init();

    // [cateogry: [value 1 x] [value 2 x] ]
    var categoryTags = element.find('.pf-filter-label-category');
    var tagOne = angular.element(categoryTags[0]).text();
    var tagOneValue = angular.element(element.find('.single-label')).text();
    var tagTwo = angular.element(categoryTags[1]).text();
    expect(categoryTags.length).toBe(2);
    expect(tagOne).toContain("Keyword");
    expect(tagOneValue).toContain("Foobar");
    expect(tagTwo).toContain("Category One");
    expect(tagTwo).toContain("Value 1");
    expect(tagTwo).toContain("Value 2");
    expect(tagTwo).toContain("Value 3");
  });

  it('should clear filters correctly', function () {
    $scope.filterConfig = {
      resultsCount: 4,
      resultsLabel: "Items",
      appliedFilters: [
        {
          id: 'keyword',
          title: 'Keyword',
          values: ['Foobar']
        },
        {
          id: 'category1',
          title: 'Category One',
          values: ['Value 1', 'Value 2', 'Value 3']
        }
      ]
    };
    init();

    // Filter Tag = [cateogry: [value 1 x] [value 2 x] ...]
    var categoryTags = element.find('.pf-filter-label-category');
    expect(categoryTags.length).toBe(2);

    var clearFilterLinks =  element.find('.pficon-close');
    expect(clearFilterLinks.length).toBe(4);

    // Clear the one and only Keyword filter
    eventFire(clearFilterLinks[0], 'click');
    $scope.$digest();

    categoryTags = element.find('.active-filter.label.pf-filter-label-category');
    expect(categoryTags.length).toBe(1);

    // Clear one of the Category One filters
    clearFilterLinks =  element.find('.pficon-close');
    expect(clearFilterLinks.length).toBe(3);

    // Clear the 'Value 3' filter
    eventFire(clearFilterLinks[2], 'click');
    $scope.$digest();

    var tagOne = angular.element(categoryTags[0]).text();
    expect(tagOne).toContain("Category One");
    expect(tagOne).toContain("Value 1");
    expect(tagOne).toContain("Value 2");
    expect(tagOne).not.toContain("Value 3");

    var clearAll = element.find('.clear-filters');
    expect(clearAll.length).toBe(1);
    eventFire(clearAll[0], 'click');
    $scope.$digest();

    categoryTags = element.find('.active-filter.label.pf-filter-label-category');
    expect(categoryTags.length).toBe(0);
  });
});
