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

                function validatePassword(passwordData) {
                    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confNewPassword) {
                        notification.error('Fill all blank fields');
                        return false;
                    }
                    if (passwordData.confNewPassword !== passwordData.newPassword) {
                        notification.error('Passwords do not match.')
                    }

                }

                $scope.checkGender = function (genderToCheck) {
                    return $scope.user ? genderToCheck === $scope.user.gender : false;
                };

                $scope.tab = 1;

                $scope.isSet = function (checkTab) {
                    return $scope.tab === checkTab;
                };

                $scope.setTab = function (activeTab) {
                    $scope.tab = activeTab;
                };

                identity.getCurrentUser()
                    .then(function (userData) {
                        $scope.user = userData;
                    });

                $scope.editProfile = function (user) {
                    if (validateUserData(user)) {
                        console.log(user);
                    }
                };

                $scope.changePassword = function (passwordData) {
                    if (validatePassword(passwordData)) {
                        console.log(passwordData);
                    }
                }

            }]);