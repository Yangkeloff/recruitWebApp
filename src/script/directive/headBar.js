 'use strict';

 angular.module('app')
     .directive('appHeadBar', [function() {
         //html中不识别大小写，'-'表示字母大写，所以在html标签中的'app-head'在此写为'appHead'
         return {
             restrict: 'A', //appHead在标签内是属性，所以以attribute调用指令
             replace: true, //替换父元素
             templateUrl: 'view/template/headBar.html',
             scope: {
                 text: '='
             },
             link: function(scope) {
                 scope.back = function() {
                     window.history.back();
                 }
             }
         };
     }]);