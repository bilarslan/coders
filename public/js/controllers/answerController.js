var answerController = angular.module('answerController', ['ngRoute']);

answerController.controller('answerController', ['$scope', 'answerCRUDService', 'auth', function($scope, answerCRUDService, auth) {

    $scope.answer = [];
    var username = auth.userName();
    //Get all questions
    answerCRUDService.getAnswer().success(function(response) {
        response.forEach(function(answer) {
            var rateLike = false;
            var rateDislike = false;
            var likeDislike = 0;
            answer.answerRates.forEach(function(rating) {
                if (rating.rate == 1) {
                    if (username == rating.user.username) {
                      rateLike = true;
                    }
                    likeDislike++;
                } else if (rating.rate == -1) {
                    if (username == rating.user.username) {
                      rateDislike = true;
                    }
                    likeDislike--;
                }
            });
            answer.likeDislike = likeDislike;
            answer.rateLike = rateLike;
            answer.rateDislike = rateDislike;

        });
        $scope.answer = response;
    }).error(function(err) {
        console.log(err);
    });

    $scope.like = function(id) {
        answerCRUDService.like(id).success(function(response) {
            for (var i = 0; i < $scope.answer.length; i++) {
                var answer = $scope.answer[i];
                if (answer.id == id) {
                    answer.likeDislike += response.message;
                    if(response.message < 0){
                      answer.rateLike = false;
                      answer.rateDislike = false;
                    }else{
                        answer.rateLike = true;
                        answer.rateDislike = false;
                    }
                    break;
                }
            }

        }).error(function(err) {
            console.log(err);
        });
    }

    $scope.dislike = function(id) {
        answerCRUDService.dislike(id).success(function(response) {
            for (var i = 0; i < $scope.answer.length; i++) {
                var answer = $scope.answer[i];
                if (answer.id == id) {
                    answer.likeDislike += response.message;
                    if(response.message < 0){
                      answer.rateDislike = true;
                      answer.rateLike = false;
                    }else{
                      answer.rateDislike = false;
                      answer.rateLike = false;
                    }
                    break;
                }
            }
        }).error(function(err) {
            console.log(err);
        });
    }

}]);
