(function () {
    'use strict';

    angular.module('issueTrackerSystem.dashboard', ['services.issueService', 'issueTrackerSystem.directives.addProject'])

        .controller('DashboardCtrl', [
            '$scope',
            'authentication',
            'issueService',
            'user',
            function ($scope, authentication, issueService, user) {
                var ISSUES_PER_PAGE = 10;

                $scope.currentPage = 1;

                $scope.isAdmin = user.isAdmin;

                function getMyIssues() {
                    issueService.getMyIssuesSortByDescDueDate($scope.currentPage)
                        .then(function (response) {
                            $scope.totalItems = response.TotalPages * ISSUES_PER_PAGE;
                            $scope.issues = response.Issues;
                        })
                }

                $scope.pageChanged = function () {
                    getMyIssues();
                };

                getMyIssues();

            }]);
}());