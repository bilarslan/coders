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
        questionCRUDService.like(id, $scope.questions);
    }

    $scope.dislike = function(id) {
          questionCRUDService.dislike(id, $scope.questions);
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

   var username = auth.userName();

    auth.getUser().then(function(response) {
        $scope.isLoggedIn = true;
    }, function(err) {});

    //Get question and answers
    questionCRUDService.getQuestion(id).success(function(response) {
        var rateLike = false;
        var rateDislike = false;
        var likeDislike = 0;

        response.questionRates.forEach(function(rating) {
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
        response.likeDislike = likeDislike;
        response.rateLike = rateLike;
        response.rateDislike = rateDislike;

        response.answers.forEach(function(answer) {
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

    $scope.like = function(id){
      var questions = [];
      questions.push($scope.question);
      questionCRUDService.like(id, questions);
    }

    $scope.dislike = function(id){
      var questions = [];
      questions.push($scope.question);
      questionCRUDService.dislike(id, questions);
    }

    $scope.likeAnswer = function(id) {
        questionCRUDService.likeAnswer(id).success(function(response) {
        console.log(response);
            for (var i = 0; i < $scope.question.answers.length; i++) {
                var answer = $scope.question.answers[i];
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

    $scope.dislikeAnswer = function(id){
      questionCRUDService.dislikeAnswer(id).success(function(response) {
          for (var i = 0; i < $scope.question.answers.length; i++) {
              var answer = $scope.question.answers[i];
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
