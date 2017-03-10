    'use strict';

    angular.module('app')
        .controller('registerCtrl', ['$scope', '$http', '$interval', '$state', function($scope, $http, $interval, $state) {
            $scope.submit = function() {
                $http.post('data/regist.json', $scope.user).then(function(resp) {
                    console.log(resp.data);
                    $state.go('login');
                })
            }

            var count = 60;
            $scope.send = function() {
                $http.get('data/code.json')
                    .then(function(resp) {
                        var code = resp.data;
                        if (1 === code.state) {
                            var count = 60;
                            $scope.time = '60s';
                            var interval = $interval(function() {
                                if (count <= 0) {
                                    $interval.cancel(interval);
                                    $scope.time = '';
                                } else {
                                    count--;
                                    $scope.time = count + 's';
                                    console.log($scope.time);
                                }
                            }, 1000);
                        }
                    });
            }
        }]);