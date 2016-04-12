"use strict";

angular.module('services.usersService', [])
    .factory('usersService', [
        '$http',
        '$q',
        function ($http, $q) {
            var baseUrl = 'http://softuni-issue-tracker.azurewebsites.net/users/';

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['access_token'];

            function getAllUsers() {
                var defer = $q.defer();
                $http.get(baseUrl)
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }


            return {
                getAllUsers: getAllUsers
            };
        }]);