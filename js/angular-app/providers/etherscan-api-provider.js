randomApp.provider('EtherscanAPI', function() {
    var _key;
    var _baseUrl = 'https://api.etherscan.io/api';

    return {
        setAPIKey: function(key) { _key = key },

        $get: function($log, $http, $q, $) {
            if (!_key) {
                $log.warn('[etherscan api] API Key is not provided. Service is unavailable!');
                return undefined;
            }

            return {
                logs: {
                    getLogs: function (options) {
                        var d = $q.defer();
                        var params = $.extend({
                            fromBlock: 0,
                            toBlock: 'latest'
                        }, options);

                        params.module = 'logs';
                        params.action = 'getLogs';
                        params.apikey = _key;


                        $log.log('[etherscan api] Getting logs: ', params);

                        $http({
                            url: _baseUrl,
                            method: 'get',
                            params: params
                        }).then(function(response) {
                            var data = response.data;

                            if (data.message === 'OK') {
                                d.resolve(data.result)
                            } else {
                                d.reject(data.message);
                            }
                        }, function(error) {
                            d.reject(error);
                        });

                        return d.promise;
                    }
                }
            };
        }
    }
});