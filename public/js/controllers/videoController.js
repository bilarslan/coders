var videoController = angular.module('videoController', ['ngRoute']);

videoController.controller('videosController', ['$scope', 'videoCRUDService', 'auth', function($scope, videoCRUDService, auth) {

    $scope.videos = [];
    //Get all videos from server
    videoCRUDService.getVideos()
        .success(function(res) {
          console.log(res);
            $scope.videos = res;
        })
        .error(function(err) {
            console.log(err);
        });


    $scope.title = '';
    $scope.description = '';
    $scope.error = '';
    $scope.createPlayList = function() {
        //console.log($scope.title + ' ' + $scope.description);
        //console.log($scope.myFile);

        var file = $scope.myFile;
        if (file.size > 500000) {
            console.log('500KB den buyuk');
            $scope.error = 'File size is not bigger than 500KB'
            return;
        }

        var fd = new FormData();
        fd.append('file', $scope.myFile);
        fd.append('title', $scope.title);
        fd.append('description', $scope.description);

        videoCRUDService.createPlayList(fd)
            .success(function(res) {
                $scope.videos.push(res);
                 $('#modal-answer').modal("hide");
            })
            .error(function(err) {
                 $scope.error = err;
            });

    }

}]);


//videoController.controller('',[]);


videoController.directive('fileModel', ['$parse', function($parse) {
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
