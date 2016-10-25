var contactController = angular.module('contactController', []);

contactController.controller('createContactController', ['$scope', '$http', function($scope, $http) {
$scope.contact = {
  cname:'',
  cemail:'',
  cmessage:''
}
$scope.createContact= function () {

$http.post('/contact/new',$scope.contact).success(function (response) {
  console.log(response);
}).error(function(err){

});

}
}]);
