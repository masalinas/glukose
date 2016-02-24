define(['modules/stock/module'], function (module) {
  "use strict";

  module.registerController('StockCtrl', ['$scope', '$log', function ($scope, $log) {
    $(".view").css("min-height", $(window).height() - $('.header').height() - 100);
  }])
});
