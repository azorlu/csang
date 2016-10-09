(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/home.template.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'src/categories.template.html',
            controller: 'CategoriesListController as list',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('categories.items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/items.template.html',
            controller: 'CategoryItemsController as category',
            resolve: {
                items: ['$stateParams', 'MenuDataService',
                      function ($stateParams, MenuDataService) {
                          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                      }]
            }
        });
    };
})();