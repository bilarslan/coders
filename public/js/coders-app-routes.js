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
        .when('/register', {
            templateUrl: '../views/register.html',
            controller: 'signUpController'

        })
        .when('/questions', {
            templateUrl: '../views/questions.html',
            controller: 'questionsController'
        })
        .otherwise({
            redirectTo: "/"
        });

    //$locationProvider.html5Mode(true);
});
