define(['modules/dashboard/module'], function (module) {
  "use strict";

  module.registerController('DashboardCtrl', ['$scope', '$log', '$moment', 'Device', function ($scope, $log, $moment, Device) {
    $(".view").css("min-height", $(window).height() - $('.header').height() - 100);

    $('#datatable-measures').DataTable({columns: [{ "targets": 'measure.value', "title": "Value", "data": 'value', "type": "number"},
                                                  { "targets": 'measure.date', "title": "Date", "data": 'date', "type": "date", "render": function ( data, type, full, meta ) {
                                                       if (data != undefined && data != null)
                                                         return $moment(data).format('DD/MM/YYYY HH:mm');
                                                       else
                                                         return null;
                                                  }}]});

    $('.dataTables_filter input').attr('type', 'text');

    function getMeasures() {
      Device.getMeasures()
        .$promise
        .then(function(value, responseHeaders) {
          $('table').dataTable().fnClearTable();

          if (value !== undefined) {
            $scope.device = JSON.parse(angular.toJson(value))

            // set head dashboard
            $scope.$parent.ptname = $scope.device.ptname;
            $scope.$parent.serlnum = $scope.device.serlnum;

            // inject the datasource to datatable
            $('table').dataTable().fnAddData($scope.device.measures);

            //if ($scope.device.measures.length > 0) {
            //  var oTT =  $('table').dataTable().fnGetInstance( 'datatable-measures' );

            //oTT.fnSelect($('table tbody tr')[0]);
            //}
          }
        }, function(httpResponse) {
          var error = httpResponse.data.error;
          console.log('Error getting measures - ' + error.status + ": " + error.message);
        });
    }

    getMeasures();
  }])
});
