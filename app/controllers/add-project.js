"use strict";
angular.module('addProjectController', [
        'services.issueService',
        'services.projectService',
        'services.label'])
    .controller('AddProjectCtrl', ['$scope', 'usersService', 'projectService', 'notification', 'labelService',
        function ($scope, usersService, projectService, notification, labelService) {

            usersService.getAllUsers()
                .then(function (allUsers) {
                    $scope.users = allUsers;
                });

            $scope.addProject = function (projectToAdd) {
                projectToAdd.Priorities = [];
                projectToAdd.inputPriorities.split(/[\s+|,]+/).forEach(function (p) {
                    projectToAdd.Priorities.push({Name: p});
                });
                projectToAdd.Labels = labelService.stringToLabels($scope.inputLabels);
                projectService.addProject(projectToAdd)
                    .then(function (respond) {
                        notification.success('New Project added');
                    }, function (error) {
                        console.log(error);
                    })
            };

        }]);