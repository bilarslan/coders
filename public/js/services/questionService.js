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

    questionCRUDFactory.like = function(id, questions) {
        if (id) {
            $http.get('/question/like/' + id).success(function(response) {
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];
                    if (question.id == id) {
                        question.likeDislike += response.message;
                        if (response.message < 0) {
                            question.rateLike = false;
                            question.rateDislike = false;
                        } else {
                            question.rateLike = true;
                            question.rateDislike = false;
                        }
                        break;
                    }
                }
            });
        } else {
            return null;
        }
    }

    questionCRUDFactory.dislike = function(id, questions) {
        if (id) {
            $http.get('/question/dislike/' + id).success(function(response) {
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];
                    if (question.id == id) {
                        question.likeDislike += response.message;
                        if (response.message < 0) {
                            question.rateDislike = true;
                            question.rateLike = false;
                        } else {
                            question.rateDislike = false;
                            question.rateLike = false;
                        }
                        break;
                    }
                }
            });
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
