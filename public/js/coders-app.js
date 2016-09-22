angular.module('coders-app', ['codersAppRoutes', 'authController', 'authService'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
