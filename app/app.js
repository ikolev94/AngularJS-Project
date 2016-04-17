(function () {
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
        .value('currentUser', {})
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/projects/', {
                    templateUrl: 'all-projects-page/all-projects-page.html',
                    controller: 'ProjectsCtrl',
                    resolve: {
                        user: ['currentUser', 'authentication', '$q', '$location', userAccessCheck]
                    }
                })
                .when('/', {
                    templateUrl: 'users/users.html',
                    controller: 'UserCtrl'
                })
                .when('/dashboard', {
                    templateUrl: 'dashboard-page/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: {
                        user: ['currentUser', 'authentication', '$q', '$location', userAccessCheck]
                    }
                })
                .when('/projects/:id', {
                    templateUrl: 'project-page/project-page.html',
                    controller: 'ProjectCtrl',
                    resolve: {
                        user: ['currentUser', 'authentication', '$q', '$location', userAccessCheck]
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'issue-page/issue-page.html',
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
                    templateUrl: 'edit-project-page/edit-project-page.html',
                    controller: 'EditProjectCtrl'
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'edit-issue-page/edit-issue-page.html',
                    controller: 'EditIssueCtrl'
                })
                .otherwise({redirectTo: '/dashboard'});
        }]);

    var userAccessCheck = function (currentUser, authentication, $q, $location) {
        if (!sessionStorage.headers) {
            $location.path('/');
            console.log('no sesion');
            return false;
        }
        if (sessionStorage.headers && !currentUser.Username) {
            var defer = $q.defer();
            authentication.getIdentity()
                .then(function (userInfo) {
                    currentUser.Id = userInfo.Id;
                    currentUser.isAdmin = userInfo.isAdmin;
                    currentUser.Username = userInfo.Username;
                    defer.resolve(userInfo);
                    console.log('get user');
                }, function (error) {
                    defer.reject(error);
                    console.log('fake headers');
                    $location.path('/');
                });
            return defer.promise;
        }
        console.log('have user');
        return currentUser;
    };    
}());