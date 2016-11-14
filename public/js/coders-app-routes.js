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
        .when('/question/new', {
            templateUrl: '../views/newquestion.html',
            controller: 'newQuestionController'
        })
        .when('/question/:id', {
            templateUrl: '../views/question.html',
            controller: 'questionAnswersController'
        })
        .when('/videos',{
          templateUrl: '../views/videos.html',
          controller: 'videosController'
        })
        .when('/video/:id/',{
          templateUrl: '../views/video.html'
        })
        .when('/contact',{
          templateUrl:'../views/contact.html',
          controller:'createContactController'
        })
        .when('/contact-success',{
          templateUrl:'../views/contact-success.html'
        })
        .when('/profile/:username',{
          templateUrl:'../views/profile.html',
          controller:'profileController'
        })
        .otherwise({
            redirectTo: "/"
        });

    //$locationProvider.html5Mode(true);
});
