/* global angular */
(function () {
  angular.module('rpGame')
    .factory('StorageService', StorageService)

  function StorageService ($window) {
    function saveToken (token) {
      $window.localStorage.setItem('authToken', token)
    }

    function getToken () {
      return $window.localStorage.getItem('authToken')
    }

    function removeToken () {
      $window.localStorage.removeItem('authToken')
    }

    return { saveToken, getToken, removeToken }
  }
})()