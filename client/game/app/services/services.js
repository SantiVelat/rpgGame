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
    this.currentHealth=80
    self.setCurrentHealth=function(life){
      self.currentHealth = life
      if (self.currentHealth<=0){
        
      }
    }
   /*Porque con self. no me funciona??*/
  }
})()
