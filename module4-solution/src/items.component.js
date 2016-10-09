(function () {
    'use strict';

    angular.module('data')
    .component('itemsList', {
        templateUrl: 'src/itemsList.template.html',
        bindings: {
            items: '<'
        }
    });

})();