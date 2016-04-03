'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '#/'});
}]);
