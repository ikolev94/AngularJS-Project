"use strict";

angular.module('services.issueService', [])
    .factory('issueService', [
        '$http',
        '$q',
        function ($http, $q) {
            var baseUrl = 'http://softuni-issue-tracker.azurewebsites.net/issues/';

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.access_token;
            // $http.defaults.headers.common.Authorization = 'Bearer DA2i_EltWiSMJ2aPwlj6MlN1K4rpt70afdsKjALXRCCNY1IptGZ9r-h9IBkRGaOn2DMlsjpy_vwPj4rDPPJgWF0zfPocz4bBhET3uIl76GeFVI95AUyI3GaFlDcyYqQqvPBUw4fqzzotsjiH5hVn1GLgKxfa4qG4O16Vep1Jyrmj2Vz68EmtQN-GLxO083P2IQONqupr9i5MpIjOPqI3l33kRIvfBZR78cxqcwP9O2Ue07Rxtmv8aLRGWXvsatedq51yS00PJeawE1pDMR_NSDRs7SgsiD-ORcaVqT2ouRdk-_l7Q2b2EEt49kUVrAfk7LN6kT0vD3snEv-0e8mFk0iGK4r2USwH18iI8Tb5EZHPVqJbKjcxlovv7SH7AxgucCvUMGQHfAOzE8ZC_AbZ2kYeO2lTWWIeSngg3jdlmd7uxheIcAcbZNVmQO1Wm8A05E2CkKMmo6rLIym2UvQA3m8VoemcBr538fVIOdiW9jY';

            function getMyIssuesSortByDescDueDate(page) {
                var defer = $q.defer();
                $http.get(baseUrl + 'me?pageSize=10&pageNumber=' + page+'&orderBy=DueDate desc')
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function addIssue(issue) {
                var defer = $q.defer();
                $http.post(baseUrl, issue)
                    .then(function (respond) {
                        defer.resolve(respond)
                    }, function (error) {
                        defer.reject(error.Message)
                    });
                return defer.promise;
            }

            function getIssueById(id) {
                var defer = $q.defer();
                $http.get(baseUrl + id)
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function getIssueComments(issueId) {
                var defer = $q.defer();
                $http.get(baseUrl + issueId + '/comments')
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function addIssuesComment(issueId, comment) {
                var defer = $q.defer();
                $http.post(baseUrl + issueId + '/comments', comment)
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function updateIssue(issueId, issue) {
                var defer = $q.defer();
                $http.put(baseUrl + issueId, issue)
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            return {
                getMyIssuesSortByDescDueDate: getMyIssuesSortByDescDueDate,
                getIssueById: getIssueById,
                getIssueComments: getIssueComments,
                addIssuesComment: addIssuesComment,
                addIssue: addIssue,
                updateIssue: updateIssue
            };
        }]);