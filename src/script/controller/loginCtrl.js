    'use strict';

    angular.module('app')
        .controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
            $http.get('/data/positionList.json')
                .then(function(resp) {
                    console.log(resp);
                    $scope.list = resp.data;
                });
        }]);