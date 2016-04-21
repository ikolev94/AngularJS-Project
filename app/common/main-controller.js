(function () {
    "use strict";

    angular.module('issueTrackerSystem')
        .controller('MainCtrl', [
            '$scope',
            'identity',
            'authentication',
            '$location',
            function ($scope, identity, authentication, $location) {

                $scope.logout = function () {
                    authentication.logout();
                    $scope.isAuthenticated = false;
                    $scope.isAdminAuthenticated = false;
                    $location.path('/');
                };

                $scope.setUserMenu = function () {
                    $scope.isAuthenticated = true;
                };

                $scope.setAdminMenu = function () {
                    $scope.isAdminAuthenticated = true;
                };

                identity.getCurrentUser()
                    .then(function (user) {
                        if (user.isAdmin)$scope.isAdminAuthenticated = true;
                        $scope.isAuthenticated = true;
                    });
            }]);
}());