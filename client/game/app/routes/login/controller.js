/* global angular */
(function () {
  angular.module('rpGame')
    .controller('LoginCtrl', LoginCtrl)

  function LoginCtrl (AuthService, toastr, $location) {
    this.login = (e) => {
      e.preventDefault()
      AuthService.login(this.username, this.password)
        .then(success => {
          if (success) {
            toastr.success('succesfully logged')
            $location.path('/')
          }
        }).catch(err=>{toastr.error('wrong password or username')})
    }
  }
})()