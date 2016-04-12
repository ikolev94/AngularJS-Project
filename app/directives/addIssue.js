"use strict";

angular.module('issueTrackerSystem.directives.addIssue', ['addIssueController'])
    .directive('addIssue', [function () {
        return {
            restrict: 'A',
            templateUrl: 'templates/add-issue.html',
            controller: 'AddIssueCtrl'
        }
    }]);