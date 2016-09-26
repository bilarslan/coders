var questionService = angular.module('questionService', []);


questionService.factory('questionCRUDService', ['$http', '$q', function($http, $q) {

    var questionCRUDFactory = {};

    questionCRUDFactory.getQuestion = function(id) {}

    questionCRUDFactory.createQuestion = function(question) {}

    questionCRUDFactory.updateQuestion = function(question) {}

    questionCRUDFactory.deleteQuestion = function(id) {}

    return questionCRUDFactory;
}]);
