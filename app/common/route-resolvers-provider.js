(function () {
    'use strict';

    var routeResolversProvider = function routeResolversProvider() {

        var routeResolveChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }],
            user: ['identity', '$q', '$location', '$rootScope',
                function (identity) {
                    return identity.getCurrentUser()
                }],
            admin: ['identity', '$q', '$location', '$rootScope',
                function (identity, $q) {
                    var defer = $q.defer();
                    identity.getCurrentUser()
                        .then(function (userData) {
                            if (userData.isAdmin) {
                                defer.resolve(userData)
                            } else {
                                defer.reject('Unauthorized Access')
                            }
                        });
                    return defer.promise;
                }]
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