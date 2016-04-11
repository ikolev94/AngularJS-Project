"use strict";

angular.module('issueTrackerSystem.directives.addIssue', [])
    .directive('addIssue', [function () {
        return {
            restrict: 'A',
            templateUrl: 'directives/add-issue/add-issue.html'
        }
    }]);