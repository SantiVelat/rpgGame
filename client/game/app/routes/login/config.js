/* global angular */
(function () {
  angular.module('rpGame')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: 'app/routes/login/template.html',
          controller: 'LoginCtrl',
          controllerAs: 'ctrl'
        })
    })
})()