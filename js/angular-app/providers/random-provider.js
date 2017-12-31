randomApp.provider('Random', function () {
    var _abi;
    var _addresses = {};
    var _lotteries = {};

    return {
        setAbi: function (abi) {
            _abi = abi
        },

        addLottery: function(name, address) {
            if (_addresses[name] === undefined) {
                _addresses[name] = address;
                return true;
            }
            
            return false;
        },

        removeLottery: function(name) {
            if (_addresses[name]) {
                delete _addresses[name];
                return true;
            }
            
            return false;
        },

        $get: function (web3, $log, $window, Lottery) {
            if (!_abi) {
                if (!$window.abi){
                    $log.error('abi object does not exist or has not been configured');
                    return undefined;
                }

                _abi = $window.abi;
            }

            var _contract = web3.eth.contract(_abi);
            
            return {
                /**
                 * Contract getter with lazy initializer
                 * @return {*}
                 */
                contract: function() { return _contract || (_contract = web3.eth.contract(_abi)) },

                /**
                 * Lottery contract instance getter with lazy initializer
                 * @param {string} name
                 * @return {undefined|object}
                 */
                lottery: function(name) {
                    if (!_addresses[name]) return undefined;
                    return (_lotteries[name] || (_lotteries[name] = new Lottery(name, _addresses[name], this.contract())));
                },

                loadAll: function() {
                    var self = this;
                    Object.keys(_addresses).forEach(function (name) {
                        self.lottery(name).load();
                    })
                }
            }
        }
    }
});