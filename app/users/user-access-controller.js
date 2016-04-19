(function () {
    'use strict';

    angular.module('issueTrackerSystem.users', [
            'issueTrackerSystem.users.authentication',
            'issueTrackerSystem.users.identity'
        ])

        .controller('UserCtrl',
            [
                '$scope',
                'notification',
                'authentication',
                '$location',
                function ($scope, notification, authentication, $location) {

                    function validateLoginUser(user) {
                        if (!user.username) {
                            notification.error('Invalid username');
                            return false;
                        }
                        if (!user.password) {
                            notification.error('Invalid password');
                            return false;
                        }
                        return true;
                    }

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
                            notification.error('Passwords do not match.');
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

                    $scope.genders = {'Other': 0, 'Male': 1, 'Female': 2};

                    $scope.login = function (user) {
                        if (validateLoginUser(user)) {
                            authentication.login(user)
                                .then(function (userData) {
                                    notification.success('Welcome ' + userData.userName);
                                    $location.path('/dashboard');
                                }, function (errorMsg) {
                                    notification.error(errorMsg);
                                });
                        }
                    };
                    $scope.register = function (user) {
                        if (validateRegisterUser(user)) {
                            authentication.register(user)
                                .then(function (success) {
                                    user.username = user.email;
                                    $scope.login(user)
                                }, function (errorMsg) {
                                    notification.error(errorMsg);
                                });
                        }
                    };
                }]);    
}());