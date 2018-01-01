randomApp.config(function($locationProvider, RandomProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    RandomProvider.addLottery('daily', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
    RandomProvider.addLottery('weekly', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
    RandomProvider.addLottery('monthly', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
});