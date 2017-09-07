/* global angular */
(function () {
  angular.module('rpGame')
        .service('GameService', function ($http, $rootScope) {
          this.getGamePath = (roadUrl, callback) => {
            console.log('GameService.getGamePath iniciado...')
            $http.get(roadUrl)
                    .then(response => {
                      callback(response.data)
                    })
          }
          this.getProgress = (callback) => {
            $http.get('/api/getprogress/' + $rootScope.loggedUser)
                   .then(response => {
                     callback(response.data)
                   })
          }
        })
})()
