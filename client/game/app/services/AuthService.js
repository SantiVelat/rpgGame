/* global angular */
(function () {
  angular.module('rpGame')
    .factory('AuthService', AuthService)

  function AuthService ($rootScope, $http, StorageService, jwtHelper) {
    function isLoggedIn () {
      const token = StorageService.getToken()
      if (!token) return false
      return true
    }

    function setCredentials (token) {
      const tokenPayload = jwtHelper.decodeToken(token)
      $rootScope.loggedUser = tokenPayload.username
    }

    function register (username, password) {
      return $http.post('/register', {username, password})
                .then(res => res.data)
    }

    function login (username, password) {
      return $http.post('/login', {username, password})
                .then(res => res.data)
                .then(data => {
                  StorageService.saveToken(data.token)
                  setCredentials(data.token)
                  return data.success
                })
    }

    function logout (username, password) {
      StorageService.removeToken()
      delete $rootScope.loggedUser
    }

    return { register, login, isLoggedIn, setCredentials, logout }
  }
})()
