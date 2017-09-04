/* global angular */
(function() {
    angular.module('rpGame')
        .service('CharacterService', function() {
            let currentHealth = 80

            this.setCurrentHealth = (health) => {
                currentHealth = Math.round(health)

                if (currentHealth <= 0) {
                    $location.path('gameover')
                }
            }

            this.getCurrentHealth = () => {
                return currentHealth
            }
        })
})()