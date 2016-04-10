'use strict';

angular.module('issueTrackerSystem.project', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project-page.html',
            controller: 'ProjectCtrl',
            resolve: {
                isLogged: function ($location) {
                    if (!sessionStorage.access_token) {
                        //$location.path('/');
                    }
                }
            }
        });
    }])

    .controller('ProjectCtrl',
        [
            '$scope',
            '$routeParams',
            'notification',
            'authentication',
            'issueService',
            function ($scope, $routeParams, notification, authentication, issueService) {
                

            }]);