'use strict';

angular.module('issueTrackerSystem.editProjectController', [
        'services.projectService',
        'services.projectService',
        'services.label'])

    .controller('EditProjectCtrl',
        [
            '$scope',
            '$routeParams',
            '$location',
            'usersService',
            'projectService',
            'notification',
            'labelService',
            function ($scope, $routeParams, $location, usersService, projectService, notification, labelService) {
                $scope.issueFilter = sessionStorage['userName'];
                $scope.nameU = sessionStorage['userName'];
                projectService.getProjectById($routeParams.id)
                    .then(function (projectData) {
                        $scope.newProject = projectData;
                        $scope.inputLabels = labelService.labelsToString(projectData);
                        $scope.newProject.Priorities = $scope.newProject.Priorities.map(function (el) {
                            return el.Name
                        }).join(', ');
                    }, function (error) {
                        console.log(error);
                    });

                usersService.getAllUsers()
                    .then(function (allUsers) {
                        $scope.users = allUsers;
                    });

                $scope.updateProject = function (newProject) {
                    newProject.Labels = labelService.stringToLabels($scope.inputLabels);
                    var priorities = [];
                    newProject.Priorities.split(/[\s+|,]+/).forEach(function (p) {
                        priorities.push({Name: p});
                    });
                    newProject.Priorities = priorities;
                    projectService.updateProject($routeParams.id, newProject)
                        .then(function (success) {
                            notification.success('Project updated successfully');
                            $location.path('/dashboard');
                        }, function (error) {
                            $location.path('/dashboard');
                            console.log(error);
                        })
                }

            }]);