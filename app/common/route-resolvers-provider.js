(function () {
    'use strict';

    var routeResolversProvider = function routeResolversProvider() {

        function setUser(userInfo, currentUser) {
            currentUser.Id = userInfo.Id;
            currentUser.isAdmin = userInfo.isAdmin;
            currentUser.Username = userInfo.Username;
        }

        var routeResolveChecks = {
            user: {
                user: ['currentUser', 'authentication', '$q', '$location', '$rootScope',
                    function (currentUser, authentication, $q, $location, $rootScope) {
                        if (Object.keys(currentUser).length === 0) {
                            var defer = $q.defer();
                            authentication.getIdentity()
                                .then(function (userInfo) {
                                    setUser(userInfo, currentUser);
                                    defer.resolve(userInfo);
                                    $rootScope.$broadcast('user-event', currentUser);
                                    console.log('get user');
                                }, function (error) {
                                    defer.reject(error);
                                    $rootScope.$broadcast('guest-event');
                                    $location.path('/');
                                });
                            return defer.promise;
                        } else {
                            console.log('have user');
                            $rootScope.$broadcast('user-event', currentUser);
                            return currentUser;
                        }
                    }]
            },
            admin: {
                user: ['currentUser', 'authentication', '$q', '$location', '$rootScope',
                    function (currentUser, authentication, $q, $location, $rootScope) {
                        if (Object.keys(currentUser).length === 0) {
                            var defer = $q.defer();
                            authentication.getIdentity()
                                .then(function (userInfo) {
                                    if (userInfo.isAdmin) {
                                        setUser(userInfo, currentUser);
                                        defer.resolve(userInfo);
                                        $rootScope.$broadcast('user-event', currentUser);
                                        console.log('get user');
                                    } else {
                                        console.log('no admin');
                                        $location.path('/');
                                    }
                                }, function (error) {
                                    defer.reject(error);
                                    $rootScope.$broadcast('guest-event');
                                    $location.path('/');
                                });
                            return defer.promise;
                        } else {
                            if (currentUser.isAdmin) {
                                console.log('have user');
                                $rootScope.$broadcast('user-event', currentUser);
                                return currentUser;
                            } else {
                                $location.path('/');
                            }
                        }
                    }]
            }
        };

        return {
            $get: function () {
                return routeResolveChecks;
            }
        };
    };

    angular
        .module('issueTrackerSystem')
        .provider('routeResolvers', routeResolversProvider);
}());