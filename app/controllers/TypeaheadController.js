"use strict";
angular.module('TypeAheadController', ['services.typeAhead'])
    .controller('TypeAheadCtrl', ['$scope', 'typeAheadService',
        function ($scope, typeAheadService) {
            typeAheadService.get('states.json')
                .then(function (data) {
                    $scope.items = data;
                });
            $scope.name = "";
            $scope.onItemSelected = function () {
                console.log('selected=' + $scope.name);
            }
        }]);