var videoController = angular.module('videoController', ['ngRoute']);

videoController.controller('videosController', ['$scope', 'videoCRUDService', 'auth', function ($scope, videoCRUDService, auth) {

    $scope.videos = [];
    //Get all videos from server
    videoCRUDService.getVideos()
        .success(function (res) {
            console.log(res);
            $scope.videos = res;
        })
        .error(function (err) {
            console.log(err);
        });


    $scope.title = '';
    $scope.description = '';
    $scope.error = '';
    $scope.createPlayList = function () {
        //console.log($scope.title + ' ' + $scope.description);
        //console.log($scope.myFile);

        var file = $scope.myFile;
        if (file.size > 512000) {
            console.log('500KB den buyuk');
            $scope.error = 'File size is not bigger than 500KB'
            return;
        }

        var fd = new FormData();
        fd.append('file', $scope.myFile);
        fd.append('title', $scope.title);
        fd.append('description', $scope.description);

        videoCRUDService.createPlayList(fd)
            .success(function (res) {
                $scope.videos.push(res);
                $('#modal-answer').modal("hide");
            })
            .error(function (err) {
                $scope.error = err;
            });

    }

}]);


videoController.controller('videoController', ['$scope', '$http', '$sce', '$routeParams', 'videoCRUDService', 'auth', function ($scope, $http, $sce, $routeParams, videoCRUDService, auth) {

    var id = $routeParams.id;
    var vid = $routeParams.vid;

    var username = auth.userName();
    $scope.playlist = {};
    //$scope.selectedVideo = {};

    $http.get('/video/' + id)
        .success(function (res) {
            $scope.playlist = res;

            if (!vid) {
                vid = res.videos[0].id;
            }

            for (var i = 0; i < res.videos.length; i++) {
                var video = res.videos[i];
                if (video.id == vid) {

                    $scope.selectedVideo = video;

                    var src = $sce.trustAsResourceUrl(video.videoUrl);
                    var myvideo = document.getElementById('my-video');

                    videojs(myvideo, {
                        'poster': $scope.playlist.imgUrl
                    }, function () {
                        this.src([{
                            type: 'video/mp4',
                            src: src
                        }]);
                    });

                    break;
                }
            }

            if (!$scope.selectedVideo) {
                console.log('video not found!');
            }

            console.log($scope.playlist);
        })
        .error(function (err) {
            console.log(err);
            $scope.error = err.error;
        }).then(function () {
            var name = $scope.playlist.user.username;
            auth.getUser().then(function (response) {
                if (name == username) {
                    $scope.isLoggedIn = true;
                }
            }, function (err) {});
        });


    $scope.title = '';
    $scope.description = '';
    $scope.error = '';
    $scope.progress = false;

    $scope.uploadVideo = function () {

        console.log($scope.title)
        console.log($scope.description)
        console.log($scope.myFile)

        var file = $scope.myFile;
        if (file.size > 1073741824) {
            console.log('1GB den buyuk');
            $scope.error = 'File size is not bigger than 1GB'
            return;
        }

        var fd = new FormData();
        fd.append('file', $scope.myFile);
        fd.append('title', $scope.title);
        fd.append('description', $scope.description);
        fd.append('playlist', id);

        $scope.progress = true;

        $http.post('/video/v/create', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (res) {
                console.log(res);
                $('#modal-answer').modal("hide");
                $scope.progress = false;
                $scope.playlist.videos.push(res);
            })
            .error(function (err) {
                console.log(err);
                $scope.error = err.error;
            });
    }
}]);


videoController.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);