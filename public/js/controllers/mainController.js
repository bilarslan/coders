var mainController = angular.module('mainController', []);

mainController.controller('navController', ['$scope', '$rootScope', 'auth', function($scope, $rootScope, auth) {

    $scope.isLoggedIn = false;
    $scope.username = '';

    $rootScope.$on('$routeChangeStart', function() {
        auth.getUser().then(function(response) {
            $scope.isLoggedIn = true;
            $scope.username = response.data.username;
            //console.log($scope.username);
        })
    });

    $scope.signOut = function() {
        $scope.isLoggedIn = false;
        auth.signOut();
    }
}]);
