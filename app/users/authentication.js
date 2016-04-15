"use strict";

angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', ['$http', '$q', 'BASE_URL', 'identity', '$cookies',
        function ($http, $q, BASE_URL, identity, $cookies) {

            function register(user) {
                var defer = $q.defer();
                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function login(user) {
                var defer = $q.defer();
                user = "username=" + user.username + "&password=" + user.password +
                    "&grant_type=password";
                $http.post(BASE_URL + 'api/Token', user)
                    .then(function (success) {
                        var tokenValue = success.data.access_token;

                        sessionStorage.headers = 'Bearer ' + tokenValue;
                        sessionStorage.userName = success.data.userName;

                        $cookies.put('authentication', tokenValue, {expires: new Date(success.data['.expires'])});
                        $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                        $http.get(BASE_URL + 'users/me')
                            .success(function (identityResponse) {
                                sessionStorage.userId = identityResponse.Id;
                                sessionStorage.isAdmin = identityResponse.isAdmin;
                                identity.setUser(identityResponse);
                                defer.resolve(success.data);
                            })


                    }, function (error) {
                        defer.reject(error.data.error_description || error.data.message);
                    });
                return defer.promise;
            }

            function logout() {
                $cookies.remove();
                $http.defaults.headers.common.Authorization = null;
                identity.removeUser();
            }

            return {
                register: register,
                login: login,
                logout: logout
            }
        }]);