/* global game */
(function () {
  const game = angular.module('rpGame')
  game.service('DataService', function ($https) {
    const self = this
    self.getGamePath=function(roadUrl, callback){
           console.log('getGamePath iniciado...')
		    	 $http.get(roadUrl)
                    .then(function(response) {
                    	console.log(response.data);
                    	callback(response.data)
                	})
		}
	});
 })

