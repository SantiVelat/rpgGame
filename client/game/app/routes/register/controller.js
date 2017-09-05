/* global angular */
(function () {
  angular.module('rpGame')
    .controller('RegisterCtrl', RegisterCtrl)

  function RegisterCtrl (AuthService, toastr) {
    this.register = (e) => {
      e.preventDefault()
      AuthService.register(this.username, this.password)
        .then(data => {
          if (data.success) toastr.success(data.msg)
          else toastr.error(data.msg)
        })
    }
  }
})()