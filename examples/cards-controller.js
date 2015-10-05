angular.module( 'AngularPatternflyExamples').controller( 'ExampleCardsCtrl', function( $scope ) {

  $scope.cardEventsFooterConfig = {
    'iconClass' : 'fa fa-flag',
    'text'      : 'View All Events',
    'callBackFn': function () {
      alert("Footer Callback Fn Called");
    }
  }

  $scope.cardEventsFilterConfig = {
    'filters' : [{label:'Last 30 Days', value:'30'},
      {label:'Last 15 Days', value:'15'},
      {label:'Today', value:'today'}],
    'callBackFn': function (f) {
      alert("Filter Callback Fn Called for '" + f.label + "' value = " + f.value);
    },
    'defaultFilter' : '1'
  }

  $scope.filterConfigHeader = {
    'filters' : [{label:'Last 30 Days', value:'30'},
      {label:'Last 15 Days', value:'15'},
      {label:'Today', value:'today'}],
    'callBackFn': function (f) {
      alert("Header Filter Callback Fn Called for '" + f.label + "' value = " + f.value);
    },
    'position' : 'header'
  }

  $scope.actionBarConfig = {
    'iconClass' : 'fa fa-plus-circle',
    'text'      : 'Add New Cluster',
    'callBackFn': function () {
      alert("Footer Callback Fn Called");
    }
  }

  var today = new Date();
  var dates = ['dates'];
  for (var d = 20 - 1; d >= 0; d--) {
    dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
  }

  $scope.configVirtual = {
    'chartId'      : 'virtualTrendsChart',
    'layout'       : 'inline',
    'trendLabel'   : 'Virtual Disk I/O',
    'units'        : 'GB',
    'tooltipType'  : 'percentage'
  };

  $scope.dataVirtual = {
    'total': '250',
    'xData': dates,
    'yData': ['used', '90', '20', '30', '20', '20', '10', '14', '20', '25', '68', '44', '56', '78', '56', '67', '88', '76', '65', '87', '76']
  };

  $scope.configPhysical = {
    'chartId'      : 'physicalTrendsChart',
    'layout'       : 'inline',
    'trendLabel'   : 'Physical Disk I/O',
    'units'        : 'MHz',
    'tooltipType'  : 'percentage'
  };

  $scope.dataPhysical = {
    'total': '250',
    'xData': dates,
    'yData': ['used', '20', '20', '35', '20', '20', '87', '14', '20', '25', '28', '44', '56', '78', '56', '67', '88', '76', '65', '87', '16']
  };

  $scope.configMemory = {
    'chartId'      : 'memoryTrendsChart',
    'layout'       : 'inline',
    'trendLabel'   : 'Memory Utilization',
    'units'        : 'GB',
    'tooltipType'  : 'percentage'
  };

  $scope.dataMemory = {
    'total': '250',
    'xData': dates,
    'yData': ['used', '20', '20', '35', '70', '20', '87', '14', '95', '25', '28', '44', '56', '66', '16', '67', '88', '76', '65', '87', '56']
  };

  $scope.aggStatus = {
    "title":"Nodes",
    "count":793,
    "href":"#",
    "iconClass": "fa fa-shield",
    "notifications":[
      {
        "iconClass":"pficon pficon-error-circle-o",
        "count":4,
        "href":"#"
      },
      {
        "iconClass":"pficon pficon-warning-triangle-o",
        "count":1
      }
    ]
  };

  $scope.aggTallStatus = {
    "title":"Providers",
    "count":2,
    "notifications":[
      {
        "iconClass":"pficon pficon-error-circle-o",
        "count":1,
        "href":"#"
      },
      {
        "iconClass":"pficon pficon-warning-triangle-o",
        "count":1,
        "href":"#"
      }
    ]
  };
});

