'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
        'ngRoute',
        'angular-loading-bar',
        'ui.bootstrap',
        'issueTrackerSystem.notification',
        'issueTrackerSystem.users',
        'issueTrackerSystem.users.profile',
        'issueTrackerSystem.dashboard',
        'issueTrackerSystem.issue',
        'issueTrackerSystem.project',
        'issueTrackerSystem.directives.addIssue'
    ])
    .constant("BASE_URL", 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);
