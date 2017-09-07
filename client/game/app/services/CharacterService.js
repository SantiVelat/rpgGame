/* global angular */
(function () {
  angular.module('rpGame')
        .service('CharacterService', function ($location) {
          let currentHealth = 100

          this.setCurrentHealth = (health) => {
            currentHealth = health > 0 ? Math.round(health) : 0
          }

          this.getCurrentHealth = () => {
            return currentHealth
          }
        })
})()
