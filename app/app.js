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
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user,
                        admin: routeResolveChecks.admin
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
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/projects/:id', {
                    templateUrl: 'project-page/project-page.html',
                    controller: 'ProjectCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'issue-page/issue-page.html',
                    controller: 'IssueCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/profile', {
                    templateUrl: 'profile/edit-profile.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/profile/password', {
                    templateUrl: 'profile/edit-password.html',
                    controller: 'PasswordCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'edit-project-page/edit-project-page.html',
                    controller: 'EditProjectCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'edit-issue-page/edit-issue-page.html',
                    controller: 'EditIssueCtrl',
                    resolve: {
                        authenticated: routeResolveChecks.authenticated,
                        user: routeResolveChecks.user
                    }
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