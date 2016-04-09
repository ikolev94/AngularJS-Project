'use strict';

angular.module('issueTrackerSystem.issue', ['services.issueService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/issue-page.html',
            controller: 'IssueCtrl',
            resolve: {
                isLogged: function ($location) {
                    if (!sessionStorage.access_token) {
                        //$location.path('/');
                    }
                }
            }
        });
    }])

    .controller('IssueCtrl',
        [
            '$scope',
            '$routeParams',
            'notification',
            'authentication',
            'issueService',
            function ($scope, $routeParams, notification, authentication, issueService) {

                $scope.inCommentMode = false;
                $scope.change = function () {
                    $scope.inCommentMode = !$scope.inCommentMode;
                };

                issueService.getIssueById($routeParams.id)
                    .then(function (issueData) {
                        $scope.issue = issueData;
                    }, function (error) {
                        console.log(error);
                    })

            }]);