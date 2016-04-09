'use strict';

angular.module('issueTrackerSystem.dashboard', ['issueTrackerSystem.dashboard.issue'])

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

            issueService.getMyIssues()
                .then(function (response) {
                    $scope.issues = response.Issues;
                    console.log(response);
                }, function (error) {
                    console.log(error);
                })

        }]);