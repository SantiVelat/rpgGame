/* global angular */
(function () {
  angular.module('rpGame')
        .service('SaveGameService', function ($http) {
          this.saveGame = (statsUrl, callback) => {
            console.log('SaveGameService.saveGame iniciado...')
            $http.put(statsUrl)
                    .then(response => {
                      callback(response.data)
                    })
          }
        })
})()
