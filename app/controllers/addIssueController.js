"use strict";
angular.module('addIssueController', [
        'services.issueService',
        'services.usersService',
        'services.projectService'])
    .controller('AddIssueCtrl', ['$scope', 'issueService', 'usersService', 'projectService',
        function ($scope, issueService, usersService, projectService) {

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