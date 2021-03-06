(function () {
    'use strict';

    angular.module('issueTrackerSystem', [
            'ngRoute',
            'ngCookies',
            'angular-loading-bar',
            'bw.paging',
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
        .config(['$routeProvider', 'routeResolversProvider', function ($routeProvider, routeResolversProvider) {

            var routeResolveChecks = routeResolversProvider.$get();

            $routeProvider
                .when('/projects', {
                    templateUrl: 'all-projects-page/all-projects-page.html',
                    controller: 'ProjectsCtrl',
                    resolve: routeResolveChecks.allProjects
                })
                .when('/', {
                    templateUrl: 'users/users.html',
                    controller: 'UserCtrl'
                })
                .when('/dashboard', {
                    templateUrl: 'dashboard-page/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: routeResolveChecks.userAuthentication
                })
                .when('/projects/:id', {
                    templateUrl: 'project-page/project-page.html',
                    controller: 'ProjectCtrl',
                    resolve: routeResolveChecks.userAuthentication
                })
                .when('/issues/:id', {
                    templateUrl: 'issue-page/issue-page.html',
                    controller: 'IssueCtrl',
                    resolve: routeResolveChecks.userAuthentication
                })
                .when('/profile', {
                    templateUrl: 'profile/edit-profile.html',
                    controller: 'ProfileCtrl',
                    resolve: routeResolveChecks.userAuthentication
                })
                .when('/profile/password', {
                    templateUrl: 'profile/edit-password.html',
                    controller: 'PasswordCtrl',
                    resolve: routeResolveChecks.userAuthentication
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'edit-project-page/edit-project-page.html',
                    controller: 'EditProjectCtrl',
                    resolve: routeResolveChecks.editProject
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'edit-issue-page/edit-issue-page.html',
                    controller: 'EditIssueCtrl',
                    resolve: routeResolveChecks.editIssue
                })
                .when('/makeAdmin', {
                    templateUrl: 'make-admin-page/make-admin.html',
                    controller: 'MakeAdminCtrl',
                    resolve: routeResolveChecks.adminAuthentication
                })
                .when('/logout', {
                    controller: 'UserCtrl',
                    redirectTo: '/'
                })
                .otherwise({redirectTo: '/dashboard'});
        }])
        .run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
                if (rejection == 'Unauthorized Access') {
                    $location.path('/');
                }
            });

            authentication.refreshCookie();
        }]);

}());