randomApp.config(function($locationProvider, RandomProvider, web3Provider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    // web3Provider.setProviderByAddress('http://bchain02.parity.io');
    
    web3Provider.setProviderByAddress('https://bchain02.dsplus.pro');

    RandomProvider.addLottery('daily', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
    RandomProvider.addLottery('weekly', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
    RandomProvider.addLottery('monthly', '0x40AD13badf747717683905bFA4AC8B9B6f0093fC');
});