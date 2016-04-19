(function () {
    "use strict";

    angular.module('issueTrackerSystem.notification', [])
        .factory('notification', [function () {

            function success(message) {
                notie.alert(1, message, 1);
            }

            function error(message) {
                notie.alert(3, message, 2);
            }

            return {
                success: success,
                error: error
            };
        }]);
}());