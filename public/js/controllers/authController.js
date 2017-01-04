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

authController.controller('profileController', ['$scope', '$routeParams', 'authUserProfile', 'auth', function($scope, $routeParams, authUserProfile, auth) {

    var name = $routeParams.username.toString();

    var username = auth.userName();

    auth.getUser().then(function(response) {
        if (name == username) {
            $scope.isLoggedIn = true;
        }
    }, function(err) {});

    $scope.user = {};
    $scope.questions = [];
    $scope.answers = [];

    authUserProfile.getUser(name).success(function(response) {
            console.log(response);
            response.createdAt = new Date(response.createdAt).toLocaleString();
            response.answers.forEach(function(item){
              var div = document.createElement("div");
              div.innerHTML = item.content;
              item.content = div.innerText;
            });
            $scope.user = response;
        })
        .error(function(err) {
            console.log(err);
        });

    $scope.uploadFile = function() {
        var file = $scope.myFile;
        if (file.size > 500000) {
            console.log('500KB den buyuk');
        }

        var fd = new FormData();
        fd.append('file', $scope.myFile);

      authUserProfile.updateProfilePic(fd).success(function(response){
          $scope.user.imgUrl = response.imgUrl;
      });


    }

}]);

authController.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
