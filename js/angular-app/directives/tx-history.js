randomApp.directive('txHistory', function() {
    return {
        restrict: 'AE',
        templateUrl: 'pages/partials/tx-history.html',
        scope: {
            withdraws: '=',
            purchases: '='
        }
    }
});