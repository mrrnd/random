randomApp.provider('Random', function () {
    var _abi;
    var _addresses = {};
    var _lotteries = {};

    return {
        setAbi: function (abi) {
            _abi = abi
        },

        /**
         * Add a new lottery to collection.
         * @param {string} name Name of this lottery you can access it with
         * @param {string} address Contract address
         * @param {int} creationBlock Block where this contract was created
         * @return {boolean} true if lottery successfully created, false if lottery with given name already exists
         */
        addLottery: function(name, address, creationBlock) {
            if (_addresses[name] === undefined) {
                _addresses[name] = [address, creationBlock];
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
                    return (_lotteries[name] || (_lotteries[name] = new Lottery(name, _addresses[name][0], this.contract(), _addresses[name][1])));
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