var videoController = angular.module('videoController', ['ngRoute']);

videoController.controller('videosController', ['$scope', 'videoCRUDService', 'auth', function ($scope, videoCRUDService, auth) {

    $scope.videos = [];
    var username = auth.userName();

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
                res.user = {
                    id: res.userId,
                    username: username
                };
                $scope.videos.push(res);
                $('#modal-answer').modal("hide");
            })
            .error(function (err) {
                $scope.error = err;
            });

    }

}]);


videoController.controller('videoController', ['$scope', '$http', '$sce', '$routeParams', '$location', 'videoCRUDService', 'auth', function ($scope, $http, $sce, $routeParams, $location, videoCRUDService, auth) {

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
                    $scope.selectedVideo.videoComments.forEach(function(data){
                        data.createdAt = new Date(data.createdAt).toLocaleString();
                    });
                    console.log($scope.selectedVideo);
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

        })
        .error(function (err) {
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
                $('#modal-answer').modal("hide");
                $scope.progress = false;
                $scope.playlist.videos.push(res);
                //var url = '/videoplaylist/' + res.playlistId +'/'+ res.id;
                //$location.path(url);
            })
            .error(function (err) {
                console.log(err);
                $scope.error = err.error;
            });
    }

    $scope.content = '';
    $scope.cError = '';
    $scope.newComment = function () {
        $http.post('/video/comment/' + $scope.selectedVideo.id, {
                content: $scope.content
            })
            .success(function (res) {
                //console.log(res);
                    $scope.content = '';
                res.createdAt = new Date(res.createdAt).toLocaleString();
                res.user = {};
                res.user.username =  auth.userName();
                $scope.selectedVideo.videoComments.push(res);
            })
            .error(function (err) {
                $scope.cError = err;
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