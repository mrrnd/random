randomApp.provider('web3', function() {
    var _provider;

    if (!Web3) {
        console.error('angular-web3: Web3 is not found in global scope. Service is unavailable.');
        return {$get:function(){}};
    }

    return {
        setProvider: function(provider) {
            _provider = provider;
        },

        setProviderByAddress: function(address) {
            //provider = new window.Web3.providers.HttpProvider(address);
            // _provider = new Web3.providers.HttpProvider("http://185.22.62.189:8546");
            // _provider = new Web3.providers.HttpProvider("http://185.22.61.111:8545");
            _provider = new Web3.providers.HttpProvider("https://bchain02.dsplus.pro");
            // _provider = new Web3.providers.HttpProvider("http://wallet.parity.io");
        },

        setDefaultProvider: function() {
            _provider = window.web3 ? window.web3.currentProvider : null;

        },

        $get: function($log) {
            !_provider && this.setDefaultProvider();

            if (_provider === null) {
                $log.error('angular-web3: Default provider doesn\'t exist or hasn\'t been configured. Service is unavailable.');
                return undefined;
            }

            return new Web3(_provider);
        }
    }
});