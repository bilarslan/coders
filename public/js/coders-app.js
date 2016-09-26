angular.module('coders-app', ['codersAppRoutes',
    'authController',
    'mainController',
    'questionController',
    'authService',
    'questionService'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
