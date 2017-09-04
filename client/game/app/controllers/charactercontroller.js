/* global angular */

(function () {
  angular.module('rpGame')
    .controller('CharacterController', CharacterController)

  function CharacterController (DataService) {
    console.log('CharacterController loaded...')
    const self = this
    self.characterName = 'Test character'
    self.currentHealth = DataService.currentHealth
    self.maximHealth = 100
    self.healthPercentage = Math.round((self.currentHealth / self.maximHealth) * 100)
  }

    // class CharacterController {
    //   constructor() {
    //     console.log('CharacterController loaded...')
    //     // const self = this
    //     // let currentHealth = 100
    //     // let healthPercentage = (100/300)*100
    //   }
    // }
})()
