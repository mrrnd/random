randomApp.config(function($locationProvider, RandomProvider, web3Provider, EtherscanAPIProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    EtherscanAPIProvider.setAPIKey('S7FFGGM13TB189IXRJND4PS18Z8PJC8BF4');

    web3Provider.setProviderByAddress('https://mainnet.infura.io/AWVntdpHh8BbIohJogvB');
    // web3Provider.setProviderByAddress("http://185.22.62.189:8546");
    // web3Provider.setProviderByAddress("http://185.22.61.111:8545");
    // web3Provider.setProviderByAddress("https://wallet.parity.io");

    RandomProvider.addLottery('daily', '0xAd7E9b5b9d15f2B26464ecBE76065F033B126a6C', 4837532);
    RandomProvider.addLottery('weekly', '0xAd7E9b5b9d15f2B26464ecBE76065F033B126a6C', 4837532);
    RandomProvider.addLottery('monthly', '0x950E255c4362c7D7824c63911331BA0C3B090a52', 4879191);
});