 'use strict';

 angular.module('app')
     .directive('appPositionClass', [function() {
         return {
             restrict: 'A',
             replace: true,
             templateUrl: 'view/template/positionClass.html'
         };
     }]);