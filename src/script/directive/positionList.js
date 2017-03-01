'use strict';
angular.module('app')
    .directive('appPositionList', [function() {
        return {
            restrict: 'A',
            replace: 'true',
            templateUrl: 'view/template/positionList.html',
            scope: {
                data: '=', //暴露'data'接口,在视图文件中调用'data=映射文件',以便复用
                filterObj: '='
            }
        };
    }]);