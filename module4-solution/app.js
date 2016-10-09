(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = undefined;
        ctrl.searchTerm = "";
        ctrl.searchItems = function () {
            if (ctrl.searchTerm.length > 0) {
                var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
                promise.then(function (result) {
                    result.length > 0 ? ctrl.found = result : ctrl.found = [];
                })
                .catch(function (error) {
                    ctrl.found = [];
                    console.log(error);
                })
            } else {
                ctrl.found = [];
            }
        };

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };
    };

    MenuSearchService.$inject = ['$http', 'ApiPath']
    function MenuSearchService($http, ApiPath) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: ApiPath
            }).then(function (result) {
                var foundItems = [];
                if (result.data["menu_items"] !== undefined) {
                    var i = 0;
                    var len = result.data["menu_items"].length;
                    for (i = 0; i < len; i++) {
                        if (result.data["menu_items"][i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            foundItems.push(result.data["menu_items"][i]);
                        }
                    };
                }
                return foundItems;
            });
        };
    };

})();