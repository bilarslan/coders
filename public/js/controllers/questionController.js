var questionController = angular.module('questionController', ['ngRoute']);

questionController.controller('questionsController', ['$scope', '$sce', 'questionCRUDService', 'auth', function($scope, $sce, questionCRUDService, auth) {

    $scope.questions = [];
    var username = auth.userName();
    //Get all questions
    questionCRUDService.getQuestion().success(function(response) {
        console.log(response);
        response.forEach(function(question) {
            var voteCount = 0;
            question.questionRates.forEach(function(rating) {
                if (rating.rate != 0) {
                    voteCount++;
                }
            });
            question.content = $sce.trustAsHtml(question.content);
            question.voteCount = voteCount;
            question.answerCount = question.answers.length;
            question.tags = question.tags.split(', ');
            question.createdAt = new Date(question.createdAt).toLocaleString();
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

questionController.controller('questionAnswersController', ['$scope', '$routeParams', '$location', '$sce', 'auth', 'questionCRUDService', function($scope, $routeParams, $location, $sce, auth, questionCRUDService) {

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

    questionCRUDService.getQuestion(id).success(function(response) {
        questionCRUDService.setModals(response, username).then(function(data) {
            data.tags = data.tags.split(', ');
            data.createdAt = new Date(data.createdAt).toLocaleString();
            data.answers.forEach(function(item){

              item.createdAt = new Date(item.createdAt).toLocaleString();
            });
            $scope.question = data;
        });
    });

    //Answer the question
    $scope.answerQuestion = function() {
        questionCRUDService.createAnswer($scope.answer).success(function(response) {

            //Load the page again and set the modals
            questionCRUDService.getQuestion(id).success(function(response) {
                questionCRUDService.setModals(response, username).then(function(data) {
                    $scope.answer = {
                        questionId: id,
                        content: ''
                    };
                    data.tags = data.tags.split(', ');
                    $scope.question = data;
                });
            });

            //Close answer creation dialog.
            $('#modal-answer').modal("hide");

        }).error(function(err) {
            $scope.error = 'Please, try again!';
        });
    }

    $scope.like = function(id) {
        var questions = [];
        questions.push($scope.question);
        questionCRUDService.like(id, questions);
    }

    $scope.dislike = function(id) {
        var questions = [];
        questions.push($scope.question);
        questionCRUDService.dislike(id, questions);
    }

    $scope.likeAnswer = function(id) {
        questionCRUDService.likeAnswer(id).success(function(response) {
            for (var i = 0; i < $scope.question.answers.length; i++) {
                var answer = $scope.question.answers[i];
                if (answer.id == id) {
                    answer.likeDislike += response.message;
                    if (response.message < 0) {
                        answer.rateLike = false;
                        answer.rateDislike = false;
                    } else {
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

    $scope.dislikeAnswer = function(id) {
        questionCRUDService.dislikeAnswer(id).success(function(response) {
            for (var i = 0; i < $scope.question.answers.length; i++) {
                var answer = $scope.question.answers[i];
                if (answer.id == id) {
                    answer.likeDislike += response.message;
                    if (response.message < 0) {
                        answer.rateDislike = true;
                        answer.rateLike = false;
                    } else {
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
            $scope.error = 'Please, try again!';
        });
    }
}]);

questionController.directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });

            function updateModel() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            }

            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            if (ngModel.$viewValue) {
                ngModel.$render = function(value) {
                    ck.setData(ngModel.$viewValue);
                };
            }
        }
    };
});
