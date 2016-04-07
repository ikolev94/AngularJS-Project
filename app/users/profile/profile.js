'use strict';

angular.module('issueTrackerSystem.users.profile', ['issueTrackerSystem.users.identity'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'users/profile/edit-profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl',
        [
            '$scope',
            'notification',
            'identity',
            '$location',
            function ($scope, notification, identity, $location) {

                function validateRegisterUser(user) {
                    if (typeof user.username !== 'string') {
                        notification.error('Invalid username');
                        return false;
                    }
                    if (typeof user.password !== 'string') {
                        notification.error('Invalid password');
                        return false;
                    }
                    if (typeof user.confirmPassword !== 'string' || user.password !== user.confirmPassword) {
                        notification.error('Invalid confirm password');
                        return false;
                    }
                    if (typeof user.name !== 'string') {
                        notification.error('Invalid name');
                        return false;
                    }
                    if (typeof user.email !== 'string') {
                        notification.error('Invalid email');
                        return false;
                    }
                    return true;
                }

                $scope.checkGender = function (genderToCheck) {
                    return $scope.user ? genderToCheck === $scope.user.gender : false;
                };

                identity.getCurrentUser()
                    .then(function (userData) {
                        $scope.user = userData;
                    })

            }]);