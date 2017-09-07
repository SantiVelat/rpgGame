(function () {
  angular.module('rpGame')
    .controller('LogoutController', LogoutCtrl)

  function LogoutCtrl (AuthService, $location, $scope) {
    this.logout = function () {
      AuthService.logout()
      $location.path('/login')
    }
  }
})()