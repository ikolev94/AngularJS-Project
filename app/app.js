'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
        'ngRoute',
        'angular-loading-bar',
        'users'
    ])
    .constant("BASE_URL", 'http://softuni-social-network.azurewebsites.net/api/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
