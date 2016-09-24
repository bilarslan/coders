angular.module('coders-app', ['codersAppRoutes', 'authController', 'mainController', 'authService'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
