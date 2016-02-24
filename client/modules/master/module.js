define(['angular',
        'angular-couch-potato',
        'angular-ui-router'], function(ng, couchPotato){

  var module = angular.module('app.modules.master', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(function($stateProvider, $couchPotatoProvider) {
    $stateProvider
      .state('app.product', {
        url: '/product',
        data: {
          title: 'Product Master View'
        },
        views: {
          "root": {
            templateUrl: 'modules/master/views/product-master.html',
            controller: 'ProductMasterCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/master/controllers/ProductMasterCtrl'
              ])
            }
          }
        }
      })
      .state('app.client', {
        url: '/client',
        data: {
          title: 'Client Master View'
        },
        views: {
          "root": {
            templateUrl: 'modules/master/views/client-master.html',
            controller: 'ClientMasterCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/master/controllers/ClientMasterCtrl'
              ])
            }
          }
        }
      });
  });

  module.run(function($couchPotato){
    module.lazy = $couchPotato
  });

  return module;
});
