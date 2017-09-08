/* global angular  */

(function () {
  angular.module('rpGame')
        .controller('GameController', function (SaveGameService, GameService, CharacterService, AuthService, $location, $timeout, $rootScope) {
          console.log('game controller started...')
          const baseUrl = 'https://rpgame.herokuapp.com/api/'
          // const baseUrl = 'http://localhost:3002/api/'
          const self = this

          let setHistoryPrettified = (text) => text.replace(/\n/g, '<br/>')

          self.changeHistoryPhase = function (phaseId) {
            const getPhaseUrl = baseUrl + 'historyPhase/' + phaseId
            GameService.getGamePath(getPhaseUrl, function (data) {
              if (CharacterService.getCurrentHealth() == 0 && phaseId == 1) {
                CharacterService.setCurrentHealth(100)
              }
              self.phase = data[0]
              self.autoSaveGame()
              self.terrain = self.phase.terrain
              if (self.terrain === 'combat') {
                let enemies = self.phase.enemies[Math.floor(Math.random() * self.phase.enemies.length)]
                self.getEnemy(enemies)
                self.next = self.phase.next
                self.setSound('combat')
              } else {
                if (self.phase.gameOver) {
                  self.setSound('gameOver')
                  self.gameOver = true
                  self.gameOverText = self.phase.gameOver
                } else if (self.phase.toBeContinued) {
                  self.toBeContinued = true
                  self.toBecontinued = self.phase.toBeContinued
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
                self.setSound('win')
                self.combatContext = 'Has vencido el combate!'
                setTimeout(function () {
                  self.changeHistoryPhase(self.next)
                  self.setSound()
                }, 2000)
              } else {
                self.combatContext = movementStats.success
                setTimeout(function () {
                  self.combatContext = self.combatPhase.description
                }, 1000)
                        /* No funciona el timeout, o mas bien, no se sincroniza */
              }
            } else {
              self.combatContext = movementStats.fail
              CharacterService.setCurrentHealth(CharacterService.getCurrentHealth() - movementStats.failDamage)
              if (CharacterService.getCurrentHealth() == 0) {
                console.log('entra a comparacion')
                $timeout(function () {
                  self.gameOver = true
                  self.setSound('gameOver')
                }, 2300)
              }
            }
          }
          self.newGame = () => {
            self.gameOver = false
            self.toBeContinued = false
            self.changeHistoryPhase(1)
            CharacterService.setCurrentHealth(100)
            self.setSound('town')
          }

          self.autoSaveGame = () => {
            const userStatsUrl = baseUrl + 'savegame/' + $rootScope.loggedUser + '/' + CharacterService.getCurrentHealth() + '/' + self.phase.id
            SaveGameService.saveGame(userStatsUrl, (response) => {
              console.log(response)
            })
            self.saving = true
            $timeout(function () {
              self.saving = false
            }, 2000)
          }
          self.soundOn = true
          self.sound = 'on'
          self.setSound = (sound) => {
            if (self.soundOn === true) {
              if (self.audio) { self.audio.pause() }
              let src
              if (sound === 'combat') {
                src = '../src/sounds/Battle.mp3'
              } else if (sound === 'gameOver') {
                src = '../src/sounds/dead.mp3'
              } else if (sound === 'win') {
                src = '../src/sounds/win.mp3'
              } else {
                src = '../src/sounds/town.mp3'
              }
              self.audio = new Audio(src)
              self.audio.play()
            }
          }
          self.enableSound = () => {
            self.soundOn = !self.soundOn
            !self.soundOn ? self.audio.pause() : self.setSound()
            self.sound = !self.soundOn ? 'off' : 'on'
          }
          GameService.getProgress(function (response) {
            self.setSound()
            self.changeHistoryPhase(response.currentHistory)
            CharacterService.setCurrentHealth(response.currentHealth)
          })
        })
})()
