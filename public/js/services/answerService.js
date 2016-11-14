var answerService = angular.module('answerService', []);


answerService.factory('answerCRUDService', ['$http', '$q', function($http, $q) {

    var answerCRUDFactory = {};

    answerCRUDFactory.createAnswer = function(answer) {
        if (answer) {
            return $http.post('/question/answer', answer);
        } else {
            return null;
        }
    }

    answerCRUDFactory.like = function(id) {
        if (id) {
            return $http.get('/answer/like/' + id);
        } else {
            return null;
        }
    }

    answerCRUDFactory.dislike = function(id) {
        if (id) {
            return $http.get('/answer/dislike/' + id);
        } else {
            return null;
        }
    }

    answerCRUDFactory.updateAnswer = function(answer) {}

    answerCRUDFactory.deleteAnswer = function(id) {}

    return answerCRUDFactory;
}]);
