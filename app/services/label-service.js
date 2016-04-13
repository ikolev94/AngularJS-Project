"use strict";

angular.module('services.label', [])
    .factory('labelService', ['$http', 'BASE_URL', function ($http, BASE_URL) {
        return {
            getLabels: function (input) {
                return $http.get(BASE_URL + 'labels/?filter=' + input)
                    .then(function (resp) {
                        return resp.data;
                    });
            }
        };
    }]);