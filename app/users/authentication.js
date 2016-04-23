(function () {
    "use strict";

    angular.module('issueTrackerSystem.users.authentication', [])
        .factory('authentication', ['$http', '$q', 'BASE_URL', 'identity', '$cookies',
            function ($http, $q, BASE_URL, identity, $cookies) {

                var AUTHENTICATION_COOKIE_KEY = '__Authentication_Cookie_Key__';

                function preserveUserData(data) {
                    var accessToken = data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                }

                function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
                }

                function refreshCookie() {
                    if (isAuthenticated()) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                        identity.requestUserProfile();
                    }
                }

                function register(user) {
                    var defer = $q.defer();
                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message||error.data.Message)
                        });
                    return defer.promise;
                }

                function login(user) {
                    var defer = $q.defer();
                    user = "username=" + user.username + "&password=" + user.password +
                        "&grant_type=password";
                    $http.post(BASE_URL + 'api/Token', user)
                        .then(function (success) {

                            preserveUserData(success.data);

                            identity.requestUserProfile()
                                .then(function () {
                                    defer.resolve(success.data);
                                });

                        }, function (error) {
                            defer.reject(error.data.message || error.data.error_description || error.data.Message)
                        });
                    return defer.promise;
                }

                function logout() {
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $http.defaults.headers.common.Authorization = null;
                    identity.removeUser();
                    sessionStorage.clear();
                }

                return {
                    register: register,
                    login: login,
                    logout: logout,
                    refreshCookie: refreshCookie,
                    isAuthenticated: isAuthenticated
                }
            }]);
}());