randomApp.controller('homeController', function ($scope, Random) {
    $scope.withdraws = {};
    $scope.purchase = {};

    Random.lottery('daily').loadPrevLotteryWithdraws().then(function (result) {
        console.log($scope.withdraws.daily = result);
    });

    Random.lottery('daily').loadPrevLotteryRefills().then(function (result) {
        console.log($scope.purchase.daily = result);
    })
});