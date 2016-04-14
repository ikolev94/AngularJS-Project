'use strict';

angular.module('issueTrackerSystem.projectsController', [
        'services.projectService'])

    .controller('ProjectsCtrl',
        [
            '$scope',
            'projectService',
            function ($scope, projectService) {

                $scope.checkCurrentUsername = function (name) {
                    return sessionStorage.userName === name;
                };

                projectService.getAllProjects()
                    .then(function (projectsData) {
                        $scope.projects = projectsData;
                    }, function (error) {
                        console.log(error);
                    });

            }]);