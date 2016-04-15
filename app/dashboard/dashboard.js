'use strict';

angular.module('issueTrackerSystem.dashboard', ['services.issueService', 'issueTrackerSystem.directives.addProject'])

    .controller('DashboardCtrl', ['$scope', 'notification', 'authentication', 'issueService',
        function ($scope, notification, authentication, issueService) {
            var ISSUES_PER_PAGE = 10;

            $scope.currentPage = 1;

            $scope.pageChanged = function () {
                issueService.getMyIssues($scope.currentPage)
                    .then(function (response) {
                        $scope.totalItems = response.TotalPages * ISSUES_PER_PAGE;
                        $scope.issues = response.Issues;
                    })
            };

            issueService.getMyIssues($scope.currentPage)
                .then(function (response) {
                    $scope.totalItems = response.TotalPages * ISSUES_PER_PAGE;
                    $scope.issues = response.Issues;
                }, function (error) {
                    console.log(error);
                })

        }]);