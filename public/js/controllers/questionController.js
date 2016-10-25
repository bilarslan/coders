var questionController = angular.module('questionController', ['ngRoute']);

questionController.controller('questionsController', ['$scope', 'questionCRUDService', 'auth', function($scope, questionCRUDService, auth) {

    $scope.questions = [];
    var username = auth.userName();
    //Get all questions
    questionCRUDService.getQuestion().success(function(response) {
        response.forEach(function(question) {
            var rateLike = false;
            var rateDislike = false;
            var likeDislike = 0;
            question.questionRates.forEach(function(rating) {
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
            question.likeDislike = likeDislike;
            question.rateLike = rateLike;
            question.rateDislike = rateDislike;

        });
        $scope.questions = response;
    }).error(function(err) {
        console.log(err);
    });

    $scope.like = function(id) {
        questionCRUDService.like(id).success(function(response) {
            for (var i = 0; i < $scope.questions.length; i++) {
                var question = $scope.questions[i];
                if (question.id == id) {
                    question.likeDislike += response.message;
                    if(response.message < 0){
                      question.rateLike = false;
                      question.rateDislike = false;
                    }else{
                        question.rateLike = true;
                        question.rateDislike = false;
                    }
                    break;
                }
            }

        }).error(function(err) {
            console.log(err);
        });
    }

    $scope.dislike = function(id) {
        questionCRUDService.dislike(id).success(function(response) {
            for (var i = 0; i < $scope.questions.length; i++) {
                var question = $scope.questions[i];
                if (question.id == id) {
                    question.likeDislike += response.message;
                    if(response.message < 0){
                      question.rateDislike = true;
                      question.rateLike = false;
                    }else{
                      question.rateDislike = false;
                      question.rateLike = false;
                    }
                    break;
                }
            }
        }).error(function(err) {
            console.log(err);
        });
    }

}]);

questionController.controller('questionAnswersController', ['$scope', '$routeParams', '$location', 'auth', 'questionCRUDService', function($scope, $routeParams, $location, auth, questionCRUDService) {

    //Get id of question from url params
    var id = $routeParams.id;
    $scope.isLoggedIn = false;
    $scope.question = {};
    $scope.answer = {
        questionId: id
    };

    auth.getUser().then(function(response) {
        $scope.isLoggedIn = true;
    }, function(err) {});

    //Get question and answers
    questionCRUDService.getQuestion(id).success(function(response) {
        $scope.question = response;
    }).error(function(err) {
        console.log(err);
    });

    //Answer the question
    $scope.answerQuestion = function() {
        questionCRUDService.createAnswer($scope.answer).success(function(response) {
            $scope.question = response;
            $scope.answer.content = '';
        }).error(function(err) {
            console.log(err);
        });
    }
}]);

questionController.controller('newQuestionController', ['$scope', '$location', 'auth', 'questionCRUDService', function($scope, $location, auth, questionCRUDService) {

    $scope.title = '';
    $scope.content = '';
    $scope.tags = '';
    $scope.error = '';

    //Require auth
    auth.getUser().then(function(response) {}, function(err) {
        $location.path('/login');
    });

    //Create a question
    $scope.createQuestion = function() {
        questionCRUDService.createQuestion({
            title: $scope.title,
            content: $scope.content,
            tags: $scope.tags
        }).success(function(response) {
            $location.path('/questions');
        }).error(function(err) {
            $scope.error = 'Please, filll all bla bla and try again!';
        });
    }
}]);
