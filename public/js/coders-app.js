angular.module('coders-app', ['codersAppRoutes',
    'authController',
    'mainController',
    'questionController',
    'contactController',
    'authService',
    'questionService'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
