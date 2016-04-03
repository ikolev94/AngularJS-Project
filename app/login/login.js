'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', function ($scope) {
        $scope.login = function (user) {
            console.log(user);
        }
    }]);