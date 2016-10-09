(function () {
    'use strict';

    angular.module('data')
    .controller('CategoriesListController', CategoriesListController);

    CategoriesListController.$inject = ['items'];
    function CategoriesListController(items) {
        var list = this;
        list.items = items;
    };

})();