"use strict";

angular.module('services.typeAhead', [])
    .factory('typeAheadService', ['$http', function ($http) {
        return {
            get: function (url) {
                return $http.get(url).then(function (resp) {
                    return resp.data;
                });
            }
        };
    }]);