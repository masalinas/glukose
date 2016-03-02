define(['angular',
        'angular-couch-potato',
        'angular-ui-router',
        'angular-socket-io',
        'angular-toastr'], function(ng, couchPotato){

  var module = angular.module('app.modules.layout', ['ui.router', 'btford.socket-io', 'toastr']);

  couchPotato.configureApp(module);

  module.config(function($provide, $stateProvider, $couchPotatoProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        data: {
          title: 'Layout View'
        },
        views: {
          root: {
            templateUrl: 'modules/layout/views/layout.html',
            controller: 'LayoutCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/layout/controllers/LayoutCtrl'
              ])
            }
          }
        }
      });

    $provide.factory('Socket', function (socketFactory) {
      return socketFactory();
    });

    // load the default layout
    $urlRouterProvider.otherwise('/app');
  });

  module.run(function($couchPotato, $rootScope, $state, $stateParams) {
    module.lazy = $couchPotato
  });

  return module;
});
