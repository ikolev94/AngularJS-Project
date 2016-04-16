'use strict';

angular.module('issueTrackerSystem.issue', ['services.issueService'])

    .controller('IssueCtrl',
        [
            '$scope',
            '$routeParams',
            'notification',
            'authentication',
            'issueService',
            function ($scope, $routeParams, notification, authentication, issueService) {
                var issueId = $routeParams.id;

                $scope.inCommentMode = false;
                $scope.change = function () {
                    $scope.inCommentMode = !$scope.inCommentMode;
                };

                $scope.postComment = function (comment) {
                    issueService.addIssuesComment(issueId, comment)
                        .then(function (respond) {
                            $scope.newComment = {};
                            $scope.comments = respond;
                            notification.success('New comment added')
                        })
                };

                issueService.getIssueById(issueId)
                    .then(function (issueData) {
                        $scope.issue = issueData;
                        issueService.getIssueComments(issueId)
                            .then(function (commentsData) {
                                $scope.comments = commentsData;
                            })
                    }, function (error) {
                        console.log(error);
                    })

            }]);