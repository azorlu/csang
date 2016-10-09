(function () {
    'use strict';

    angular.module('data')
    .controller('CategoryItemsController', CategoryItemsController);

    CategoryItemsController.$inject = ['items'];
    function CategoryItemsController(items) {
        var category = this;
        category.items = items.menu_items;
        category.name = items.category.name;
    };

})();