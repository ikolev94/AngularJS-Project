"use strict";

angular.module('issueTrackerSystem.directives.typeahead', [])
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
                            scope.model = currentModel ? currentModel + ' ' + selectedItem : selectedItem + ' ';
                            scope.model = scope.model.replace(/\s+/g, ' ');
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
                controller: 'TypeaheadCtrl',
                templateUrl: 'templates/typeAhead.html'
            }
        }])
    .controller('TypeaheadCtrl', ['$scope', 'labelService', function ($scope, labelService) {
        $scope.onItemChange = function (input) {
            if (input) {
                var lastInput = input.split(/\s+|\,/)
                    .filter(function (el) {
                        return el;
                    })
                    .slice(-1)
                    .pop();
                if (lastInput) {
                    labelService.getLabels(lastInput)
                        .then(function (data) {
                            $scope.items = data;
                        });
                }
            }
        };
    }]);