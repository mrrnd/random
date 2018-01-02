randomApp.controller('joinController', function ($scope, $timeout, $interval, $cookies, $log, $window, web3, Random) {
    var $slider = $('.lottery-slider');

    $scope.slidesOrder = ['daily', 'weekly', 'monthly'];
    $scope.address = $cookies.get('user_address') || '';
    $scope.accountBalance = null;
    $scope.amount = 1;
    $scope.currentBlock = 0;
    $scope.currentSlide = 0;
    $scope.Random = Random;
    $scope.errors = {};
    $scope.ticketsAt = {};

    $scope.goTo = function(n) {
        $slider.slick('slickGoTo', n);
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

        Random.lottery('daily').loadTicketsNum().then(function(result) {
            $scope.ticketsAt.daily = result;
        });

        Random.lottery('daily').loadAddressTickets($scope.address).then(function(result) {
            // $scope.ticketsAt.daily = result;
            Random.lottery('daily').addressTickets = result;
        });

        Random.lottery('weekly').loadAddressTickets($scope.address).then(function(result) {
            $scope.ticketsAt.weekly = result;
        });

        Random.lottery('monthly').loadAddressTickets($scope.address).then(function(result) {
            $scope.ticketsAt.monthly = result;
        });
    };

    $scope.calcSum = function() {
        return this.amount * 0.01;
    };

    $scope.blocksLeft = function () {
        if ($scope.lotteryInfo[0] && $scope.lotteryInfo[0].endBlock && $scope.currentBlock) {
            var d = $scope.lotteryInfo[0].endBlock - $scope.currentBlock;
            return d > 0 ? d : 0;
        }

        return 0;
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

    $scope.address && $scope.getBalances();
});