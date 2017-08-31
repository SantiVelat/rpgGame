/* global angular */

(function () {
  angular.module('rpGame')
    .controller('CharacterController', CharacterController)

  function CharacterController () {
    console.log('CharacterController loaded...')
    const self = this
    self.characterName = 'palomo'
    self.currentHealth = 100
    self.healthPercentage = (self.currentHealth / 300) * 100
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
