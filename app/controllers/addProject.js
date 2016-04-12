"use strict";
angular.module('addProjectController', [
        'services.issueService',
        'services.usersService',
        'services.projectService'])
    .controller('AddProjectCtrl', ['$scope', 'issueService', 'usersService', 'projectService',
        function ($scope, issueService, usersService, projectService) {

            $scope.labels = undefined;
            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        }]);