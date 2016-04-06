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
                console.log('Invalid username');
                return false;
            }
            if (!user.password) {
                console.log('Invalid password');
                return false;
            }
            return true;
        }

        function validateRegisterUser(user) {
            if (typeof user.username !== 'string') {
                console.log('Invalid username');
                return false;
            }
            if (typeof user.password !== 'string') {
                console.log('Invalid password');
                return false;
            }
            if (typeof user.confirmPassword !== 'string' || user.password !== user.confirmPassword) {
                console.log('Invalid confirm password');
                return false;
            }
            if (typeof user.name !== 'string') {
                console.log('Invalid name');
                return false;
            }
            if (typeof user.email !== 'string') {
                console.log('Invalid name');
                return false;
            }
            return true;
        }

        // $scope.registerUser.gender = '0';

        $scope.login = function (user) {
            if (validateLoginUser(user)) {
                authentication.login(user);
            }
        };
        $scope.register = function (user) {
            if (validateRegisterUser(user)) {
                authentication.register(user);
            }
        }
    }]);