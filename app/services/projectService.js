"use strict";

angular.module('services.projectService', [])
    .factory('projectService', [
        '$http',
        '$q',
        function ($http, $q) {
            var baseUrl = 'http://softuni-issue-tracker.azurewebsites.net/projects/';

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['access_token'];
            // $http.defaults.headers.common.Authorization = 'Bearer DA2i_EltWiSMJ2aPwlj6MlN1K4rpt70afdsKjALXRCCNY1IptGZ9r-h9IBkRGaOn2DMlsjpy_vwPj4rDPPJgWF0zfPocz4bBhET3uIl76GeFVI95AUyI3GaFlDcyYqQqvPBUw4fqzzotsjiH5hVn1GLgKxfa4qG4O16Vep1Jyrmj2Vz68EmtQN-GLxO083P2IQONqupr9i5MpIjOPqI3l33kRIvfBZR78cxqcwP9O2Ue07Rxtmv8aLRGWXvsatedq51yS00PJeawE1pDMR_NSDRs7SgsiD-ORcaVqT2ouRdk-_l7Q2b2EEt49kUVrAfk7LN6kT0vD3snEv-0e8mFk0iGK4r2USwH18iI8Tb5EZHPVqJbKjcxlovv7SH7AxgucCvUMGQHfAOzE8ZC_AbZ2kYeO2lTWWIeSngg3jdlmd7uxheIcAcbZNVmQO1Wm8A05E2CkKMmo6rLIym2UvQA3m8VoemcBr538fVIOdiW9jY';

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
                        console.log(respond);
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
                        console.log(respond);
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

            return {
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues,
                getAllProjects: getAllProjects,
                addProject: addProject
            };
        }]);