"use strict";

angular.module('issueTrackerSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            var deferred = $q.defer(),
                currentUser,
                accessToken = 'DA2i_EltWiSMJ2aPwlj6MlN1K4rpt70afdsKjALXRCCNY1IptGZ9r-h9IBkRGaOn2DMlsjpy_vwPj4rDPPJgWF0zfPocz4bBhET3uIl76GeFVI95AUyI3GaFlDcyYqQqvPBUw4fqzzotsjiH5hVn1GLgKxfa4qG4O16Vep1Jyrmj2Vz68EmtQN-GLxO083P2IQONqupr9i5MpIjOPqI3l33kRIvfBZR78cxqcwP9O2Ue07Rxtmv8aLRGWXvsatedq51yS00PJeawE1pDMR_NSDRs7SgsiD-ORcaVqT2ouRdk-_l7Q2b2EEt49kUVrAfk7LN6kT0vD3snEv-0e8mFk0iGK4r2USwH18iI8Tb5EZHPVqJbKjcxlovv7SH7AxgucCvUMGQHfAOzE8ZC_AbZ2kYeO2lTWWIeSngg3jdlmd7uxheIcAcbZNVmQO1Wm8A05E2CkKMmo6rLIym2UvQA3m8VoemcBr538fVIOdiW9jY';
                //accessToken = sessionStorage.access_token;

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

            $http.get(BASE_URL + 'account/userInfo')
                .then(function (response) {
                    currentUser = response.data;
                    deferred.resolve(currentUser);
                });

            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
        }]);