 'use strict';

 angular.module('app')
     .directive('appPositionClass', [function() {
         return {
             restrict: 'A',
             replace: true,
             scope: {
                 com: '='
             },
             templateUrl: 'view/template/positionClass.html',
             link: function($scope) {
                 $scope.showPositionList = function(index) {
                     $scope.positionList = $scope.com.positionClass[index].positionList;
                     $scope.isActive = index;
                 }
                 $scope.$watch('com', function(newVal, oldVal, scope) {
                     //$watch用于监听$scope属性，当属性发生变化时调用函数，
                     // 监控com,function(改变之后的值,改变之前的值,作用域)
                     if (newVal) {
                         $scope.showPositionList(0);
                     }
                 });
             }
         };
     }]);