'use strict';

angular.module('login', ['ngRoute', 'issueTrackerSystem.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'users/users.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$scope', 'authentication', function ($scope, authentication) {
        $scope.login = function (user) {
            authentication.login(user);
        };
        $scope.register = function (user) {
            authentication.register(user);
        }
    }]);