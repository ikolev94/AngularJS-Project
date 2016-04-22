(function () {
    'use strict';

    var routeResolversProvider = function routeResolversProvider() {

        var routeResolvers = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }],
            user: ['identity',
                function (identity) {
                    return identity.getCurrentUser()
                }],
            admin: ['identity', '$q',
                function (identity, $q) {
                    var defer = $q.defer();
                    identity.getCurrentUser()
                        .then(function (userData) {
                            if (userData.isAdmin) {
                                defer.resolve(userData)
                            } else {
                                defer.reject('Unauthorized Access')
                            }
                        });
                    return defer.promise;
                }],
            editIssue: ['identity', '$q', 'issueService', '$route', 'projectService',
                function (identity, $q, issueService, $route, projectService) {
                    var defer = $q.defer();

                    identity.getCurrentUser()
                        .then(function (userData) {
                            issueService.getIssueById($route.current.params.id)
                                .then(function (issueData) {
                                    projectService.getProjectById(issueData.Project.Id)
                                        .then(function (projectData) {
                                            if (projectData.Lead.Id === userData.Id || userData.isAdmin) {
                                                issueData.DueDate = new Date(issueData.DueDate);
                                                defer.resolve(issueData)
                                            } else {
                                                defer.reject('Unauthorized Access')
                                            }
                                        });
                                });
                        });

                    return defer.promise;
                }],
            editProject: ['identity', '$q', '$route', 'projectService',
                function (identity, $q, $route, projectService) {
                    var defer = $q.defer();

                    identity.getCurrentUser()
                        .then(function (userData) {
                            projectService.getProjectById($route.current.params.id)
                                .then(function (projectData) {
                                    if (projectData.Lead.Id === userData.Id || userData.isAdmin) {
                                        defer.resolve(projectData)
                                    } else {
                                        defer.reject('Unauthorized Access')
                                    }
                                });
                        });

                    return defer.promise;
                }],
            allProjects: ['projectService',
                function (projectService) {
                    return projectService.getAllProjects();
                }]
        };

        var routeResolveChecks = {
            editProject: {
                authenticated: routeResolvers.authenticated,
                user: routeResolvers.user,
                projectData: routeResolvers.editProject
            },
            editIssue: {
                authenticated: routeResolvers.authenticated,
                user: routeResolvers.user,
                issueData: routeResolvers.editIssue
            },
            allProjects: {
                authenticated: routeResolvers.authenticated,
                user: routeResolvers.user,
                admin: routeResolvers.admin,
                projectsData: routeResolvers.allProjects
            },
            userAuthentication: {
                authenticated: routeResolvers.authenticated,
                user: routeResolvers.user
            }
        };

        return {
            $get: function () {
                return routeResolveChecks;
            }
        };
    };

    angular
        .module('issueTrackerSystem')
        .provider('routeResolvers', routeResolversProvider);
}());