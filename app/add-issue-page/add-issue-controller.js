(function () {
    "use strict";
    angular.module('addIssueController', [
            'services.issueService',
            'services.usersService',
            'services.projectService',
            'issueTrackerSystem.directives.typeahead'])
        .controller('AddIssueCtrl',
            [
                '$scope',
                'issueService',
                'usersService',
                'projectService',
                'notification',
                function ($scope, issueService, usersService, projectService, notification) {


                    $scope.updatePriorities = function () {
                        if ($scope.newIssue && $scope.newIssue.ProjectId) {
                            $scope.currentProject = $scope.projects.filter(function (p) {
                                return p.Id === $scope.newIssue.ProjectId;
                            })[0];
                        }
                    };

                    $scope.getUsers = function () {
                        if (!$scope.users) {
                            usersService.getAllUsers()
                                .then(function (allUsers) {
                                    $scope.users = allUsers;
                                })
                        }
                    };

                    $scope.getProjects = function () {
                        if (!$scope.projects) {
                            projectService.getAllProjects()
                                .then(function (allProjects) {
                                    $scope.projects = allProjects;
                                })
                        }
                    };

                    $scope.addIssue = function (newIssue) {
                        issueService.addIssue(newIssue)
                            .then(function (success) {
                                $scope.allIssues.push(success);
                                notification.success('New issue added')
                            }, function (error) {
                                console.log(error);
                            })
                    }
                }]);
}());