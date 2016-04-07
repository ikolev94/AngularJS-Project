'use strict';

angular.module('users', ['ngRoute', 'issueTrackerSystem.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'users/users.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$scope', 'authentication', function ($scope, authentication) {

        function validateLoginUser(user) {
            if (!user.username) {
                // notie.alert(3, 'Invalid username', 1.5);
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

        // $scope.registerUser.gender = '0';

        $scope.login = function (user) {
            if (validateLoginUser(user)) {
                authentication.login(user)
                    .then(function (userData) {
                        notification.success('Welcome ' + userData.userName);
                        sessionStorage['access_token'] = userData.access_token;
                    }, function (errorMsg) {
                        notification.error(errorMsg);
                    })
            }
        };
        $scope.register = function (user) {
            if (validateRegisterUser(user)) {
                authentication.register(user)
                    .then(function (userData) {
                        notification.success('Welcome ' + userData.userName);
                        sessionStorage['access_token'] = userData.access_token;
                    }, function (errorMsg) {
                        notification.error(errorMsg);
                    })
            }
        }
    }]);