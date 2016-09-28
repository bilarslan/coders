var questionController = angular.module('questionController', []);

questionController.controller('questionsController', ['$scope', 'questionCRUDService', function($scope, questionCRUDService) {

    $scope.questions = [];

    questionCRUDService.getQuestion().success(function(response) {
        console.log(response);
    }).error(function(err) {
        console.log(err);
    });

}]);
