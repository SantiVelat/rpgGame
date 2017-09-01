/* global angular */
(function () {
  angular.module('rpGame')
  .service('DataService', DataService)

  function DataService ($http) {
    const self = this
    self.getGamePath = function (roadUrl, callback) {
      console.log('DataService.getGamePath iniciado...')
      $http.get(roadUrl)
                    .then(function (response) {
                      callback(response.data)
                    })
    }
  }
})()
