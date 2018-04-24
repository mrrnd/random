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
        .when('/faq-random', {
            templateUrl: 'pages/faq.html',
            controller:  'faqRandomController'
        })
        .when('/faq-rinvest', {
            templateUrl: 'pages/faq.html',
            controller:  'faqRinvestController'
        })
        .otherwise({ redirectTo: '/' });
});