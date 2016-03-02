define(['modules/layout/module', 'dark-velvet'], function (module) {
  "use strict";

  module.registerController('LayoutCtrl', ['$scope', '$state', '$log', 'Socket', 'toastr', function ($scope, $state, $log, Socket, toastr) {
    // get push event: measure
    Socket.on('events', function(ptname) {
      toastr.success('for patient ' + ptname, 'New Measures');
    });

    // initialize the view layout
    $state.go('app.dashboard');
  }])
});
