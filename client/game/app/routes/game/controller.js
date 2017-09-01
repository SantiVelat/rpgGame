/* global angular  */

(function () {
  angular.module('rpGame')
    .controller('GameController', GameController)
  function GameController (DataService) {
    const baseUrl = 'http://localhost:3002/api/'
    const self = this
    self.characterName = 'santi'
    self.hystoryPhaseText = /* self.phase.phaseDescription */`Despiertas en un pueblo, rodeado de gente que te observa. No recuerdas nada... De repente oyes como alguien grita tu nombre: \n -"${self.characterName}, ${self.characterName}!!"- \n Un señor de aspecto áspero y curtido. \n-"Acompañame"- te dice`
    self.hystoryPhaseText = self.hystoryPhaseText.replace(/\n/g, '<br/>')

    self.decisions = /* data[0].decisions */
    {
      'decision':
      {
        'description': 'Acompañar',
        'next': '2'
      },
      'decision2':
      {
        'description': 'Marcharse',
        'next': '3'
      },
      'decision3':
      {
        'description': 'Preguntar quien es',
        'next': '4'
      }
    }

    self.changeHistoryPhase = function (phaseId) {
      console.log('GameController.changeHistoryPhase iniciado...')
      const getPhaseUrl = baseUrl + 'historyPhase/' + phaseId
      DataService.getGamePath(getPhaseUrl, function (data) {
        console.log(data[0])
        self.phase = data[0]
        self.decisions = self.phase.decisions
        self.hystoryPhaseText = self.phase.phaseDescription
      })
    }
  }
})()
