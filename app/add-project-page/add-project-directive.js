(function () {
    "use strict";

    angular.module('issueTrackerSystem.directives.addProject', ['addProjectController'])
        .directive('addProject', [function () {
            return {
                restrict: 'A',
                templateUrl: 'add-project-page/add-project.html',
                controller: 'AddProjectCtrl'
            }
        }]);
}());