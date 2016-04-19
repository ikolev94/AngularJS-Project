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
                    resolve: routeResolveChecks.admin
                })
                .when('/', {
                    templateUrl: 'users/users.html',
                    controller: 'UserCtrl'
                })
                .when('/dashboard', {
                    templateUrl: 'dashboard-page/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: routeResolveChecks.user
                })
                .when('/projects/:id', {
                    templateUrl: 'project-page/project-page.html',
                    controller: 'ProjectCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'issue-page/issue-page.html',
                    controller: 'IssueCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .when('/profile', {
                    templateUrl: 'profile/edit-profile.html',
                    controller: 'ProfileCtrl',
                    resolve: routeResolveChecks.user
                })
                .when('/profile/password', {
                    templateUrl: 'profile/edit-password.html',
                    controller: 'PasswordCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'edit-project-page/edit-project-page.html',
                    controller: 'EditProjectCtrl',
                    resolve: routeResolveChecks.user
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'edit-issue-page/edit-issue-page.html',
                    controller: 'EditIssueCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .when('/logout', {
                    controller: 'UserCtrl',
                    redirectTo: '/'
                })
                .otherwise({redirectTo: '/dashboard'});
        }])
        .run(function ($rootScope, $location) {
            $rootScope.$on('$routeChangeStart', function () {
                if (!sessionStorage.headers) {
                    $rootScope.$broadcast('guest-event');
                    $location.path('/');
                }
            });
        });

    var userAccessCheck = ['currentUser', 'authentication', '$q', '$location', '$rootScope',
        function (currentUser, authentication, $q, $location, $rootScope) {
            if (Object.keys(currentUser).length === 0) {
                var defer = $q.defer();
                authentication.getIdentity()
                    .then(function (userInfo) {
                        currentUser.Id = userInfo.Id;
                        currentUser.isAdmin = userInfo.isAdmin;
                        currentUser.Username = userInfo.Username;
                        defer.resolve(userInfo);
                        $rootScope.$broadcast('myEvent', currentUser);
                        console.log('get user');
                    }, function (error) {
                        defer.reject(error);
                        $rootScope.$broadcast('guest-event');
                        $location.path('/');
                    });
                return defer.promise;
            } else {
                console.log('have user');
                $rootScope.$broadcast('myEvent', currentUser);
                return currentUser;
            }
        }];
}());