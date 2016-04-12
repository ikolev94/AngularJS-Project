'use strict';

angular.module('issueTrackerSystem.project', [
        'services.projectService'])

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
            'projectService',
            function ($scope, $routeParams, projectService) {
                $scope.issueFilter = sessionStorage['userName'];
                $scope.nameU = sessionStorage['userName'];
                projectService.getProjectById($routeParams.id)
                    .then(function (projectData) {
                        $scope.project = projectData;
                        // $scope.projects = [projectData];
                        projectService.getProjectIssues($routeParams.id)
                            .then(function (issuesData) {
                                $scope.issues = issuesData;
                            })
                    }, function (error) {
                        console.log(error);
                    });

            }]);