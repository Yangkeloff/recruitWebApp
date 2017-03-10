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