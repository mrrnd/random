randomApp.controller('joinController', function ($scope, $timeout, $interval, $cookies, $log, $window, web3, Random) {
    var $slider = $('.lottery-slider');

    $scope.slidesOrder = ['daily', 'monthly'];
    $scope.address = $cookies.get('user_address') || '';
    $scope.accountBalance = null;
    $scope.amount = 1;
    $scope.currentBlock = 0;
    $scope.currentSlide = 0;
    $scope.Random = Random;
    $scope.errors = {};

    $scope.goTo = function(n) {
        $slider.slick('slickGoTo', n);
    };

    $scope.reload = function () {
        Random.loadAll();

        if ($scope.address) {
            Random.daily.loadAddressTickets($scope.address);
            Random.weekly.loadAddressTickets($scope.address);
            Random.monthly.loadAddressTickets($scope.address);
        }
    };

    $scope.getBalances = function () {
        $scope.errors['address'] = null;

        if (!/^0x[A-Za-z0-9]{40}/.test($scope.address)) {
            $scope.errors['address'] = 'Wrong address format. Please, enter a correct Ethereum wallet.'
        }

        $cookies.put('user_address', $scope.address);

        web3.eth.getBalance($scope.address, function (error, result) {
            if (!error) {
                $scope.accountBalance = web3.fromWei(result.toNumber()) + " ETH";
                $scope.$apply();
            } else {
                $scope.accountBalance = 'error';
                console.error(error);
            }
        });

        $scope.reload();
    };

    $scope.calcSum = function() {
        return this.amount * 0.01;
    };

    $scope.$watch('amount', function(newVal,oldVal) {
        if (newVal === null) return;

        var n = parseInt(newVal);

        if (isNaN(n)) {
            $scope.amount = oldVal;
        } else if (n < 1) {
            $scope.amount = 1;
        } else {
            $scope.amount = n;
        }
    });

    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var phase = $scope.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            $scope.currentSlide = nextSlide;
        } else {
            $scope.$apply(function() {
                $scope.currentSlide = nextSlide;
            })
        }
    });

    web3.eth.getBlockNumber(function (err, result) {
        $scope.currenctBlock = result;
        $log.log('[web3] Current block:', result);
    });

    $scope.reload();
});