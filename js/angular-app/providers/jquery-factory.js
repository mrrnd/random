randomApp.factory('$', function($window) {
    return $window.jQuery || angular.element;
});