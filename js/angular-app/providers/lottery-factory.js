randomApp.factory('Lottery', function($q, $log, web3) {
    /**
     * @param {string} name
     * @param {string} address
     * @param {object} contract
     * @constructor
     * @class Lottery
     */
    function Lottery(name, address, contract) {
        var lottery = this;

        var _instance;
        var _contract = contract;
        var _address = address;

        this.name = name;
        this.tickets = null;
        this.endBlock = null;
        this.startBlock = null;
        this.liveBlocks = null;
        this.prizeFund = null;
        // this.addressTickets = null;
        // this.winners = null;
        // this.winnings = null;
        this.winAddresses = null;

        this.jackpotA = null;
        this.jackpotB = null;
        this.jackpotC = null;

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

        // this.loadCountWinner = function() {
        //     return instance$call('getRecentWinnersCount').then(
        //         function(result) { return lottery.countWinner = result.toNumber() },
        //         function() { lottery.countWinner = 'error' }
        //     )
        // };

        /**
         *
         * @param {int} [n=30]
         * @return {Promise<{eth: string, sender: string}>}
         */
        this.loadPrevLotteryRefills = function(n) {
            if (!n) n = 30;

            var d = $q.defer();

            this.loadStartBlock()
                .then(function() { return lottery.loadLiveBlocks() })
                .then(function() {
                    lottery.instance().Buy(null, {
                        fromBlock: 4837532,
                        toBlock: 'latest'
                    }).get(function(error,result) {
                        if (error) {
                            d.reject(error);
                        } else {
                            d.resolve(result.slice(-n)
                                .sort(function(a, b) {
                                    if (a.blockNumber > b.blockNumber) return 1;
                                    if (a.blockNumber < b.blockNumber) return -1;
                                    return 0;
                                })
                                .map(function(tx) {
                                    return {
                                        eth: web3.fromWei(tx.args.eth.toNumber()),
                                        sender: tx.args.sender
                                    }
                                }));
                        }
                    });
                });

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

            this.loadStartBlock()
                .then(function() { return lottery.loadLiveBlocks() })
                .then(function() {
                    lottery.instance().Withdraw(null, {
                        fromBlock: 4837532,
                        toBlock: 'latest'
                    }).get(function(error,result) {
                        if (error) {
                            d.reject(error);
                        } else {
                            d.resolve(result.slice(-n)
                                .sort(function(a, b) {
                                    if (a.blockNumber > b.blockNumber) return 1;
                                    if (a.blockNumber < b.blockNumber) return -1;
                                    return 0;
                                })
                                .map(function(tx) {
                                    return {
                                        eth: web3.fromWei(tx.args.eth.toNumber()),
                                        to: tx.args.to
                                    }
                                }));
                        }
                    });
                });

            return d.promise;
        };

        // this.loadWinnings = function() {
        //     return instance$call('getRecentWinnings').then(
        //         function(result) { return lottery.winnings = result },
        //         function() { lottery.winnings = ['error'] }
        //     )
        // };
        //
        // this.loadWinners = function() {
        //     return instance$call('getRecentWinners').then(
        //         function(result) {
        //             lottery.winAddresses = new Array(result.length);
        //             return lottery.winners = result
        //         },
        //         function() { lottery.winners = ['error'] }
        //     )
        // };
        //
        // this.loadWinnersAddresses = function() {
        //     var d = $q.defer();
        //
        //     function loadWinner(n) {
        //         instance$call('getTicketOwner', lottery.winners[n]).then(
        //             function(result) {
        //                 lottery.winAddresses[n] = result;
        //
        //                 if (++n < lottery.winners.length) {
        //                     loadWinner(n);
        //                 } else {
        //                     d.resolve(lottery.winAddresses);
        //                 }
        //
        //                 return result;
        //             },
        //             function() {
        //                 lottery.winAddresses[n] = 'error'
        //             }
        //         ).finally(function() {
        //             d.notify();
        //         });
        //     }
        //
        //     if (lottery.winners.length) {
        //         loadWinner(0);
        //     } else {
        //         d.resolve(lottery.winAddresses)
        //     }
        //
        //     return d.promise;
        // };

        /**
         * Loads all lottery parameters from contract
         * @return {Promise}
         * @methodOf Lottery
         */
        this.load = function() {
            var d = $q.defer();
            $log.log('[Lottery] loading start: ' + this.name);

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

            return 0;
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

    return Lottery;
});