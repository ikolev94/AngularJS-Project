(function () {
    'use strict';

    angular.module('issueTrackerSystem.project', ['services.projectService'])

        .controller('ProjectCtrl',
            [
                '$scope',
                '$routeParams',
                'projectService',
                'user',
                function ($scope, $routeParams, projectService, user) {

                    $scope.criteria = 'My issues';
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
                                return issue.Assignee.Username === user.Username;
                            })
                        }
                    };

                    projectService.getProjectById($routeParams.id)
                        .then(function (projectData) {
                            $scope.project = projectData;
                            $scope.userPermission = projectData.Lead.Username === user.Username || user.isAdmin;
                            projectService.getProjectIssues($routeParams.id)
                                .then(function (issuesData) {
                                    $scope.allIssues = issuesData;
                                    $scope.changeFilterCriteria('My issues');
                                })
                        }, function (error) {
                            console.log(error);
                        });

                }]);
}());