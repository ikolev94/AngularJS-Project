"use strict";

angular.module('issueTrackerSystem.directives.addProject', ['addProjectController'])
    .directive('addProject', [function () {
        return {
            restrict: 'A',
            templateUrl: 'templates/add-project.html',
            controller: 'AddProjectCtrl'
        }
    }]);