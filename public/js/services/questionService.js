var questionService = angular.module('questionService', []);


questionService.factory('questionCRUDService', ['$http', '$q', function($http, $q) {

    var questionCRUDFactory = {};

    questionCRUDFactory.getQuestion = function(id) {
        if (id) {
            return $http.get('/question/' + id);
        } else {
            return $http.get('/question');
        }

    }

    questionCRUDFactory.createQuestion = function(question) {}

    questionCRUDFactory.updateQuestion = function(question) {}

    questionCRUDFactory.deleteQuestion = function(id) {}

    return questionCRUDFactory;
}]);
