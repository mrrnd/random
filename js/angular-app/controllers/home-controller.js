randomApp.controller('homeController', function ($scope, Random, $location) {
    Random.loadAll();

    $scope.withdraws = {};
    $scope.purchase = {};

    $scope.toJoin = function() {
        $location.path('/join')
    };

    $scope.rinvestPopup = function(action) {
        $('#rinvest-popup').modal(action);
    };

    $scope.$on('$destroy', function() {
        $scope.rinvestPopup('hide');
    });

    Random.daily.loadPrevLotteryWithdraws().then(function (result) { $scope.withdraws.daily = result });
    Random.daily.loadPrevLotteryRefills().then(function (result) { $scope.purchase.daily = result });
    Random.monthly.loadPrevLotteryWithdraws().then(function (result) { $scope.withdraws.monthly = result });
    Random.monthly.loadPrevLotteryRefills().then(function (result) { $scope.purchase.monthly = result });
});