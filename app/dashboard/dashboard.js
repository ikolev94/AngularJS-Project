'use strict';

angular.module('issueTrackerSystem.dashboard', ['services.issueService'])

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
            var page = 1;
            $scope.currentPage = page;
            $scope.pageSize = 10;

            $scope.changePage = function (a) {
                page = a;
                issueService.getMyIssues(a)
                    .then(function (response) {
                        $scope.total = response.TotalPages * 10;
                        $scope.issues = response.Issues;
                    })
            };

            issueService.getMyIssues(page)
                .then(function (response) {
                    $scope.total = response.TotalPages * 10;
                    $scope.issues = response.Issues;
                }, function (error) {
                    console.log(error);
                })

        }]);