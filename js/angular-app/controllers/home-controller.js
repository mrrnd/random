randomApp.controller('homeController', function ($scope, Random, $location) {
    $scope.withdraws = {};
    $scope.purchase = {};

    $scope.toJoin = function() {
        $location.path('/join')
    };

    Random.lottery('daily').loadPrevLotteryWithdraws().then(function (result) {
        $scope.withdraws.daily = result;
    });

    Random.lottery('daily').loadPrevLotteryRefills().then(function (result) {
        $scope.purchase.daily = result;
    })
});