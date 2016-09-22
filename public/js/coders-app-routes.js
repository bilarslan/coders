angular.module('codersAppRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: '../views/home.html'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'signInController'
        })

    //$locationProvider.html5Mode(true);
});
