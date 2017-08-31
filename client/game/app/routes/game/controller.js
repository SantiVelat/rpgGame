/* global angular */

(function () {
  angular.module('rpGame')
    .controller('GameController', GameController)

  function GameController () {
    const self = this
    this.hystoryPhaseText = 'loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloremque cum libero voluptatem incidunt dicta aperiam odio quis nemo totam possimus ad magni voluptatum, perferendis minus veniam sed porro eaque'
    this.decisions = [
      {
        next: 'phase2',
        description: 'this is decision 1'
      },
      {
        next: 'phase3',
        description: 'this is decision 2 '
      },
      {
        next: 'phase3',
        description: 'this is decision 2'
      }]
  }
})()
