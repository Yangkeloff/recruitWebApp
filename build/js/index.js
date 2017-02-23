'use strict';

angular
    .module('app', ['ui.router']);
document.getElementsByTagName('html')[0].style.fontSize = window.screen.width / 10 + 'px';
'use strict';

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'view/main.html',
                    controller: 'mainCtrl'
                });
            $urlRouterProvider.otherwise('main');
        }
    ]);
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$scope', function() {
            $scope.abc = 1;
        }]);
'use strict';
angular.module('app').directive('appFoot', [function() {
    return {
        restrict: 'A',
        replac: true,
        templateUrl: 'view/template/foot.html'
    }
}]);
 'use strict';

 angular.module('app')
     .directive('appHead', [function() {
         //html中不识别大小写，'-'表示字母大写，所以在html标签中的'app-head'在此写为'appHead'
         return {
             restrict: 'A', //appHead在标签内是属性，所以以attribute调用指令
             replace: true, //替换父元素
             templateUrl: 'view/template/head.html'
         };
     }]);
'use strict';
angular.module('app')
    .directive('appPositionList', [function() {
        return {
            restrict: 'A',
            replace: 'true',
            templateUrl: 'view/template/positionList.html'
        };
    }]);