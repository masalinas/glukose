'use strict';

define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-animate',
  'angular-bootstrap'
], function (ng, couchPotato) {

  var app = ng.module('app', [
    'scs.couch-potato',
    'ui.router',
    'ui.bootstrap',

    // App
    'app.modules.layout',
    'app.modules.dashboard',
    'app.modules.master',
    'app.modules.stock'
  ]);

  couchPotato.configureApp(app);

  app.config(function ($provide, $httpProvider) {
  });

  app.run(function ($couchPotato, $rootScope, $state, $stateParams) {
    app.lazy = $couchPotato;

    $rootScope.$state = $state;
    $rootScope.$stateParams=$stateParams;
  });

  return app;
});
