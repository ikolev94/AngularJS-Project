(function () {
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
                'issueData',
                function ($scope, issueService, usersService, projectService, notification, $routeParams, $location, issueData) {

                    function setCurrentProject() {
                        $scope.currentProject = $scope.projects.filter(function (p) {
                            return p.Id === $scope.newIssue.ProjectId;
                        })[0];
                    }

                    $scope.updatePriorities = function () {
                        setCurrentProject();
                    };

                    $scope.newIssue = issueData;
                    $scope.newIssue.ProjectId = issueData.Project.Id;
                    $scope.newIssue.AssigneeId = issueData.Assignee.Id;
                    $scope.newIssue.PriorityId = issueData.Priority.Id;

                    usersService.getAllUsers()
                        .then(function (allUsers) {
                            $scope.users = allUsers;
                        });
                    projectService.getAllProjects()
                        .then(function (allProjects) {
                            $scope.projects = allProjects;
                            setCurrentProject();
                        });

                    $scope.updateIssue = function (newIssue) {
                        issueService.updateIssue($routeParams.id, newIssue)
                            .then(function () {
                                notification.success('Issue updated successfully');
                                $location.path('/dashboard');
                            }, function (error) {
                            })
                    }
                }]);
}());