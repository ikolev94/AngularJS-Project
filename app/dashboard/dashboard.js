'use strict';

angular.module('issueTrackerSystem.dashboard', ['services.issueService', 'issueTrackerSystem.directives.addProject'])

    .controller('DashboardCtrl', ['$scope', 'notification', 'authentication', 'issueService', 'identity',
        function ($scope, notification, authentication, issueService, identity) {
            var ISSUES_PER_PAGE = 10;

            $scope.currentPage = 1;

            // identity.getUser().then(function (u) {
            //    
            // });

            $scope.isAdmin = sessionStorage.isAdmin === 'true';

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