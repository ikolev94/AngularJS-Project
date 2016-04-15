"use strict";

angular.module('issueTrackerSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            var currentUser = {};
            var deferred = $q.defer();

            return {
                getUser: function () {
                    if (this.isAuthenticated()) {
                        return $q.resolve(currentUser);
                    }

                    return deferred.promise;
                },
                isAuthenticated: function () {
                    return Object.getOwnPropertyNames(currentUser).length !== 0;
                },
                setUser: function (user) {
                    currentUser = user;
                    deferred.resolve(user);
                },
                removeUser: function () {
                    currentUser = {};
                    deferred = $q.defer();
                }
            };

            // var deferred = $q.defer(),
            //     currentUser,
            // // accessToken = 'DA2i_EltWiSMJ2aPwlj6MlN1K4rpt70afdsKjALXRCCNY1IptGZ9r-h9IBkRGaOn2DMlsjpy_vwPj4rDPPJgWF0zfPocz4bBhET3uIl76GeFVI95AUyI3GaFlDcyYqQqvPBUw4fqzzotsjiH5hVn1GLgKxfa4qG4O16Vep1Jyrmj2Vz68EmtQN-GLxO083P2IQONqupr9i5MpIjOPqI3l33kRIvfBZR78cxqcwP9O2Ue07Rxtmv8aLRGWXvsatedq51yS00PJeawE1pDMR_NSDRs7SgsiD-ORcaVqT2ouRdk-_l7Q2b2EEt49kUVrAfk7LN6kT0vD3snEv-0e8mFk0iGK4r2USwH18iI8Tb5EZHPVqJbKjcxlovv7SH7AxgucCvUMGQHfAOzE8ZC_AbZ2kYeO2lTWWIeSngg3jdlmd7uxheIcAcbZNVmQO1Wm8A05E2CkKMmo6rLIym2UvQA3m8VoemcBr538fVIOdiW9jY';
            //     accessToken = sessionStorage.access_token;
            //
            // $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            //
            // if (sessionStorage.acsess_token) {
            //     $http.get(BASE_URL + 'users/me')
            //         .then(function (response) {
            //             currentUser = response.data;
            //             deferred.resolve(currentUser);
            //         });
            // }
            // return {
            //     getCurrentUser: function () {
            //         var deferred = $q.defer();
            //         $http.get(BASE_URL + 'users/me', {headers: {Authorization: 'Bearer ' + sessionStorage['access_token']}})
            //             .then(function (response) {
            //                 // currentUser = response.data;
            //                 deferred.resolve(response.data);
            //             });
            //         return deferred.promise;
            //
            //     },
            //     isAuthenticated: function () {
            //         return true;
            //     }
            // };
        }]);