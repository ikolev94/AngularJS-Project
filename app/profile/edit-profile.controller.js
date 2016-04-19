'use strict';

angular.module('issueTrackerSystem.users.profile', ['issueTrackerSystem.users.identity'])
    .controller('ProfileCtrl',
        [
            '$scope',
            'notification',
            'user',
            function ($scope, notification, user) {

                function validateUserData(user) {
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
                
                $scope.user = user;

                $scope.editProfile = function (user) {
                    // if (validateUserData(user)) {
                    //
                    // }
                };

            }]);