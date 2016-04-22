(function () {
    "use strict";
    angular.module('issueTrackerSystem')
        .controller('MakeAdminCtrl', ['$scope', 'usersService', 'notification', '$location',
            function ($scope, usersService, notification, $location) {
                usersService.getAllUsers()
                    .then(function (users) {
                        $scope.allUsers = users;
                    });

                $scope.makeAdmin = function (user) {
                    usersService.makeAdmin(user)
                        .then(function () {
                            $location.path('/dashboard')
                        }, function (error) {
                            notification.error(error);
                        })
                }
            }])
}());