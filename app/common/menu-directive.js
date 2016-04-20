(function () {
    "use strict";

    angular.module('issueTrackerSystem')
        .directive('menu', [function () {
            return {
                restrict: 'A',
                link: function (scope) {
                    
                    if (!sessionStorage.length) {
                        $('.for-admin, .for-user').hide();
                    }

                    scope.$on('user-event', function (e, data) {
                        $('.for-gust').hide();
                        if (data.isAdmin) {
                            $('.for-admin').show();
                        } else {
                            $('.for-admin').hide();
                            $('.for-user').show();
                        }
                    });
                    scope.$on('guest-event', function () {
                        $('.for-user, .for-admin').hide();
                        $('.for-gust').show();
                    });
                }
            }

        }])
}());