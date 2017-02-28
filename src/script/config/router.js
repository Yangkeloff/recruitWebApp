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