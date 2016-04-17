(function () {
    'use strict';

    angular.module('issueTrackerSystem.projectsController', [
            'services.projectService'])

        .controller('ProjectsCtrl',
            [
                '$scope',
                'projectService',
                'currentUser',
                'user',
                function ($scope, projectService, currentUser, user) {
                    $scope.checkCurrentUsername = function (name) {
                        return user.Username === name;
                    };

                    var ISSUES_PER_PAGE = 10;

                    $scope.pageChanged = function () {
                        var toSkip = ($scope.currentPage - 1) * ISSUES_PER_PAGE;
                        $scope.projects = $scope.allProjects.slice(toSkip, toSkip + ISSUES_PER_PAGE)
                    };

                    projectService.getAllProjects()
                        .then(function (projectsData) {
                            $scope.allProjects = projectsData;
                            $scope.projects = $scope.allProjects.slice(0, 10);
                            $scope.totalItems = $scope.allProjects.length;
                        });

                }]);
}());