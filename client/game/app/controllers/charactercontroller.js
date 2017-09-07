/* global angular */

(function () {
  angular.module('rpGame')
        .controller('CharacterController', CharacterController)

  function CharacterController (CharacterService, $rootScope) {
    const self = this
    self.username = $rootScope.loggedUser
    this.getHealthPercentage = CharacterService.getCurrentHealth
  }
})()
