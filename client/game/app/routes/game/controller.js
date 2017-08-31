/* global angular */

(function () {
  angular.module('rpGame')
    .controller('GameController', GameController)
  const baseUrl = 'http://localhost:3002/api/'
  function GameController () {
    const self = this
    self.hystoryPhaseText = 'loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloremque cum libero voluptatem incidunt dicta aperiam odio quis nemo totam possimus ad magni voluptatum, perferendis minus veniam sed porro eaque'
    self.decisions = 
        {
      "decision1":
            {
            "description":"descritpion decision 1",
            "next": "2"
          },
        "decision2":
          {
            "description":"descritpion decision 2",
            "next": "3"
          },
        "decision3":
          {
            "description":"descritpion decision 3",
            "next": "4"
          }
        }
  }

  self.changeHistoryPhase = function(phaseId) {
    console.log('changeHistoryPhase iniciado')
     const getPhaseUrl = baseUrl+'historyPhase/'+ phaseId
     DataService.getGamePath(getPhaseUrl, function(data){
        console.log(data)
        self.phase=data
     })
  }
})()
