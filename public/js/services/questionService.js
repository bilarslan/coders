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

    questionCRUDFactory.createQuestion = function(question) {
        if (question) {
            return $http.post('/question/create', question);
        } else {
            return null;
        }
    }

    questionCRUDFactory.createAnswer = function(answer) {
        if (answer) {
            return $http.post('/question/answer', answer);
        } else {
            return null;
        }
    }

    questionCRUDFactory.like = function(id) {
        if (id) {
            return $http.get('/question/like/' + id);
        } else {
            return null;
        }
    }

    questionCRUDFactory.dislike = function(id) {
        if (id) {
            return $http.get('/question/dislike/' + id);
        } else {
            return null;
        }
    }

    questionCRUDFactory.likeAnswer = function(id) {
        if (id) {
            return $http.get('/question/like_answer/' + id);
        } else {
            return null;
        }

    }

    questionCRUDFactory.dislikeAnswer = function(id) {
        if (id) {
            return $http.get('/question/dislike_answer/' + id);
        } else {
            return null;
        }

    }

    questionCRUDFactory.updateQuestion = function(question) {}

    questionCRUDFactory.deleteQuestion = function(id) {}

    return questionCRUDFactory;
}]);
