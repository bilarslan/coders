var contactController = angular.module('contactController', []);

contactController.controller('createContactController', ['$scope', '$http','$location', function($scope, $http,$location) {
$scope.contact = {
  cname:'',
  cemail:'',
  cmessage:''
}
$scope.createContact= function () {

$http.post('/contact/new',$scope.contact).success(function (response) {
  console.log(response);
  $location.path('contact-success')
}).error(function(err){

});

}
}]);
