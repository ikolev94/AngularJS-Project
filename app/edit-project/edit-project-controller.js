'use strict';

angular.module('issueTrackerSystem.editProjectController', [
        'services.projectService',
        'services.issueService',
        'services.usersService'])
    
    .controller('EditProjectCtrl',
        [
            '$scope',
            '$routeParams',
            'usersService',
            'issueService',
            'projectService',
            function ($scope, $routeParams, usersService, issueService, projectService) {
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

                $scope.getUsers = function () {
                    if (!$scope.users) {
                        usersService.getAllUsers()
                            .then(function (allUsers) {
                                $scope.users = allUsers;
                            })
                    }
                };

                $scope.getProjects = function () {
                    if (!$scope.projects) {
                        projectService.getAllProjects()
                            .then(function (allProjects) {
                                $scope.projects = allProjects;
                            })
                    }
                };

                $scope.addIssue = function (newIssue) {
                    issueService.addIssue(newIssue)
                        .then(function (success) {
                            $scope.issues.push(success);
                        }, function (error) {
                            console.log(error);
                        })
                }

            }]);