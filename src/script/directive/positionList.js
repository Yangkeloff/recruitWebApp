'use strict';
angular.module('app')
    .directive('appPositionList', ['cache', '$http', function(cache, $http) {
        return {
            restrict: 'A',
            replace: 'true',
            templateUrl: 'view/template/positionList.html',
            scope: {
                data: '=', //暴露'data'接口,在视图文件中调用'data=映射文件',以便复用
                filterObj: '=',
                isFavorite: '='
            },
            link: function($scope) {
                $scope.name = cache.get('name') || '';
                $scope.select = function(item) {
                    $http.post('data/favorite.json', {
                        id: item.id,
                        select: !item.select
                    }).then(function(resp) {
                        item.select = !item.select;
                    })
                }
            }
        };
    }]);