(function () {
    'use strict';

    angular.module('issueTrackerSystem.dashboard', ['services.issueService', 'issueTrackerSystem.directives.addProject'])

        .controller('DashboardCtrl', [
            '$scope',
            'authentication',
            'issueService',
            'user',
            'projectService',
            function ($scope, authentication, issueService, user, projectService) {
                var ISSUES_PER_PAGE = 10;

                $scope.currentPage = 1;
                $scope.currentProjectsPage = 1;

                $scope.isAdmin = user.isAdmin;

                function getMyIssues(page) {
                    issueService.getMyIssuesSortByDescDueDate(page || 1)
                        .then(function (response) {
                            $scope.totalItems = response.TotalPages * ISSUES_PER_PAGE;
                            $scope.issues = response.Issues;
                        })
                }

                function getMyProjects(page) {
                    projectService.getUserProjects(page || 1, user.Username)
                        .then(function (p) {
                            $scope.totalProjects = p.TotalPages * ISSUES_PER_PAGE;
                            $scope.projects = p.Projects;
                        });
                }

                $scope.pageChanged = function (page) {
                    getMyIssues(page);
                };

                $scope.projectsPageChanged = function (page) {
                    getMyProjects(page);
                };

                getMyProjects();
                getMyIssues();


            }]);
}());