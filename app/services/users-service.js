"use strict";

angular.module('services.usersService', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['access_token'];

            function getAllUsers() {
                var defer = $q.defer();
                $http.get(BASE_URL + 'users')
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function changePassword(passwordData) {
                var defer = $q.defer();
                $http.post(BASE_URL + 'api/Account/ChangePassword', passwordData)
                    .then(function (success) {
                        defer.resolve(success.data);
                    }, function (error) {
                        defer.reject(error.data.error_description || error.data.Message);
                    });
                return defer.promise;
            }

            return {
                getAllUsers: getAllUsers,
                changePassword: changePassword
            };
        }]);