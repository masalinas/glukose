define(['modules/dashboard/module'], function (module) {
  "use strict";

  module.registerController('DashboardCtrl', ['$scope', '$log', '$moment', 'Socket', 'toastr', 'Device', function ($scope, $log, $moment, Socket, toastr, Device) {
    $(".view").css("min-height", $(window).height() - $('.header').height() - 100);

    $('#datatable-measures').DataTable({columns: [{ "targets": 'measure.value', "title": "Value mg/dL", "data": 'value', "type": "number"},
                                                  { "targets": 'measure.date', "title": "Date", "data": 'date', "type": "date", "render": function ( data, type, full, meta ) {
                                                       if (data != undefined && data != null)
                                                         return $moment(data).format('DD/MM/YYYY HH:mm');
                                                       else
                                                         return null;
                                                  }}],
                                        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                                                            if ( aData.value < "60" ) {
                                                              $('td', nRow).css('background-color', '#E91632');
                                                            }
                                                            else if ( aData.value > "120" ) {
                                                              $('td', nRow).css('background-color', '#E91632');
                                                            }
                                        }});

    // set textbox filter style
    $('.dataTables_filter input').attr('type', 'text');

    // get push event: measure
    Socket.on('events', function(ptname) {
      getMeasures();
    })

    $scope.$parent.onDeviceChange = function(device) {
      // inject the datasource to datatable
      $('table').dataTable().fnClearTable();
      $('table').dataTable().fnAddData(device.measures);

      //if ($scope.device.measures.length > 0) {
      //  var oTT =  $('table').dataTable().fnGetInstance( 'datatable-measures' );

      //oTT.fnSelect($('table tbody tr')[0]);
      //}
    }

    function getMeasures() {
      Device.getMeasures()
        .$promise
        .then(function(value, responseHeaders) {
          $('table').dataTable().fnClearTable();

          if (value !== undefined) {
            var devices = JSON.parse(angular.toJson(value))

            // set head dashboard
            $scope.$parent.devices = devices;

            if (devices.length > 0) {
              $scope.$parent.device = devices[0];

              // inject the datasource to datatable
              $('table').dataTable().fnAddData(devices[0].measures);

              //if ($scope.device.measures.length > 0) {
              //  var oTT =  $('table').dataTable().fnGetInstance( 'datatable-measures' );

              //oTT.fnSelect($('table tbody tr')[0]);
              //}
            }
          }
        }, function(httpResponse) {
          var error = httpResponse.data.error;
          console.log('Error getting measures - ' + error.status + ": " + error.message);
        });
    }

    getMeasures();
  }])
});
