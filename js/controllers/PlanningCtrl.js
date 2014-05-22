planningPHPTourApp.controller('planningCtrl', ['$scope','$http', function($scope, $http) {
 	//Titre de la page
 	$scope.title = "PHP Tour 2014 : Sessions";

    //Titre des vues
    $scope.viewTitle = {"session":"Sessions", "calendar":"Agenda", "split":"Split View"}

	//Liste des filtres
	$scope.filters = {"conferenciers":"conferenciers"};

    //Conf selectionnées
    $scope.selectedConf = [];

	//Chargement des conférences
  	$http.get('data/data.json').success(function(data) {
  		$scope.confs = data;
		var conf_attr_name = "";

		//Initialisation des filtres
		for(var filtername in $scope.filters){
			$scope[filtername] = [];
		}

		//Remplissage du filtre conférencier
        angular.forEach($scope.confs, function(conf, key){
            var conferenciers = conf['conferenciers'];
            for(var key in conferenciers){
                $scope['conferenciers'].push(conferenciers[key]);
            }
        });
	});

    $scope.toggleSession = function(conf, $event){
        
        $scope.selectedConf.push(conf);
        console.log($scope.selectedConf);
        var el = $event.target;        
        toggleButton(angular.element(el), 'add');


    }
}]);


function toggleButton(el, state)
{
    var addClass = 'btn-primary';
    var removeClass = 'btn-danger';
    var text = 'Je participe !';

    if(state == 'add') {
        var tmpClass = addClass;
        addClass = removeClass;
        removeClass = tmpClass;
        text = 'Je ne participe plus.';
    }

    el.removeClass(removeClass)
    el.addClass(addClass)
    el.html(text);
}