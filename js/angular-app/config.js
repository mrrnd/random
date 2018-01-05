randomApp.config(function($locationProvider, RandomProvider, web3Provider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    web3Provider.setProviderByAddress('https://mainnet.infura.io/AWVntdpHh8BbIohJogvB');
    // web3Provider.setProviderByAddress("http://185.22.62.189:8546");
    // web3Provider.setProviderByAddress("http://185.22.61.111:8545");
    web3Provider.setProviderByAddress("https://wallet.parity.io");

    RandomProvider.addLottery('daily', '0xAd7E9b5b9d15f2B26464ecBE76065F033B126a6C', 4837532);
    RandomProvider.addLottery('weekly', '0xAd7E9b5b9d15f2B26464ecBE76065F033B126a6C', 4837532);
    RandomProvider.addLottery('monthly', '0xAd7E9b5b9d15f2B26464ecBE76065F033B126a6C', 4837532);
});