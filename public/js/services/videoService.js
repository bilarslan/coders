var videoService = angular.module('videoService', []);

videoService.factory('videoCRUDService', ['$http', '$q','$sce', function($http, $q,$sce) {

    var videoCRUDFactory = {};

    videoCRUDFactory.getVideos = function(){
        return $http.get('/video');
    }

    videoCRUDFactory.createPlayList = function(fd){
        return $http.post('/video/create', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    }

    return videoCRUDFactory;

  }]);
