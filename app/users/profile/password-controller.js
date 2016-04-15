'use strict';

angular.module('issueTrackerSystem.profile.password', [])
    .controller('PasswordCtrl',
        [
            '$scope',
            'notification',
            '$location',
            'usersService',
            function ($scope, notification, $location, usersService) {

                function validatePassword(passwordData) {
                    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                        notification.error('Fill all blank fields');
                        return false;
                    }
                    if (passwordData.confirmPassword !== passwordData.newPassword) {
                        notification.error('Passwords do not match.');
                        return false;
                    }
                    return true;
                }

                $scope.changePassword = function (passwordData) {
                    if (validatePassword(passwordData)) {
                        usersService.changePassword(passwordData)
                            .then(function (success) {
                                notification.success('Change Password Success');
                                $location.path('/dashboard');
                            },function (error) {
                                notification.error(error)
                            })
                    }
                }

            }]);