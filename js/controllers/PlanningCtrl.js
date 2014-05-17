planningPHPTourApp.controller('planningCtrl', ['$scope','$http', function($scope, $http) {
 	$scope.title = "PHP Tour Planning"

  	$http.get('data/data.json').success(function(data) {
  		$scope.confs = data;
	});
  


}]);