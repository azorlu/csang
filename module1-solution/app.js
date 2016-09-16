(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchMenu = '';
    $scope.message = '';
    $scope.messages = ['Please enter data first.', 'Enjoy!', 'Too much!'];
    $scope.threshold = 3;
    $scope.state = -1;

    $scope.checkLunchMenu = function () {
        var len = $scope.lunchMenu.split(',').filter(function (s) { return s.trim().length > 0 }).length;
        $scope.state = len == 0 ? 0 : len <= $scope.threshold ? 1 : 2;
        $scope.message = $scope.messages[$scope.state];
    };
}

})();
