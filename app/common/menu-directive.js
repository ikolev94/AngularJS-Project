(function () {
    "use strict";

    angular.module('issueTrackerSystem')
        .directive('menu', [function () {
            return {
                restrict: 'A',
                link: function (scope) {
                    var isAdmin;
                    scope.$on('myEvent', function (e, data) {
                        $('.for-gust').hide();
                        if (data.isAdmin && !isAdmin) {
                            $('.for-admin').show();
                        } else {
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