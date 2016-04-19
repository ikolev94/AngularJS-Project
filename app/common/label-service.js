(function () {
    "use strict";

    angular.module('services.label', [])
        .factory('labelService', ['$http', 'BASE_URL', function ($http, BASE_URL) {

            function unique(array) {
                var map = {}, i, length = array.length, result = [];
                for (i = 0; i < length; i += 1) {
                    map[array[i]] = array[i];
                }
                Object.keys(map).forEach(function (key) {
                    result.push(map[key])
                });
                return result;
            }

            return {
                getLabels: function (input) {
                    return $http.get(BASE_URL + 'labels/?filter=' + input,
                        {headers: {'Authorization': sessionStorage.headers}})
                        .then(function (resp) {
                            return resp.data;
                        });
                },
                labelsToString: function (projectData) {
                    return projectData.Labels.map(function (p) {
                        return p.Name;
                    }).join(', ');
                },
                stringToLabels: function (labelsString) {
                    var result = [],
                        labelsCollection = labelsString.trim().split(/[\s+|,]+/);
                    unique(labelsCollection).forEach(function (p) {
                        result.push({Name: p});
                    });

                    return result;
                }
            };
        }]);
}());