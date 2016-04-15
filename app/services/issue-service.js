"use strict";

angular.module('services.issueService', [])
    .factory('issueService', [
        '$http',
        '$q',
        function ($http, $q) {
            var baseUrl = 'http://softuni-issue-tracker.azurewebsites.net/issues/';

            function getMyIssuesSortByDescDueDate(page) {
                var defer = $q.defer();
                $http.get(baseUrl + 'me?pageSize=10&pageNumber=' + page + '&orderBy=DueDate desc',
                    {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function addIssue(issue) {
                var defer = $q.defer();
                $http.post(baseUrl, issue, {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond)
                    }, function (error) {
                        defer.reject(error.Message)
                    });
                return defer.promise;
            }

            function getIssueById(id) {
                var defer = $q.defer();
                $http.get(baseUrl + id, {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function getIssueComments(issueId) {
                var defer = $q.defer();
                $http.get(baseUrl + issueId + '/comments', {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function addIssuesComment(issueId, comment) {
                var defer = $q.defer();
                $http.post(baseUrl + issueId + '/comments', comment,
                    {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function updateIssue(issueId, issue) {
                var defer = $q.defer();
                $http.put(baseUrl + issueId, issue, {headers: {'Authorization': sessionStorage.headers}})
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