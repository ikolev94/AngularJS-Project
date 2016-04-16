(function () {
    "use strict";

    angular.module('issueTrackerSystem.directives.userAccess', [])
        .directive('userAccess', [function () {
            return {
                restrict: 'A',
                link: function () {
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
                }
            }
        }]);
}());