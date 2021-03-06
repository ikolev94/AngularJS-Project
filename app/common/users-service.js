(function () {
    "use strict";

    angular.module('services.usersService', [])
        .factory('usersService', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {

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

                function makeAdmin(user) {
                    var defer = $q.defer();
                    $http.put(BASE_URL + 'users/makeadmin', user)
                        .then(function (success) {
                            defer.resolve(success.data);
                        }, function (error) {
                            defer.reject(error.data.error_description || error.data.Message);
                        });
                    return defer.promise;
                }

                return {
                    getAllUsers: getAllUsers,
                    changePassword: changePassword,
                    makeAdmin: makeAdmin
                };
            }]);
}());