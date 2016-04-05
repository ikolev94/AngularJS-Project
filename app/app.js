'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'login'
    ])
    .constant('BAAS', {
        "BASE_URL": 'https://baas.kinvey.com/',
        "USERS_URL": 'https://baas.kinvey.com/user/kid_-yxycYqukW/',
        "APP_KEY": 'kid_-yxycYqukW',
        "HEADERS": {
            'Authorization': 'Basic a2lkXy15eHljWXF1a1c6YTQ2ZDViZWZmMzVhNDQyOGJkMDU5ZjJhNGIwMDdjMTQ=',
            'Content-Type': 'application/json'
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
