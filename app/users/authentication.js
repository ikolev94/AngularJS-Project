angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', ['$http', 'BAAS', function ($http, BAAS) {

        function register(user) {
            $http.post(BAAS.USERS_URL, user, {headers: BAAS.HEADERS})
        }

        function login(user) {
            $http.post(BAAS.USERS_URL+'login', user, {headers: BAAS.HEADERS})
                .success(function (respond) {
                    console.log(respond);
                })
        }

        return {
            register: register,
            login: login
        }
    }]);