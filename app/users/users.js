'use strict';

angular.module('issueTrackerSystem.users', ['issueTrackerSystem.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'users/users.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl',
        [
            '$scope',
            'notification',
            'authentication',
            '$location',
            function ($scope, notification, authentication, $location) {
                var $loginFormLink = $('#login-form-link'),
                    $loginForm = $('#login-form'),
                    $registerFormLink = $('#register-form-link'),
                    $registerForm = $('#register-form');

                $loginFormLink.click(function (e) {
                    $loginForm.show('slow');
                    $registerForm.hide();
                    $registerFormLink.removeClass('active');
                    $(this).addClass('active');
                    e.preventDefault();
                });
                $registerFormLink.click(function (e) {
                    $registerForm.show('slow');
                    $loginForm.hide();
                    $loginFormLink.removeClass('active');
                    $(this).addClass('active');
                    $('option:contains(Other)').attr('selected', 'selected');
                    e.preventDefault();
                });

                function validateLoginUser(user) {
                    if (!user.username) {
                        notification.error('Invalid username');
                        return false;
                    }
                    if (!user.password) {
                        notification.error('Invalid password');
                        return false;
                    }
                    return true;
                }

                function validateRegisterUser(user) {
                    if (typeof user.username !== 'string') {
                        notification.error('Invalid username');
                        return false;
                    }
                    if (typeof user.password !== 'string') {
                        notification.error('Invalid password');
                        return false;
                    }
                    if (typeof user.confirmPassword !== 'string' || user.password !== user.confirmPassword) {
                        notification.error('Invalid confirm password');
                        return false;
                    }
                    if (typeof user.name !== 'string') {
                        notification.error('Invalid name');
                        return false;
                    }
                    if (typeof user.email !== 'string') {
                        notification.error('Invalid email');
                        return false;
                    }
                    return true;
                }

                $scope.genders = {'Other': 0, 'Male': 1, 'Female': 2};

                $scope.login = function (user) {
                    if (validateLoginUser(user)) {
                        authentication.login(user)
                            .then(function (userData) {
                                notification.success('Welcome ' + userData.userName);
                                sessionStorage['access_token'] = userData.access_token;
                                $location.path('/dashboard');
                            }, function (errorMsg) {
                                notification.error(errorMsg);
                            });
                    }
                };
                $scope.register = function (user) {
                    if (validateRegisterUser(user)) {
                        authentication.register(user)
                            .then(function (userData) {
                                notification.success('Welcome ' + userData.userName);
                                sessionStorage['access_token'] = userData.access_token;
                                $location.path('/dashboard');
                            }, function (errorMsg) {
                                notification.error(errorMsg);
                            });
                    }
                };
            }]);