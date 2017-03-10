'use strict';

angular
    .module('app', ['ui.router', 'ngCookies', 'validation']);
document.getElementsByTagName('html')[0].style.fontSize = window.screen.width / 10 + 'px';
'use strict'
angular.module('app')
    .value('dict', {})
    .run(['dict', '$http', function(dict, $http) {
        $http.get('data/city.json')
            .then(function(resp) {
                dict.city = resp.data;
            });
        $http.get('data/salary.json')
            .then(function(resp) {
                dict.salary = resp.data;
            });
        $http.get('data/scale.json')
            .then(function(resp) {
                dict.scale = resp.data;
            });
    }]); //定义全区变量dict并初始化
    'use strict';

    angular
        .module('app')
        .config(['$provide', function($provide) {
            $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q) {
                //$delegate代表了$http服务
                $delegate.post = function(url, data, config) {
                    //post请求有三个参数，url,data,config
                    var def = $q.defer();
                    $delegate.get(url).then(function(resp) {
                        def.resolve(resp);
                    }).catch(function(err) {
                        def.reject(err);
                    });
                    return {
                        then: function(cb) {
                            def.promise.then(cb);
                        },
                        error: function(cb) {
                            def.promise.then(null, cb);
                        }
                    }
                }
                return $delegate;
            }])
        }])
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
                .state('login', {
                    url: '/login',
                    templateUrl: 'view/login.html',
                    controller: 'loginCtrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'view/register.html',
                    controller: 'registerCtrl'
                })
                .state('me', {
                    url: '/me',
                    templateUrl: 'view/me.html',
                    controller: 'meCtrl'
                })
                .state('favorite', {
                    url: '/favorite',
                    templateUrl: 'view/favorite.html',
                    controller: 'favoriteCtrl'
                })
                .state('post', {
                    url: '/post',
                    templateUrl: 'view/post.html',
                    controller: 'postCtrl'
                })
            $urlRouterProvider.otherwise('main');
        }
    ]);
    'use strict';

    angular
        .module('app').config(['$validationProvider', function($validationProvider) {
            var expression = { //定义验证规则
                phone: /^1[\d]{10}$/,
                password: function(value) {
                    var str = value + '';
                    return str.length > 5;
                },
                required: function(value) {
                    return !!value;
                }
            };
            var defaultMsg = { //提示语
                phone: {
                    success: '',
                    error: '必须是11位手机号'
                },
                password: {
                    success: '',
                    error: '长度至少6位'
                },
                required: {
                    success: '',
                    error: '不能为空'
                }
            };
            $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
        }]);
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
        .controller('favoriteCtrl', ['$scope', '$http', function($scope, $http) {
            $http.get('/data/myFavorite.json')
                .then(function(resp) {
                    $scope.list = resp.data;
                });
        }]);
    'use strict';

    angular.module('app')
        .controller('loginCtrl', ['$scope', '$http', '$state', 'cache', function($scope, $http, $state, cache) {
            $scope.submit = function() {
                $http.post('data/login.json', $scope.user).then(function(resp) {
                    cache.put('id', resp.data.id);
                    cache.put('name', resp.data.name);
                    cache.put('image', resp.data.image);
                    $state.go('main');
                })
            }
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

    angular.module('app')
        .controller('meCtrl', ['$scope', '$http', 'cache', '$state', function($scope, $http, cache, $state) {
            if (cache.get('name')) {
                $scope.name = cache.get('name');
                $scope.image = cache.get('image');
            }
            $scope.logout = function() {
                cache.remove('id');
                cache.remove('name');
                cache.remove('remove');
                $state.go('main');
            }
        }]);
'use strict';

angular
    .module('app')
    .controller('positionCtrl', ['$q', '$http', '$state', '$scope', 'cache', '$log', function($q, $http, $state, $scope, cache, $log) {
        $scope.isLogin = !!cache.get('name');
        $scope.message = $scope.isLogin ? '投个简历' : '去登录';

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
                    if (resp.data.posted) {
                        $scope.message = '已投递';
                    }
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
        $scope.go = function() {
            if ($scope.message !== '已投递') {
                if ($scope.isLogin) {
                    $http.post('data/handle.json', {
                        id: $scope.position.id
                    }).then(function(resp) {
                        $log.info(resp.data);
                        $scope.message = '已投递';
                    })
                } else {
                    $state.go('login')
                }
            }

        }
    }]);
    'use strict';

    angular.module('app')
        .controller('postCtrl', ['$scope', '$http', function($scope, $http) {
            $scope.tabList = [{
                id: 'all',
                name: '全部'
            }, {
                id: 'pass',
                name: '面试邀请'
            }, {
                id: 'fail',
                name: '不合适'
            }];
            $http.get('data/myPost.json').then(function(resp) {
                $scope.positionList = resp.data;
            })
            $scope.filterObj = {

            };
            $scope.tClick = function(id, name) {
                switch (id) {
                    case 'all':
                        delete $scope.filterObj.state;
                        break;
                    case 'pass':
                        $scope.filterObj.state = '1';
                        break;
                    case 'fail':
                        $scope.filterObj.state = '-1';
                        break;
                    default:
                        break;
                }
            }
        }]);
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
'use strict';
angular
    .module('app')
    .controller('searchCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {
        $scope.search = function() {
            $scope.name = '';
            $http.get('data/positionList.json?name=' + $scope.name)
                .then(function(resp) {
                    $scope.positionList = resp.data;
                });
        };
        $scope.search();
        $scope.sheet = {};
        $scope.filterObj = {};
        $scope.tabList = [{
            id: 'city',
            name: '城市'
        }, {
            id: 'salary',
            name: '薪水'
        }, {
            id: 'scale',
            name: '公司规模'
        }];
        var tabId = '';
        $scope.tClick = function(id, name) {
            tabId = id;
            $scope.sheet.list = dict[id];
            $scope.sheet.visible = true;
        }
        $scope.sClick = function(id, name) {
            if (id) {
                angular.forEach($scope.tabList, function(item) {
                    if (item.id === tabId) {
                        item.name = name;
                    }
                });
                $scope.filterObj[tabId + 'Id'] = id;
            } else {
                delete $scope.filterObj[tabId + 'Id'];
                angular.forEach($scope.tabList, function(item) {
                    if (item.id === tabId) {
                        switch (item.id) {
                            case 'city':
                                item.name = '城市';
                                break;
                            case 'salary':
                                item.name = '薪水';
                                break;
                            case 'scale':
                                item.name = '公司规模';
                                break;
                            default:
                        }
                    }
                });
            }
        }
    }]);
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
     .directive('appHead', ['cache', function(cache) {
         //html中不识别大小写，'-'表示字母大写，所以在html标签中的'app-head'在此写为'appHead'
         return {
             restrict: 'A', //appHead在标签内是属性，所以以attribute调用指令
             replace: true, //替换父元素
             templateUrl: 'view/template/head.html',
             link: function($scope) {
                 $scope.name = cache.get('name') || '';
             }
         }
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
    .directive('appPositionInfo', ['$http', function($http) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/positionInfo.html',
            scope: {
                isActive: '=',
                isLogin: '=',
                pos: '='
            },
            link: function($scope) {
                $scope.$watch('pos', function(newVal) {
                    if (newVal) {
                        $scope.pos.select = $scope.pos.select || false;
                        $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                    }
                })
                $scope.favorite = function() {
                    $http.post('data/favorite.json', {
                        id: $scope.pos.id,
                        select: !$scope.pos.select
                    }).then(function(resp) {
                        $scope.pos.select = !$scope.pos.select;
                        $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                    })
                }
            }
        };
    }]);
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
'use strict';

angular
    .module('app')
    .directive('appSheet', [function() {
        return {
            restrict: 'A',
            replace: 'true',
            scope: {
                list: '=',
                visible: '=',
                select: '&'
            },
            templateUrl: 'view/template/sheet.html'
        }
    }]);
'use strict';

angular
    .module('app')
    .directive('appTab', [function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                list: '=',
                tabClick: '&'
            },
            templateUrl: 'view/template/tab.html',
            link: function($scope) {
                $scope.click = function(tab) {
                    $scope.selectId = tab.id;
                    $scope.tabClick(tab);
                }
            }
        }
    }])
'use strict';

angular
    .module('app')
    .filter('filterByObj', [function() {
        return function(list, obj) {
            // return function(数组,过滤的对象)
            var result = [];
            angular.forEach(list, function(item) {
                var isEqual = true;
                for (var e in obj) {
                    if (item[e] !== obj[e]) {
                        isEqual = false;
                    }
                }
                if (isEqual) {
                    result.push(item);
                }
            });
            return result;
        }
    }]);
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