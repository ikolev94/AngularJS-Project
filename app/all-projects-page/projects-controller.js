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
                'projectsData',
                function ($scope, projectService, currentUser, user, projectsData) {
                    $scope.checkCurrentUsername = function (name) {
                        return user.Username === name;
                    };

                    var ISSUES_PER_PAGE = 10;

                    $scope.pageChanged = function (page) {
                        var toSkip = ( (page || 1) - 1) * ISSUES_PER_PAGE;
                        $scope.projects = $scope.allProjects.slice(toSkip, toSkip + ISSUES_PER_PAGE)
                    };

                    $scope.allProjects = projectsData;
                    $scope.projects = $scope.allProjects.slice(0, 10);
                    $scope.totalItems = $scope.allProjects.length;

                }]);
}());