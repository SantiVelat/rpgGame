/* global angular */
(function () {
  angular.module('rpGame')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/register', {
          templateUrl: 'app/routes/register/template.html',
          controller: 'RegisterCtrl',
          controllerAs: 'ctrl'
        })
    })
})()