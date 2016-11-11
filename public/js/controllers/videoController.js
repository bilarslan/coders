var videoController = angular.module('videoController', ['ngRoute']);

videoController.controller('videosController', ['$scope', 'videoCRUDService', 'auth', function($scope, videoCRUDService, auth) {
    console.log('hello from videos controller');
}]);
