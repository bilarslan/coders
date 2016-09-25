angular.module('coders-app', ['codersAppRoutes', 'authController', 'mainController', 'questionController', 'authService'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
