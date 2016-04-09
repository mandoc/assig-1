var app = angular.module('app', []);

app.controller('dataController', function($scope, $http) {
  $http.get("https://isys-475-assg-1-mandoc.c9users.io/sample").then(function (response) {
    
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(function() {
        formatDataTable(response.data);
      });
  });
});

function formatDataTable(chartdata) {
  var data = [];
  var header = ['Date', 'FR-F', 'FR-M', 'BR-F', 'BR-M', 'TR-F', 'TR-M'];
  
    console.table(chartdata);
  
  data.push(header);

  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i].issue_date);
    temp.push(chartdata[i].fr_f);
    temp.push(chartdata[i].fr_m);
    temp.push(chartdata[i].br_f);
    temp.push(chartdata[i].br_m);
    temp.push(chartdata[i].tr_f);
    temp.push(chartdata[i].tr_m);
    data.push(temp);
  }
  
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
  
}

function getOptions()
{
     var options = {
        title: 'Year One Lab Coat Distribution',
        isStacked: 'percent',
        chartArea: {width: '60%'},
        height: 700,
        hAxis: {
          textStyle: {fontSize: 12},
          title: 'Distribution Month',
          minValue: 0
        },
        vAxis: {
          title: 'Quantity of Coats Distributed'

        }
      };

    return options;
}

