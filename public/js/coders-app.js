angular.module('coders-app', ['codersAppRoutes',
    'authController',
    'mainController',
    'questionController',
    'videoController',
    'contactController',
    'authService',
    'questionService',
    'videoService'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
