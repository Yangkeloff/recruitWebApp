'use strict';

angular
    .module('app')
    .controller('positionCtrl', ['$scope', '$http', '$state', function($http, $state, $scope) {
        $scope.isLogin = false;
        $http.get('data/position.json?id=' + $state.params.id)
            .then(function(resp) {
                $scope.position = resp.data;
            });
    }]);