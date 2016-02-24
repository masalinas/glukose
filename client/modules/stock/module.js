define(['angular',
        'angular-couch-potato',
        'angular-ui-router'], function(ng, couchPotato){

  var module = angular.module('app.modules.stock', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(function($stateProvider, $couchPotatoProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.stock', {
        url: '/stock',
        data: {
          title: 'Stock View'
        },
        views: {
          root: {
            templateUrl: 'modules/stock/views/stock.html',
            controller: 'StockCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/stock/controllers/StockCtrl'
              ])
            }
          }
        }
      });
  });

  module.run(function($couchPotato, $rootScope, $state, $stateParams){
    module.lazy = $couchPotato
  });

  return module;
});
