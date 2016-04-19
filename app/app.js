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
                .when('/projects', {
                    templateUrl: 'all-projects-page/all-projects-page.html',
                    controller: 'ProjectsCtrl',
                    resolve: {
                        user: userAccessCheck,
                        admin: ['currentUser', '$location', function (currentUser, $location) {
                            if (!currentUser.isAdmin) {
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
                    templateUrl: 'dashboard-page/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
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
                    resolve: {
                        user: userAccessCheck
                    }
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
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'edit-issue-page/edit-issue-page.html',
                    controller: 'EditIssueCtrl',
                    resolve: {
                        user: userAccessCheck
                    }
                })
                .otherwise({redirectTo: '/dashboard'});
        }])
        .run(function ($rootScope, $location) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (!sessionStorage.headers) {
                    $location.path('/');
                }
            });
        });

    var userAccessCheck = ['currentUser', 'authentication', '$q', '$location',
        function (currentUser, authentication, $q, $location) {
            if (Object.keys(currentUser).length === 0) {
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
            } else {
                console.log('have user');
                return currentUser;
            }
        }];
}());