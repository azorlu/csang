(function () {
    'use strict';

    angular.module('data')
    .component('categoriesList', {
    templateUrl: 'src/categoriesList.template.html',
    bindings: {
        items: '<'
    }
    });

})();