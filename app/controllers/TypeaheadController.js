"use strict";
angular.module('TypeAheadController', ['services.label'])
    .controller('TypeAheadCtrl', ['$scope', 'labelService',
        function ($scope, labelService) {
            $scope.name = "";
            $scope.onItemSelected = function () {
                console.log('selected=' + $scope.name);
            };
            $scope.onItemChange = function (input) {
                labelService.getLabels(input)
                    .then(function (data) {
                        $scope.items = data;
                    });
            }
        }]);