'use strict';

angular.module('issueTrackerSystem', [
        'ngRoute',
        'ngCookies',
        'angular-loading-bar',
        'ui.bootstrap',
        'issueTrackerSystem.notification',
        'issueTrackerSystem.users',
        'issueTrackerSystem.users.profile',
        'issueTrackerSystem.profile.password',
        'issueTrackerSystem.dashboard',
        'issueTrackerSystem.issue',
        'issueTrackerSystem.project',
        'issueTrackerSystem.directives.addIssue',
        'issueTrackerSystem.directives.userAccess',
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
                    isLogged: ['$location', function ($location) {
                        if (!sessionStorage.userName) {
                            console.log('resolve');
                            $location.path('/');
                        }
                    }]
                }
            })
            .when('/', {
                templateUrl: 'users/users.html',
                controller: 'UserCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/projects/:id', {
                templateUrl: 'project/project-page.html',
                controller: 'ProjectCtrl'
            })
            .when('/issues/:id', {
                templateUrl: 'issues/issue-page.html',
                controller: 'IssueCtrl'
            })
            .when('/profile', {
                templateUrl: 'profile/edit-profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/profile/password', {
                templateUrl: 'profile/edit-password.html',
                controller: 'PasswordCtrl'
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
