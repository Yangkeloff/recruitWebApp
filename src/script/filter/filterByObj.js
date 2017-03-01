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