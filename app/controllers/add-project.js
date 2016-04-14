"use strict";
angular.module('addProjectController', [
        'services.issueService',
        'services.usersService',
        'services.projectService',
        'services.label'])
    .controller('AddProjectCtrl', ['$scope', 'usersService', 'projectService', 'notification', 'labelService',
        function ($scope, usersService, projectService, notification, labelService) {

            $scope.onItemChange = function (input) {
                if (input) {
                    var lastInput = input.split(/\s+|\,/)
                        .filter(function (el) {
                            return el;
                        })
                        .slice(-1)
                        .pop();
                    if (lastInput) {
                        labelService.getLabels(lastInput)
                            .then(function (data) {
                                $scope.items = data;
                            });
                    }
                }
            };

            usersService.getAllUsers()
                .then(function (allUsers) {
                    $scope.users = allUsers;
                });

            $scope.addProject = function (projectToAdd) {
                projectToAdd.Priorities = [];
                projectToAdd.inputPriorities.split(/[\s+|,]+/).forEach(function (p) {
                    projectToAdd.Priorities.push({Name: p});
                });
                projectToAdd.Labels = [];
                $scope.name.split(/[\s+|,]+/).forEach(function (p) {
                    projectToAdd.Labels.push({Name: p});
                });
                projectService.addProject(projectToAdd)
                    .then(function (respond) {
                        notification.success('New Project added');
                    }, function (error) {
                        console.log(error);
                    })
            };

        }]);