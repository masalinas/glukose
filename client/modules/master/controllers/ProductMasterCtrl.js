define(['modules/master/module', 'jquery-datatables'], function (module) {
  "use strict";

  module.registerController('ProductMasterCtrl', ['$scope', '$log', function ($scope, $log) {
    $(".view").css("min-height", $(window).height() - $('.header').height() - 50);

    $('#example').DataTable();

    $('.dataTables_filter input').attr('type', 'text');
  }])
});
