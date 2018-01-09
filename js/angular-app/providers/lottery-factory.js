randomApp.factory('Lottery', function($q, $log, $http, web3, EtherscanAPI) {
    /**
     * @param {string} name Name of this lottery you can access it with
     * @param {string} address Contract address
     * @param {object} contract Web3 contract
     * @param {int} creationBlock Block where this contract was created
     * @constructor
     */
    function Lottery(name, address, contract, creationBlock) {
        var lottery = this;

        var _instance;
        var _contract = contract;
        var _address = address;
        var _creationBlock = creationBlock;

        this.name = name;

        this.init();

        /**
         * @param fn
         * @return {Promise<*>}
         */
        function instance$call(fn) {
            var d = $q.defer();
            var name = arguments[0];
            var args = [].slice.call(arguments, 1);

            args.push(function(error, result) {
                if (error) {
                    $log.error('[lottery] Contract instance remote function call error:', name, [].slice.call(arguments, 1));
                    d.reject(error);
                } else {
                    d.resolve(result);
                }
            });

            lottery.instance()[name].apply(lottery.instance(), args);

            return d.promise;
        }

        this.loadStartBlock = function() {
            return instance$call('startBlockNumber').then(
                function(result) { return lottery.startBlock = result.toNumber() },
                function() { lottery.startBlock = 'error' }
            )
        };

        this.loadLiveBlocks = function() {
            return instance$call('liveBlocksNumber').then(
                function(result) { return lottery.liveBlocks = result.toNumber() },
                function() { lottery.liveBlocks = 'error' }
            )
        };

        /**
         * @return {Promise<number>}
         */
        this.loadTicketsNum = function() {
            return instance$call('ticketsNum').then(
                function(result) { return lottery.tickets = result.toNumber() },
                function() { lottery.tickets = 'error' }
            )
        };

        /**
         * @param {string} userAddress
         * @return {Promise<int>}
         */
        this.loadAddressTickets = function(userAddress) {
           return instance$call('getTicketsCount', userAddress).then(
               // function(result) { return lottery.addressTickets = result.toNumber() },
               function(result) { return result.toNumber() },
               function() { lottery.addressTickets = 'error' });
        };

        /**
         * @return {Promise<number>}
         */
        this.loadJackpotA = function() {
            return instance$call('jackPotA').then(
                function(result) { return lottery.jackpotA = web3.fromWei(result.toNumber()) },
                function() { lottery.jackpotA = 'error' }
            )
        };

        /**
         * @return {Promise<number>}
         */
        this.loadJackpotB = function() {
            return instance$call('jackPotB').then(
                function(result) { return lottery.jackpotB = web3.fromWei(result.toNumber()) },
                function() { lottery.jackpotB = 'error' }
            )
        };

        /**
         * @return {Promise<number>}
         */
        this.loadJackpotC = function() {
            return instance$call('jackPotC').then(
                function(result) { return lottery.jackpotC = web3.fromWei(result.toNumber()) },
                function() { lottery.jackpotC = 'error' }
            )
        };

        this.loadEndBock = function() {
            return instance$call('endBlockNumber').then(
                function(result) { return lottery.endBlock = result.toNumber() },
                function() { lottery.endBlock = 'error' }
            )
        };

        this.loadPrizeFund = function() {
            return instance$call('prizeFund').then(
                function(result) { return lottery.prizeFund = web3.fromWei(result.toNumber()) },
                function() { lottery.prizeFund = 'error' }
            )
        };

        /**
         *
         * @param {int} [n=30]
         * @return {Promise<{eth: string, sender: string}>}
         */
        this.loadPrevLotteryRefills = function(n) {
            if (!n) n = 30;

            var d = $q.defer();

            /**** Get events from Etherscan API ****/
            EtherscanAPI.logs.getLogs({
                fromBlock: _creationBlock,
                toBlock: 'latest',
                address: _address,
                topic0: '0xe3d4187f6ca4248660cc0ac8b8056515bac4a8132be2eca31d6d0cc170722a7e'
            }).then(
                function(result) {
                    d.resolve(result.slice(-n)
                        .sort(function (a, b) {
                            var abn = parseInt(a.blockNumber, 16);
                            var bbn = parseInt(b.blockNumber, 16);

                            if (abn > bbn) return 1;
                            if (abn < bbn) return -1;
                            return 0;
                        })
                        .map(function (tx) {
                            return {
                                eth: web3.fromWei(tx.data),
                                sender: web3.fromDecimal(tx.topics[1])
                            }
                        }));
                }
            );

            /**** Get events from a node ****/
            // this.loadStartBlock()
            //     .then(function() { return lottery.loadLiveBlocks() })
            //     .then(function() {
            //         lottery.instance().Buy(null, {
            //             fromBlock: _creationBlock,
            //             toBlock: 'latest'
            //         }).get(function(error,result) {
            //             if (error) {
            //                 d.reject(error);
            //             } else {
            //                 d.resolve(result.slice(-n)
            //                     .sort(function(a, b) {
            //                         if (a.blockNumber > b.blockNumber) return 1;
            //                         if (a.blockNumber < b.blockNumber) return -1;
            //                         return 0;
            //                     })
            //                     .map(function(tx) {
            //                         return {
            //                             eth: web3.fromWei(tx.args.eth.toNumber()),
            //                             sender: tx.args.sender
            //                         }
            //                     }));
            //             }
            //         });
            //     });

            return d.promise;
        };

        /**
         *
         * @param {int} [n=30]
         * @return {Promise<{eth: string, to: string}>}
         */
        this.loadPrevLotteryWithdraws = function(n) {
            if (!n) n = 30;

            var d = $q.defer();

            /**** Get events from Etherscan API ****/
            EtherscanAPI.logs.getLogs({
                fromBlock: _creationBlock,
                address: _address,
                topic0: '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb'
            }).then(
                function(result) {
                    d.resolve(result.slice(-n)
                        .sort(function (a, b) {
                            var abn = parseInt(a.blockNumber, 16);
                            var bbn = parseInt(b.blockNumber, 16);

                            if (abn > bbn) return 1;
                            if (abn < bbn) return -1;
                            return 0;
                        })
                        .map(function (tx) {
                            return {
                                eth: web3.fromWei('0x' + tx.data.slice(66)),
                                to: web3.fromDecimal(tx.data.slice(0,66))
                            }
                        }));
                }
            );

            /**** Get events from node by web3 ****/
            // this.loadStartBlock()
            //     .then(function() { return lottery.loadLiveBlocks() })
            //     .then(function() {
            //         lottery.instance().Withdraw(null, {
            //             fromBlock: _creationBlock,
            //             toBlock: 'latest'
            //         }).get(function(error,result) {
            //             if (error) {
            //                 d.reject(error);
            //             } else {
            //                 d.resolve(result.slice(-n)
            //                     .sort(function(a, b) {
            //                         if (a.blockNumber > b.blockNumber) return 1;
            //                         if (a.blockNumber < b.blockNumber) return -1;
            //                         return 0;
            //                     })
            //                     .map(function(tx) {
            //                         return {
            //                             eth: web3.fromWei(tx.args.eth.toNumber()),
            //                             to: tx.args.to
            //                         }
            //                     }));
            //             }
            //         });
            //     });

            return d.promise;
        };

        /**
         * Loads all lottery parameters from contract
         * @return {Promise}
         * @methodOf Lottery
         */
        this.load = function() {
            var d = $q.defer();
            $log.log('[Lottery] loading start: ' + this.name);

            this.init();

            $q.all([
                this.loadTicketsNum().then(d.notify),
                this.loadJackpotA().then(d.notify),
                // this.loadCountWinner().then(d.notify),
                this.loadJackpotB().then(d.notify),
                this.loadJackpotC().then(d.notify),
                this.loadEndBock().then(d.notify),
                this.loadStartBlock().then(d.notify),
                this.loadLiveBlocks().then(d.notify),
                this.loadPrizeFund().then(d.notify)
            ]).then(function() {
                d.resolve(lottery);
                $log.log('[Lottery] loading complete: ', lottery)
            });

            return d.promise;
        };

        /**
         * Calculate how many blocks left to the end of current lottery
         * @param {int} currentBlock
         * @return {number} More then 0
         */
        this.blocksLeft = function (currentBlock) {
            if (this.endBlock && currentBlock) {
                var d = this.endBlock - currentBlock;
                return d > 0 ? d : 0;
            }

            return null;
        };

        /**
         * Current contract instance getter with lazy initializer
         * @return {object}
         */
        this.instance = function() { return _instance || (_instance = _contract.at(_address)) };

        /**
         * Return current contract address
         * @return {string}
         */
        this.address = function() { return _address };

        /**
         * Return current contract
         * @return {Object}
         */
        this.contract = function() { return _contract };
    }

    Lottery.prototype.init = function () {
        this.tickets = null;
        this.endBlock = null;
        this.startBlock = null;
        this.liveBlocks = null;
        this.prizeFund = null;
        this.winAddresses = null;
        this.jackpotA = null;
        this.jackpotB = null;
        this.jackpotC = null;
    };

    return Lottery;
});