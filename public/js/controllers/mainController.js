var mainController = angular.module('mainController', []);

mainController.controller('navController', ['$scope', '$rootScope', 'auth', function($scope, $rootScope, auth) {

    $scope.loggedIn = false;
    $scope.username = '';

    $rootScope.$on('$routeChangeStart', function() {
        auth.getUser().then(function(response) {
            $scope.loggedIn = true;
            $scope.username = response.data.username;
            //console.log($scope.username);
        })
    });

    $scope.signOut = function() {
        $scope.loggedIn = false;
        auth.signOut();
    }
}]);
