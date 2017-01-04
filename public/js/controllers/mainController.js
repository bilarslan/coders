var mainController = angular.module('mainController', []);

mainController.controller('navController', ['$scope', '$rootScope', 'auth', function ($scope, $rootScope, auth) {

    $scope.isLoggedIn = false;
    $scope.username = '';

    $rootScope.$on('$routeChangeStart', function () {
        auth.getUser().then(function (response) {
            $scope.isLoggedIn = true;
            auth.userName(response.data.username);
            $scope.username = response.data.username;
            //console.log($scope.username);
        })
    });

    $scope.signOut = function () {
        $scope.isLoggedIn = false;
        auth.signOut();
    }
}]);

mainController.controller('homepageController', ['$scope', '$http', '$sce', 'questionCRUDService', 'auth', function ($scope, $http, $sce, questionCRUDService, auth) {

    $scope.questions = [];
    $scope.playlists = [];
    $scope.users = [];

    questionCRUDService.getQuestion().success(function (response) {
        //console.log(response);
        response.forEach(function (question) {
            var voteCount = 0;
            question.questionRates.forEach(function (rating) {
                if (rating.rate != 0) {
                    voteCount++;
                }
            });
            question.voteCount = voteCount;
            question.answerCount = question.answers.length;
        });
        $scope.questions = response;
    }).error(function (err) {
        console.log(err);
    }).then(function () {

        $http.get('/auth/all')
            .success(function (res) {
                $scope.users = res;
            })
            .error(function (err) {
                console.log(err)
            });

    }).then(function () {

        $http.get('/video')
            .success(function (res) {
                console.log(res);
                $scope.playlists = res;
            })
            .error(function (err) {
                console.log(err);
            });

    });



}]);