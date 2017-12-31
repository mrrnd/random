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
            _provider = new window.Web3.providers.HttpProvider(address);
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