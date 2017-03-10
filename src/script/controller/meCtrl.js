    'use strict';

    angular.module('app')
        .controller('meCtrl', ['$scope', '$http', 'cache', '$state', function($scope, $http, cache, $state) {
            if (cache.get('name')) {
                $scope.name = cache.get('name');
                $scope.image = cache.get('image');
            }
            $scope.logout = function() {
                cache.remove('id');
                cache.remove('name');
                cache.remove('remove');
                $state.go('main');
            }
        }]);