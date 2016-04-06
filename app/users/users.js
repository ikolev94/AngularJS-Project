'use strict';

angular.module('login', ['ngRoute', 'issueTrackerSystem.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'users/users.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$scope', 'authentication', function ($scope, authentication) {

        function validateLoginUser(user) {
            if (!user.username) {
                notie.alert(3, 'Invalid username', 1.5);
                return false;
            }
            if (!user.password) {
                notie.alert(3, 'Invalid password', 1.5);
                return false;
            }
            return true;
        }

        function validateRegisterUser(user) {
            if (typeof user.username !== 'string') {
                notie.alert(3, 'Invalid username', 1.5);
                return false;
            }
            if (typeof user.password !== 'string') {
                notie.alert(3, 'Invalid password', 1.5);
                return false;
            }
            if (typeof user.confirmPassword !== 'string' || user.password !== user.confirmPassword) {
                notie.alert(3, 'Invalid confirm password', 1.5);
                return false;
            }
            if (typeof user.name !== 'string') {
                notie.alert(3, 'Invalid name', 1.5);
                return false;
            }
            if (typeof user.email !== 'string') {
                notie.alert(3, 'Invalid email', 1.5);
                return false;
            }
            return true;
        }

        // $scope.registerUser.gender = '0';

        $scope.login = function (user) {
            if (validateLoginUser(user)) {
                authentication.login(user)
                    .then(function (userData) {
                        notie.alert(1, 'Welcome ' + userData.userName, 1.5);
                        sessionStorage['access_token'] = userData.access_token;
                    }, function (error) {
                        notie.alert(3, error, 2);
                    })
            }
        };
        $scope.register = function (user) {
            if (validateRegisterUser(user)) {
                authentication.register(user)
                    .then(function (userData) {
                        notie.alert(1, 'Welcome ' + userData.userName, 1.5);
                        sessionStorage['access_token'] = userData.access_token;
                    }, function (error) {
                        notie.alert(3, error, 2);
                    })
            }
        }
    }]);