/* global angular */
(function () {
  angular.module('rpGame')
        .service('GameService', function ($http) {
          this.getGamePath = (roadUrl, callback) => {
            console.log('GameService.getGamePath iniciado...')
            $http.get(roadUrl)
                    .then(response => {
                      callback(response.data)
                    })
          }
        })
})()
