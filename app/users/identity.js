"use strict";

angular.module('issueTrackerSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            var currentUser = {};
            var deferred = $q.defer();

            return {
                getCurrentUser: function () {
                    if (Object.keys(currentUser).length) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                requestUserProfile: function () {
                    var userProfileDeferred = $q.defer();

                    $http.get(BASE_URL + 'users/me')
                        .then(function (response) {
                            currentUser = response.data;
                            deferred.resolve(currentUser);
                            userProfileDeferred.resolve();
                        });

                    return userProfileDeferred.promise;
                },
                removeUser: function () {
                    currentUser = {};
                }
            };
        }]);