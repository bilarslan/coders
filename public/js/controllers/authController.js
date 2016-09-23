var authController = angular.module('authController', [])

authController.controller('signInController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    $scope.username = '';
    $scope.password = '';
    $scope.signIn = function() {
        console.log($scope.username + ' ' + $scope.password);
        auth.signIn($scope.username, $scope.password).success(function(response) {
            $location.path('/');
        }).error(function(error) {
            console.log(error);
        });
    }
}]);

authController.controller('signUpController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    $scope.name = '';
    $scope.username = '';
    $scope.email = '';
    $scope.password = '';

    $scope.signUp = function() {
        console.log($scope.name + ' ' + $scope.username + ' ' + $scope.email + ' ' + $scope.password);
    }
}]);
