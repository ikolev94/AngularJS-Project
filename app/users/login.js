'use strict';

angular.module('login', ['ngRoute', 'issueTrackerSystem.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'users/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', 'authentication', function ($scope, authentication) {
        $scope.login = function (user) {
            authentication.login(user);
        };
        $scope.register = function (user) {
            authentication.register(user);
        }
    }]);