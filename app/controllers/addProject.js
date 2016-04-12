"use strict";
angular.module('addProjectController', [
        'services.issueService',
        'services.usersService',
        'services.projectService'])
    .controller('AddProjectCtrl', ['$scope', 'usersService', 'projectService', 'notification',
        function ($scope, usersService, projectService, notification) {

            $scope.labels = undefined;
            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

            usersService.getAllUsers()
                .then(function (allUsers) {
                    $scope.users = allUsers;
                });

            $scope.addProject = function (projectToAdd) {
                projectToAdd.Priorities = [];
                projectToAdd.inputPriorities.split(/[\s+|,]+/).forEach(function (p) {
                    projectToAdd.Priorities.push({Name: p});
                });
                projectService.addProject(projectToAdd)
                    .then(function (respond) {
                        notification.success('New Project added');
                    }, function (error) {
                        console.log(error);
                    })
            };

        }]);