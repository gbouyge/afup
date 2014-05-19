planningPHPTourApp.controller('planningCtrl', ['$scope','$http', function($scope, $http) {
 	//Titre de la page
 	$scope.title = "PHP Tour 2014 : Sessions";

    //Titre des vues
    $scope.viewTitle = {"session":"Sessions", "calendar":"Agenda", "split":"Split View"}

    //Vue courante
    $scope.moduleState = 'session';

	//Liste des filtres
	$scope.filters = {"languages":"lang","salles":"salle"};

	//Chargement des conférences
  	$http.get('data/data.json').success(function(data) {
  		$scope.confs = data;
		var conf_attr_name = "";

		//Initialisation des filtres
		for(var filtername in $scope.filters){
			$scope[filtername] = [];
		}

		//Remplissage des filtres
		angular.forEach($scope.confs, function(conf, key){
			for(var filtername in $scope.filters){
				conf_attr_name = $scope.filters[filtername];
				if (!inArray(conf[conf_attr_name],$scope[filtername])) {
					$scope[filtername].push(conf[conf_attr_name]);
				}
			}
		});
	});

    $scope.buildAfupUrl = function(id, type) {
        var base = 'http://afup.org/pages/phptourlyon2014/conferenciers.php#'
        var suffixe = '';
        if (type == 'img') {
            base = 'http://afup.org/templates/phptourlyon2014/images/intervenants/';
            suffixe = '.jpg';
        }

        if (id != '') {
            return base + id + suffixe;
        } else {
            return '';
        }
    };

    $scope.changeModuleState = function(e, moduleState)
    {
        $scope.moduleState = moduleState;
        angular.element( '.nav .active' ).removeClass('active');
        var li = angular.element(e.target).parent('li');
        li.addClass('active');

        $scope.title = "PHP Tour 2014 :  " + $scope.viewTitle[moduleState];
    };
}]);


function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}