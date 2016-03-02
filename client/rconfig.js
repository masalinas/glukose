var require = {
  waitSeconds: 0,
  paths: {
    'jquery': './bower_components/jquery/dist/jquery.min',
    'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.min',
    'domReady': './bower_components/requirejs-domready/domReady',
    'angular': './bower_components/angular/angular.min',
    'angular-animate': './bower_components/angular-animate/angular-animate.min',
    'angular-ui-router': './bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-bootstrap': './bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-couch-potato': './bower_components/angular-couch-potato/dist/angular-couch-potato',
    'angular-resource': './bower_components/angular-resource/angular-resource.min',
    'jquery-ui': './bower_components/jquery-ui/jquery-ui.min',
    'jquery-datatables': './bower_components/datatables/media/js/jquery.dataTables.min',
    'momentjs': './bower_components/moment/min/moment-with-locales.min',
    'angular-momentjs': './bower_components/angular-momentjs/angular-momentjs.min',
    'angular-toastr': './bower_components/angular-toastr/dist/angular-toastr.tpls.min',
    'angular-socket-io': './bower_components/angular-socket-io/socket.min',

    // app modules included
    'modules-includes': 'includes',

    // app services
    'services': './js/lb-services',

    // UI bootstrap elements
    'dark-velvet': './js/darkvelvet'
  },
  shim: {
    'bootstrap': {deps: ['jquery']},
    'angular': {'exports': 'angular', deps: ['jquery']},
    'angular-animate': { deps: ['angular'] },
    'angular-bootstrap': { deps: ['angular', 'bootstrap'] },
    'angular-ui-router': { deps: ['angular'] },
    'angular-couch-potato': { deps: ['angular'] },
    'angular-resource': { deps: ['angular'] },
    'jquery-ui': { deps: ['jquery'] },
    'jquery-datatables': { deps: ['jquery'] },
    'momentjs': {deps: ['jquery']},
    'angular-momentjs': {deps: ['momentjs']},
    'angular-toastr': {deps: ['angular']},
    'angular-socket-io': {deps: ['angular']},

    // app modules included
    'modules-includes': { deps: ['angular']},

    // app services
    'services': { deps: ['angular-resource']},

    // UI bootstrap elements
    'dark-velvet': {deps: ['jquery-ui', 'bootstrap']}
  },
  priority: [
    'jquery',
    'bootstrap',
    'angular'
  ]
}
