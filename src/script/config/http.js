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