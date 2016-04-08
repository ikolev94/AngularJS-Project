"use strict";

angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {

        var usersUrl = BASE_URL + 'users/';

        function register(user) {
            var defer = $q.defer();
            $http.post(BASE_URL + 'Account/Register', user)
                .then(function (respond) {
                    console.log(respond);
                    defer.resolve(respond.data);
                }, function (error) {
                    console.log(error);
                    defer.reject(error.data.message)
                });
            return defer.promise;
        }

        function login(user) {
            var defer = $q.defer();
            $http.post(usersUrl + 'login', user)
                .then(function (success) {
                    defer.resolve(success.data);
                }, function (error) {
                    defer.reject(error.data.error_description || error.data.message);
                });
            return defer.promise;
        }

        return {
            register: register,
            login: login
        }
    }]);