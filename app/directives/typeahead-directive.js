"use strict";

angular.module('issueTrackerSystem.directives.typeahead', ['addProjectController'])
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
                        if (scope.model) {
                            var currentModel = scope.model.match(/.+\s+/);
                            scope.model = currentModel ? currentModel + ', ' + selectedItem : selectedItem;
                        } else {
                            scope.model = selectedItem;
                        }
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
                controller: 'AddProjectCtrl',
                templateUrl: 'templates/typeAhead.html'
            }
        }]);