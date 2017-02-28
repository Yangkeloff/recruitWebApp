'use strict';
angular
    .module('app')
    .controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('data/positionList.json')
            .then(function(resp) {
                $scope.positionList = resp.data;
            })
    }])