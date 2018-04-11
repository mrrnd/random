randomApp.directive('faqCollapse', function($sce) {
    return {
        restrict: 'E',
        templateUrl: 'pages/partials/faq-collapse.html',
        scope: {
            question: '=',
            answer: '='
        },
        link: function(scope, element) {
            var p = $(element).find('p');

            scope.answer = $sce.trustAsHtml(scope.answer);

            scope.collapse = function() {
                p.collapse('toggle');
            }
        }
    }
});