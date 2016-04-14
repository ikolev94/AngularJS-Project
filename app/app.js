'use strict';

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
        'issueTrackerSystem.directives.addIssue',
        'issueTrackerSystem.projectsController',
        'issueTrackerSystem.editIssueController',
        'issueTrackerSystem.editProjectController'])
    .constant("BASE_URL", 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/', {
                templateUrl: 'projects/all-projects-page.html',
                controller: 'ProjectsCtrl',
                resolve: {
                    isLogged: function ($location) {
                        if (!sessionStorage.access_token) {
                            //$location.path('/');
                        }
                    }
                }
            })
            .when('/projects/:id/edit', {
                templateUrl: 'edit-project/edit-project-page.html',
                controller: 'EditProjectCtrl'
            })
            .when('/issues/:id/edit', {
                templateUrl: 'edit-issue/edit-issue-page.html',
                controller: 'EditIssueCtrl'
            })
            .otherwise({redirectTo: '/dashboard'});
    }]);
