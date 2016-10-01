(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuy.purchase = function (itemIndex) {
            ShoppingListCheckOffService.purchase(itemIndex);
        };
    };

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    };

    function ShoppingListCheckOffService() {
        var service = this;
        var itemsToBuy = [
            { name: 'cookies', quantity: 5 },
            { name: 'crackers', quantity: 8 },
            { name: 'chips', quantity: 13 },
            { name: 'nuts and trail mixes', quantity: 21 },
            { name: 'pretzels', quantity: 34 },
            { name: 'granola bars', quantity: 55 } 
        ];
        var itemsAlreadyBought = [];

        service.getItemsToBuy = function () {
            return itemsToBuy;
        };

        service.getItemsAlreadyBought = function () {
            return itemsAlreadyBought;
        };

        service.purchase = function (itemIndex) {
            itemsAlreadyBought.push(itemsToBuy.splice(itemIndex, 1)[0]);
        };
    };


})();