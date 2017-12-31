randomApp.config(function($locationProvider, RandomProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    RandomProvider.addLottery('daily', '0xaf4d0e373e44d17439d11e5c312cd62efb603238');
    RandomProvider.addLottery('weekly', '0xaf4d0e373e44d17439d11e5c312cd62efb603238');
    RandomProvider.addLottery('monthly', '0xaf4d0e373e44d17439d11e5c312cd62efb603238');
});