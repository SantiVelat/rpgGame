/* global angular  */

(function () {
  angular.module('rpGame')
        .controller('GameController', function (GameService, CharacterService, AuthService, $location, $timeout, $rootScope) {
          console.log('game controller started...')
          // const baseUrl = 'https://rpgame.herokuapp.com/api/'
          const baseUrl = 'http://localhost:3002/api/'
          const self = this

          let setHistoryPrettified = (text) => text.replace(/\n/g, '<br/>')

          self.changeHistoryPhase = function (phaseId) {
            const getPhaseUrl = baseUrl + 'historyPhase/' + phaseId
            GameService.getGamePath(getPhaseUrl, function (data) {
              if (CharacterService.getCurrentHealth() == 0 && phaseId == 1) {
                CharacterService.setCurrentHealth(100)
              }
              self.phase = data[0]
              self.terrain = self.phase.terrain
              if (self.terrain === 'combat') {
                let enemies = self.phase.enemies[Math.floor(Math.random() * self.phase.enemies.length)]
                self.getEnemy(enemies)
                self.next = self.phase.next
              } else {
                if (self.phase.gameOver) {
                  self.gameOver = true
                  self.gameOverText = self.phase.gameOver
                } else {
                  self.decisions = self.phase.decisions
                  self.hystoryPhaseText = setHistoryPrettified(self.phase.phaseDescription)
                }
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
              self.enemyName = self.combatPhase.name
              self.gameOverText = self.combatPhase.gameOver
            })
          }

          self.combatMovement = function (movementStats) {
            console.log('combatMovement inicialized!')
            let result = (Math.floor(Math.random() * 100)) < movementStats.probability
            if (result) {
              self.enemyHealth -= movementStats.successDamage
              if (self.enemyHealth <= 0) {
                self.combatContext = 'Has vencido el combate!'
                setTimeout(function () {
                  self.changeHistoryPhase(self.next)
                }, 2000)
              } else {
                self.combatContext = movementStats.success
                setTimeout(function () {
                  self.combatContext = self.combatPhase.description
                }, 1000)
                        /* No funciona el timeout, o mas bien, no se sincroniza */
              }
            } else {
              console.log('damage ' + movementStats.failDamage)
              self.combatContext = movementStats.fail
              CharacterService.setCurrentHealth(CharacterService.getCurrentHealth() - movementStats.failDamage)
              if (CharacterService.getCurrentHealth() == 0) {
                console.log('entra a comparacion')
                $timeout(function () {
                  self.gameOver = true
                }, 2000)
              }
            }
          }
          self.newGame = () => {
            self.gameOver = false
            self.changeHistoryPhase(1)
            CharacterService.setCurrentHealth(100)
          }
          GameService.getProgress(function (response) {
            self.changeHistoryPhase(response.currentHistory)
          })
        })
})()
