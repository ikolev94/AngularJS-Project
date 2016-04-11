'use strict';

angular.module('issueTrackerSystem.project', ['services.projectService', 'services.issueService'])

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
            'projectService',
            function ($scope, $routeParams, notification, authentication, projectService) {

                $scope.inCommentMode = false;
                $scope.change = function () {
                    $scope.inCommentMode = !$scope.inCommentMode;
                };

                projectService.getProjectById($routeParams.id)
                    .then(function (projectData) {
                        $scope.project = projectData;
                        projectService.getProjectIssues($routeParams.id)
                            .then(function (issuesData) {
                                $scope.issues = issuesData;
                            })
                    }, function (error) {
                        console.log(error);
                    })

            }]);