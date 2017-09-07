/* global angular */

(function () {
  angular.module('rpGame')
        .controller('CharacterController', CharacterController)

  function CharacterController (CharacterService) {
    this.characterName = 'Test character'

    this.getHealthPercentage = CharacterService.getCurrentHealth
  }
})()
