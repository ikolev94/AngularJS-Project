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
                $scope.currentPage2 = 1;

                $scope.isAdmin = user.isAdmin;

                function getMyIssues() {
                    issueService.getMyIssuesSortByDescDueDate($scope.currentPage)
                        .then(function (response) {
                            $scope.totalItems = response.TotalPages * ISSUES_PER_PAGE;
                            $scope.issues = response.Issues;
                        })
                }

                function getMyProjects() {
                    projectService.getUserProjects($scope.currentPage2, user.Username)
                        .then(function (p) {
                            $scope.totalItems2 = p.TotalPages * ISSUES_PER_PAGE;
                            $scope.projects = p.Projects;
                        });
                }

                $scope.pageChanged = function () {
                    getMyIssues();
                };

                $scope.pageChanged2 = function () {
                    getMyProjects();
                };

                getMyProjects();
                getMyIssues();


            }]);
}());