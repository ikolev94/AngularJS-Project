'use strict';

angular.module('issueTrackerSystem.editIssueController', [
        'services.projectService'])

    .controller('EditIssueCtrl',
        [
            '$scope',
            'issueService',
            'usersService',
            'projectService',
            'notification',
            '$routeParams',
            '$location',
            function ($scope, issueService, usersService, projectService, notification, $routeParams, $location) {

                $scope.updatePriorities = function () {
                    if ($scope.newIssue && $scope.newIssue.ProjectId) {
                        $scope.currentProject = $scope.projects.filter(function (p) {
                            return p.Id === $scope.newIssue.ProjectId;
                        })[0];
                    }
                };
                issueService.getIssueById($routeParams.id)
                    .then(function (issueData) {
                        issueData.DueDate = new Date(issueData.DueDate);
                        $scope.newIssue = issueData;
                        $scope.newIssue.ProjectId = issueData.Project.Id;
                        $scope.newIssue.AssigneeId = issueData.Assignee.Id;
                        // $scope.newIssue.PriorityId = issueData.Priority.Id;
                    });
                usersService.getAllUsers()
                    .then(function (allUsers) {
                        $scope.users = allUsers;
                    });
                projectService.getAllProjects()
                    .then(function (allProjects) {
                        $scope.projects = allProjects;
                    });

                $scope.updateIssue = function (newIssue) {
                    issueService.updateIssue($routeParams.id, newIssue)
                        .then(function (success) {
                            notification.success('Issue updated successfully');
                            $location.path('/dashboard');
                        }, function (error) {
                        })
                }
            }]);