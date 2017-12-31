randomApp.directive('slick', function ($) {
    return {
        restrict: 'AE',
        scope: {
            autoplay: '=',
            dots: '=',
            arrows: '=',
            asNavFor: '@',
            autoplaySpeed: '='
        },
        link: function(scope, element) {
            var params = {
                autoplay: scope.autoplay,
                dots: scope.dots,
                arrows: scope.arrows,
                asNavFor: scope.asNavFor,
                autoplaySpeed: scope.autoplaySpeed
            };

            console.log('[slick] Initialized with params: ', params);
            $(element).slick(params);

            scope.$on("$destroy", function() {
                $(element).slick('unslick');
            });
        }
    }
});