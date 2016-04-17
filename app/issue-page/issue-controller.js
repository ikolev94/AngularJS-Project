'use strict';

angular.module('issueTrackerSystem.issue', ['services.issueService'])

    .controller('IssueCtrl',
        [
            '$scope',
            '$routeParams',
            'notification',
            'authentication',
            'issueService',
            'user',
            function ($scope, $routeParams, notification, authentication, issueService, user) {
                var issueId = $routeParams.id;

                $scope.inCommentMode = false;
                $scope.change = function () {
                    $scope.inCommentMode = !$scope.inCommentMode;
                };

                $scope.updateStatus = function (statusId, statusName) {
                    issueService.changeIssueStatus(issueId, statusId)
                        .then(function (newAvailableStatuses) {
                            $scope.issue.Status.Name = statusName;
                            $scope.issue.AvailableStatuses = newAvailableStatuses;
                        })
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
                        $scope.hasPermissionToAddComments = issueData.Author.Id === user.Id ||
                            issueData.Assignee.Id === user.Id;
                        issueService.getIssueComments(issueId)
                            .then(function (commentsData) {
                                $scope.comments = commentsData;
                            })
                    }, function (error) {
                        console.log(error);
                    })

            }]);