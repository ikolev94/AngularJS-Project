'use strict';

angular.module('issueTrackerSystem.dashboard', ['services.issueService','issueTrackerSystem.directives.addProject'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                isLogged: function ($location) {
                    if (!sessionStorage.access_token) {
                        //$location.path('/');
                    }
                }
            }
        });
    }])

    .controller('DashboardCtrl', ['$scope', 'notification', 'authentication', 'issueService',
        function ($scope, notification, authentication, issueService) {
            // var page = 1,
               var ISSUES_PER_PAGE = 10;
            // $scope.currentPage = page;
            // $scope.pageSize = 10;
            // $scope.totalItems = 64;
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