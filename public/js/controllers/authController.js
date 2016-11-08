var authController = angular.module('authController', [])

authController.controller('signInController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    $scope.username = '';
    $scope.password = '';
    $scope.error = '';

    $scope.signIn = function() {
        auth.signIn($scope.username, $scope.password).success(function(response) {
            $location.path('/');
        }).error(function(err) {
            $scope.error = err.error;
        });
    }
}]);

authController.controller('signUpController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    $scope.name = '';
    $scope.username = '';
    $scope.email = '';
    $scope.password = '';
    $scope.error = '';

    $scope.signUp = function() {
        auth.signUp($scope.name, $scope.username, $scope.email, $scope.password).success(function(response) {
            $location.path('/');
        }).error(function(err) {
            $scope.error = err.error;
        });
    }
}]);

authController.controller('profileController', ['$scope', '$routeParams', 'authUserProfile', function($scope, $routeParams, authUserProfile) {
    var username = $routeParams.username.toString();

    $scope.username = '';
    $scope.questions = [];
    $scope.answers = [];

    authUserProfile.getUser(username).success(function(response){
      console.log(response);
      $scope.username = username;
    })
    .error(function(err){
      console.log(err);
    });
}])
