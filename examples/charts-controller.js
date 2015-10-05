angular.module( 'AngularPatternflyExamples').controller( 'ExampleChartsCtrl', function( $scope ) {

  $scope.donutErrConfig = {
    'chartId': 'ChartErr',
    'units': 'GB',
    'thresholds':{'warning':'60','error':'90'},
  };

  $scope.donutErrData = {
    'used': '950',
    'total': '1000'
  };

  $scope.donutWarnConfig = {
    'chartId': 'ChartWarn',
    'units': 'GB',
    'thresholds':{'warning':'60','error':'90'}
  };

  $scope.donutWarnData = {
    'used': '650',
    'total': '1000'
  };

  $scope.donutOkConfig = {
    'chartId': 'ChartOk',
    'units': 'GB',
    'thresholds':{'warning':'60','error':'90'}
  };

  $scope.donutOkData = {
    'used': '350',
    'total': '1000'
  };

  $scope.donutConfig = {
    'chartId': 'ChartDonut',
    'units': 'GB',
  };

  $scope.donutData = {
    'used': '750',
    'total': '1000'
  };

  $scope.pctLabel = "percent";

  $scope.sparkConfig = {
    'chartId': 'exampleSparkline1',
    'tooltipType': 'default'
  };

  $scope.sparkUsageConfig = {
    'chartId': 'exampleSparkline2',
    'tooltipType': 'usagePerDay'
  };

  $scope.sparkValueConfig = {
    'chartId': 'exampleSparkline3',
    'tooltipType': 'valuePerDay'
  };

  $scope.sparkPctConfig = {
    'chartId': 'exampleSparkline4',
    'tooltipType': 'percentage'
  };

  var today = new Date();
  var dates = ['dates'];
  for (var d = 20 - 1; d >= 0; d--) {
    dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
  }

  $scope.sparkData = {
    'total': '100',
    'xData': dates,
    'yData': ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
  };
  $scope.custChartHeight = 60;


  $scope.trendsLgConfig = {
    'chartId'      : 'exampleTrendsLgChart',
    'title'        : 'Network Utilization Trends',
    'layout'       : 'large',
    'trendLabel'   : 'Virtual Disk I/O',
    'valueType'    : 'actual',
    'timeFrame'    : 'Last 15 Minutes',
    'units'        : 'MHz',
    'tooltipType'  : 'percentage'
  };

  $scope.trendsSmConfig = {
    'chartId'      : 'exampleTrendsSmChart',
    'title'        : 'Network Utilization Trends',
    'layout'       : 'small',
    'valueType'    : 'actual',
    'timeFrame'    : 'Last 15 Minutes',
    'units'        : 'MHz',
    'tooltipType'  : 'percentage'
  };

  $scope.trendsCompactConfig = {
    'chartId'      : 'exampleTrendsCompactChart',
    'title'        : 'Disk I/O',
    'layout'       : 'compact',
    'valueType'    : 'actual',
    'timeFrame'    : 'Last 15 Minutes',
    'units'        : 'GB',
    'tooltipType'  : 'percentage'
  };

  $scope.trendsInlineConfig = {
    'chartId'      : 'exampleTrendsInlineChart',
    'title'        : 'Disk I/O',
    'layout'       : 'inline',
    'trendLabel'   : 'Virtual Disk I/O',
    'valueType'    : 'actual',
    'timeFrame'    : 'Last 15 Minutes',
    'units'        : 'GB',
    'tooltipType'  : 'percentage'
  };

  $scope.utilCpuConfig = {
    title: 'CPU',
    units: 'Cores'
  };

  $scope.utilCpuDonutConfig = {
    'chartId': 'UtilCpuChartDonut',
    'units': 'Cores',
    'thresholds':{'warning':'60','error':'90'}
  };

  $scope.utilCpuSparkConfig = {
    'chartId': 'UtilCpuSparkline',
    'tooltipType': 'default'
  };

  $scope.utilCpuData = {
    used: 19,
    total: 20,
    xData: dates,
    yData: ['used', '87', '20', '30', '20', '30', '2', '14', '20', '45', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
  };

  $scope.utilMemConfig = {
    title: 'Memory',
    units: 'GB'
  };

  $scope.utilMemDonutConfig = {
    'chartId': 'UtilMemChartDonut',
    'units': 'GB',
    'thresholds':{'warning':'60','error':'90'}
  };

  $scope.utilMemSparkConfig = {
    'chartId': 'UtilMemSparkline',
    'tooltipType': 'default'
  };

  $scope.utilMemData = {
    used: 76,
    total: 100,
    xData: dates,
    yData: ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
  };
});

