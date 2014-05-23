planningPHPTourApp.controller('planningCtrl', ['$scope','$http', '$rootScope', 'fullCalendarService',function($scope, $http, $rootScope, fullCalendarService) {
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
        var addClass = 'savedEvent';

        if(conf.id in $scope.selectedConf) {
            var conflitId = $scope.checkConflict(conf);
            if (conflitId) {
                var conflitedConf = $scope.selectedConf[conflitId];
                fullCalendarService.changeClassEvent(conflitedConf.id, 'savedEvent');
            }

            delete($scope.selectedConf[conf.id]);
            addClass = '';
            toggleButton(angular.element($event.target), 'add');
        } else {
            if($scope.checkConflict(conf)) {
                addClass = 'conflictEvent';        
            }

            $scope.selectedConf[conf.id] = conf;
            toggleButton(angular.element($event.target), 'remove');
        }

        fullCalendarService.changeClassEvent(conf.id, addClass);
    };

    $scope.checkConflict = function(newConf){
        var overlap   = false;
        var id        = newConf.id;
        var dateStart = newConf.date_start;
        var dateEnd   = newConf.date_end;
        
        angular.forEach($scope.selectedConf, function(conf, key){
            if ((id != conf.id) && checkDatesRangeOverlap(dateStart,dateEnd,conf.date_start,conf.date_end)) {
                overlap = conf.id;
            }
        });

        return overlap;
    }

    //A supprimer
    $scope.dumpSelectedConf = function(){
        console.log('selectedConf');
        angular.forEach($scope.selectedConf, function(conf,key) {
            console.log(key);
            console.log(conf);
        });
    };

}]);

//A voir si on les intègre au ctrl
function toggleButton(el, state)
{
    var addClass = 'btn-primary';
    var removeClass = 'btn-danger';
    var text = 'Je participe !';

    if(state != 'add') {
        var tmpClass = addClass;
        addClass = removeClass;
        removeClass = tmpClass;
        text = 'Je ne participe plus.';
    }

    el.removeClass(removeClass)
    el.addClass(addClass)
    el.html(text);
}

function checkDatesRangeOverlap(startA,endA,startB,endB) {
    return (new Date(startA).getTime() <= new Date(endB).getTime()) && (new Date(endA).getTime() >= new Date(startB).getTime());
}