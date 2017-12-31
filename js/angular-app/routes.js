randomApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'homeController'
        })
        .when('/join', {
            templateUrl: 'pages/join.html',
            controller:  'joinController'
        })
        .otherwise({ redirectTo: '/' });
});