'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
        'ngRoute',
        'angular-loading-bar',
        'bw.paging',
        'issueTrackerSystem.notification',
        'issueTrackerSystem.users',
        'issueTrackerSystem.users.profile',
        'issueTrackerSystem.dashboard',
        'issueTrackerSystem.issue',
        'issueTrackerSystem.project',
    ])
    .constant("BASE_URL", 'http://softuni-issue-tracker.azurewebsites.net/api/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);
