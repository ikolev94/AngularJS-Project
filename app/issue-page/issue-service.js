"use strict";

angular.module('services.issueService', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            var serviceUrl = BASE_URL + 'issues/';

            function getMyIssuesSortByDescDueDate(page) {
                var defer = $q.defer();
                $http.get(serviceUrl + 'me?pageSize=10&pageNumber=' + page + '&orderBy=DueDate desc',
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
                $http.post(serviceUrl, issue, {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data)
                    }, function (error) {
                        defer.reject(error.Message)
                    });
                return defer.promise;
            }

            function getIssueById(id) {
                var defer = $q.defer();
                $http.get(serviceUrl + id, {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function getIssueComments(issueId) {
                var defer = $q.defer();
                $http.get(serviceUrl + issueId + '/comments', {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function addIssuesComment(issueId, comment) {
                var defer = $q.defer();
                $http.post(serviceUrl + issueId + '/comments', comment,
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
                $http.put(serviceUrl + issueId, issue, {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (respond) {
                        defer.resolve(respond.data);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });
                return defer.promise;
            }

            function changeIssueStatus(issueId, newStatus) {
                var defer = $q.defer();
                var url = serviceUrl + issueId + '/changestatus?statusid=' + newStatus;
                $http.put(url, {}, {headers: {'Authorization': sessionStorage.headers}})
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
                updateIssue: updateIssue,
                changeIssueStatus: changeIssueStatus
            };
        }]);