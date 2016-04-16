'use strict';

angular.module('issueTrackerSystem.project', ['services.projectService'])

    .controller('ProjectCtrl',
        [
            '$scope',
            '$routeParams',
            'projectService',
            function ($scope, $routeParams, projectService) {

                $scope.criteria = 'All';
                $scope.changeFilterCriteria = function (criteria) {
                    if (criteria === 'All') {
                        $scope.issues = $scope.allIssues;
                    }
                    if (criteria === 'Open') {
                        $scope.issues = $scope.allIssues.filter(function (issue) {
                            return issue.Status.Name === criteria;
                        })
                    }
                    if (criteria === 'Closed') {
                        $scope.issues = $scope.allIssues.filter(function (issue) {
                            return issue.Status.Name === criteria;
                        })
                    }
                    if (criteria === 'My issues') {
                        $scope.issues = $scope.allIssues.filter(function (issue) {
                            return issue.Assignee.Username === sessionStorage.userName;
                        })
                    }
                };

                // $scope.nameU = sessionStorage['userName'];
                projectService.getProjectById($routeParams.id)
                    .then(function (projectData) {
                        $scope.project = projectData;
                        projectService.getProjectIssues($routeParams.id)
                            .then(function (issuesData) {
                                $scope.allIssues = issuesData;
                                $scope.issues = issuesData;
                            })
                    }, function (error) {
                        console.log(error);
                    });

            }]);