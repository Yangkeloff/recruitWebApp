'use strict';

angular
    .module('app', ['ui.router', 'ngCookies']);
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
                })
                .state('position', {
                    url: '/position/:id',
                    templateUrl: 'view/position.html',
                    controller: 'positionCtrl'
                })
                .state('company', {
                    url: '/company/:id',
                    templateUrl: 'view/company.html',
                    controller: 'companyCtrl'
                })
                .state('search', {
                    url: '/search',
                    templateUrl: 'view/search.html',
                    controller: 'searchCtrl'
                })
            $urlRouterProvider.otherwise('main');
        }
    ]);
'use strict';

angular
    .module('app')
    .controller('companyCtrl', ['$http', '$scope', '$state', function($http, $scope, $state) {
        $http.get('/data/company.json?id' + $state.params.id)
            .then(function(resp) {
                $scope.company = resp.data;
            });
    }]);
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
            $http.get('/data/positionList.json')
                .then(function(resp) {
                    console.log(resp);
                    $scope.list = resp.data;
                });
        }]);
'use strict';

angular
    .module('app')
    .controller('positionCtrl', ['$q', '$http', '$state', '$scope', 'cache', function($q, $http, $state, $scope, cache) {
        $scope.isLogin = false;

        function getPosition() {
            var def = $q.defer(); //声明延迟加载对象
            // $http[post'/'delete'/'put']('url',{
            //     数据对象
            // },{
            //     配置对象
            // })

            // $http({
            //     url: '',
            //     method: '',
            //     params: {},
            //     data: {}
            // })
            $http.get('/data/position.json?id=', {
                    params: {
                        id: $state.params.id
                    }
                }).then(function(resp) {
                    $scope.position = resp.data;
                    def.resolve(resp);
                })
                .catch(function(resp) {
                    def.reject(resp.data);
                });
            return def.promise;
        }

        function getCompany(id) {
            $http.get('/data/company.json?id=' + id)
                .then(function(resp) {
                    $scope.company = resp.data;
                });
        }
        getPosition().then(function(obj) {
            //当返回def.promise之后调用then函数,代表异步请求之后执行的函数。函数的参数是调用def.resolve时的参数
            getCompany(obj.companyId);
        });
    }]);
'use strict';
angular
    .module('app')
    .controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('data/positionList.json')
            .then(function(resp) {
                $scope.positionList = resp.data;
            })
    }])
 'use strict';

 angular.module('app')
     .directive('appCompany', [function() {
         return {
             restrict: 'A',
             replace: true,
             scope: {
                 com: '='
             },
             templateUrl: 'view/template/company.html'
         };
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
     .directive('appHeadBar', [function() {
         //html中不识别大小写，'-'表示字母大写，所以在html标签中的'app-head'在此写为'appHead'
         return {
             restrict: 'A', //appHead在标签内是属性，所以以attribute调用指令
             replace: true, //替换父元素
             templateUrl: 'view/template/headBar.html',
             scope: {
                 text: '='
             },
             link: function($scope) {
                 $scope.back = function() {
                     window.history.back();
                 };
             }
         };
     }]);
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
'use strict';

angular
    .module('app')
    .directive('appPositionInfo', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/positionInfo.html',
            scope: {
                isActive: '=',
                isLogin: '=',
                pos: '='
            },
            link: function($socpe) {
                $socpe.imagePath = $socpe.isActive ? 'image/star-active.png' : 'image/star.png';
            }
        };
    }]);
'use strict';
angular.module('app')
    .directive('appPositionList', [function() {
        return {
            restrict: 'A',
            replace: 'true',
            templateUrl: 'view/template/positionList.html',
            scope: {
                data: '=' //暴露'data'接口,在视图文件中调用'data=映射文件',以便复用
            }
        };
    }]);
'use strict';

angular
    .module('app')
    .directive('appTab', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/tab.html'
        }
    }])
'use strict';
angular
    .module('app')
    // .service('cache', ['$cookies', function($cookies) {
    //     this.put = function(key, value) {
    //         $cookies.put(key, value);
    //     };
    //     this.get = function(key) {
    //         return $cookies.get(key);
    //     };
    //     this.remove = function(key) {
    //         $cookies.remove(key);
    //     };
    // }])
    .factory('cache', ['$cookies', function($cookies) {
        return {
            put: function(key, value) {
                $cookies.put(key, value);
            },
            get: function(key) {
                return $cookies.get(key);
            },
            remove: function(key) {
                return $cookies.remove(key);
            }
        };
    }])