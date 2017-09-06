/* global angular  */

(function () {
  angular.module('rpGame')
        .controller('GameController', function (GameService, CharacterService, AuthService, $location) {
          console.log('game controller started...')
          const baseUrl = 'http://localhost:3002/api/'
          const self = this

          // if (!AuthService.isLoggedIn()) {
          //     $location.path('/login')
          // }
          self.characterName = 'santi'
          self.hystoryPhaseText = `Despiertas en un pueblo, rodeado de gente que te observa. De fondo oyes como alguien grita tu nombre...\n Un señor de aspecto áspero y curtido. \n-"Vamos, Acompañame"- te dice`
          self.hystoryPhaseText = self.hystoryPhaseText.replace(/\n/g, '<br/>')
          self.terrain = 'town'

          self.decisions = /* data[0].decisions */ {
            'decision': {
              'description': 'Acompañar',
              'next': '2'
            },
            'decision2': {
              'description': 'Marcharse',
              'next': '3'
            },
            'decision3': {
              'description': 'Preguntar quien es',
              'next': '4'
            }
          }

          let setHistoryPrettified = (text) => text.replace(/\n/g, '<br/>')
          self.changeHistoryPhase = function (phaseId) {
            console.log('GameController.changeHistoryPhase iniciado...')
            const getPhaseUrl = baseUrl + 'historyPhase/' + phaseId
            GameService.getGamePath(getPhaseUrl, function (data) {
              self.phase = data[0]
              self.terrain = self.phase.terrain
              if (self.terrain === 'combat') {
                let enemies = self.phase.enemies[Math.floor(Math.random() * self.phase.enemies.length)]
                self.getEnemy(enemies)
                self.next = self.phase.next
              } else {
                self.decisions = self.phase.decisions
                self.hystoryPhaseText = setHistoryPrettified(self.phase.phaseDescription)
              }
            })
          }
          self.getEnemy = function (enemy) {
            const getEnemyUrl = baseUrl + 'getEnemy/' + enemy
            GameService.getGamePath(getEnemyUrl, function (data) {
              self.combatPhase = data[0]
              self.combatContext = self.combatPhase.description
              self.enemyHealth = self.combatPhase.health
              self.movements = self.combatPhase.movements
            })
          }

          self.combatMovement = function (movementStats) {
            console.log('combatMovement inicialized!')
            let result = (Math.floor(Math.random() * 100)) < movementStats.probability
            console.log(result)
            console.log(self.enemyHealth)
            if (result) {
              self.enemyHealth -= movementStats.successDamage
              if (self.enemyHealth <= 0) {
                self.combatContext = 'Has vencido el combate!'
                setTimeout(function () {
                  self.changeHistoryPhase(self.next)
                }, 2000)
              } else {
                console.log(self.enemyHealth)
                self.combatContext = movementStats.success
                setTimeout(function () {
                  self.combatContext = self.combatPhase.description
                }, 1000)
                        /* No funciona el timeout, o mas bien, no se sincroniza */
              }
            } else {
              console.log('damage ' + movementStats.failDamage)

              CharacterService.setCurrentHealth(CharacterService.getCurrentHealth() - movementStats.failDamage)

              console.log(CharacterService.getCurrentHealth())

              self.combatContext = movementStats.fail
            }
          }
        })
})()
