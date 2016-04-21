(function () {
    "use strict";

    angular.module('services.projectService', [])
        .factory('projectService', [
            '$http',
            '$q',
            function ($http, $q) {
                var baseUrl = 'http://softuni-issue-tracker.azurewebsites.net/projects/';

                function getProjectIssues(projectId) {
                    var defer = $q.defer();
                    $http.get(baseUrl + projectId + '/issues')
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                function getProjectById(id) {
                    var defer = $q.defer();
                    $http.get(baseUrl + id)
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                function getAllProjects() {
                    var defer = $q.defer();
                    $http.get(baseUrl)
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                function getUserProjects(pageNumber, name) {
                    var defer = $q.defer();
                    $http.get(baseUrl + '?pageSize=10&pageNumber=' + pageNumber + '&filter=Lead.Username=="' + name + '"')
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                function addProject(project) {
                    var defer = $q.defer();
                    $http.post(baseUrl, project)
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                function updateProject(id, project) {
                    var defer = $q.defer();
                    $http.put(baseUrl + id, project)
                        .then(function (respond) {
                            defer.resolve(respond.data);
                        }, function (error) {
                            defer.reject(error.data.message)
                        });
                    return defer.promise;
                }

                return {
                    getProjectById: getProjectById,
                    getProjectIssues: getProjectIssues,
                    getAllProjects: getAllProjects,
                    addProject: addProject,
                    updateProject: updateProject,
                    getUserProjects: getUserProjects
                };
            }]);
}());