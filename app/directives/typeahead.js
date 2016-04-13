"use strict";

angular.module('issueTrackerSystem.directives.typeahead', ['TypeAheadController'])
    .directive('typeahead', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'AEC',
                scope: {
                    items: '=',
                    prompt: '@',
                    title: '@',
                    subtitle: '@',
                    model: '=',
                    onSelect: '&'
                },
                link: function (scope) {
                    scope.handleSelection = function (selectedItem) {
                        scope.model = selectedItem;
                        scope.current = 0;
                        scope.selected = true;
                        $timeout(function () {
                            scope.onSelect();
                        }, 200);
                    };
                    scope.current = 0;
                    scope.selected = true;
                    scope.isCurrent = function (index) {
                        return scope.current === index;
                    };
                    scope.setCurrent = function (index) {
                        scope.current = index;
                    };
                },
                controller: 'TypeAheadCtrl',
                templateUrl: 'templates/typeAhead.html'
            }
        }]);