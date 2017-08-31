/* global angular */

angular.module('rpGame')
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '../app/routes/game/template.html',
      controller: 'GameController',
      controllerAs: 'GCVM'
    })
  })
