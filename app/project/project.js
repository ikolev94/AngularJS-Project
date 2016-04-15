'use strict';

angular.module('issueTrackerSystem.project', ['services.projectService'])

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
                        // $scope.project = [projectData];
                        projectService.getProjectIssues($routeParams.id)
                            .then(function (issuesData) {
                                $scope.issues = issuesData;
                            })
                    }, function (error) {
                        console.log(error);
                    });

            }]);