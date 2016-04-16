"use strict";

angular.module('issueTrackerSystem.directives.addIssue', ['addIssueController'])
    .directive('addIssue', [function () {
        return {
            restrict: 'A',
            templateUrl: 'add-issue-page/add-issue.html',
            controller: 'AddIssueCtrl'
        }
    }]);