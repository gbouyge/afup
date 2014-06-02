planningPHPTourApp.controller('planningCtrl', ['$scope','$http', '$rootScope', 'fullCalendarService',function($scope, $http, $rootScope, fullCalendarService) {
 	//Titre de la page
 	$scope.title = "PHP Tour Lyon 2014";

    //Configuration de la vue
    $scope.hideSession = false;
    $scope.changeViewIconLeft = 'glyphicon-arrow-left';
    $scope.changeViewIconRight = 'glyphicon-arrow-right';
    $scope.fullSizeCalendarClass = 'col-md-12';
    $scope.normalSizeCalendarClass = 'col-md-7';
    $scope.hiddenClass = 'hidden';

    //Conf selectionnées
    $scope.selectedConf = [];

    $scope.events = [];

	//Chargement des conférences
  	$http.get('data/data.json').success(function(data) {
  		//Save Data
        $scope.confs = data;

        //Mave Event
        $scope.events = fullCalendarService.getEventList($scope.confs);

		//Initialisation du filtre conférencier
        $scope.conferenciers = [];

		//Remplissage du filtre conférencier
        angular.forEach($scope.confs, function(conf, key){
            var conferenciers = conf['conferenciers'];
            for(var key in conferenciers){
                $scope['conferenciers'].push(conferenciers[key]);
            }
        });
	});

    $scope.toggleSession = function(conf){        
        var addClass = 'savedEvent';

        if(conf.id in $scope.selectedConf) {
            var conflitId = $scope.checkConflict(conf);
            if (conflitId) {
                var conflitedConf = $scope.selectedConf[conflitId];
                fullCalendarService.changeClassEvent(conflitedConf.id, 'savedEvent');
            }

            delete($scope.selectedConf[conf.id]);
            addClass = 'defaultEvent';
        } else {
            if($scope.checkConflict(conf)) {
                addClass = 'conflictEvent';        
            }

            $scope.selectedConf[conf.id] = conf;
        }

        fullCalendarService.changeClassEvent(conf.id, addClass);
    };

    $scope.checkConflict = function(newConf){
        var overlap   = false;
        var id        = newConf.id;
        var dateStart = newConf.date_start;
        var dateEnd   = newConf.date_end;
        
        angular.forEach($scope.selectedConf, function(conf, key){
            if ((id != conf.id) && $scope.checkDatesRangeOverlap(dateStart,dateEnd,conf.date_start,conf.date_end)) {
                overlap = conf.id;
            }
        });

        return overlap;
    }

    $scope.top = function() {
        if(angular.element('body')[0].offsetWidth <= 992) {
            location.hash = "#title";
        } else {
            location.hash = "#search";
        }
    }

    $scope.changeView = function() {
        $scope.$watch('hideSession', function() {
            $scope.refreshView();
        });
        $scope.hideSession  = !$scope.hideSession;      
    }

    $scope.refreshView = function() {
        fullCalendarService.rerenderCalendar();
    }

    $scope.print = function() {
        w = $('#calendar').css('width');

        // Préparation du calendrier pour l'impression
        $('#calendar').css('width', '6.5in');
        $('.fc-header').hide(); 
        $('#calendar').fullCalendar('render');

        window.print();

        // Remise à zéro de la CSS
        window.setTimeout(function() {
        $('.fc-header').show();
        $('#calendar').css('width', w);
        $('#calendar').fullCalendar('render');
        }, 1000);
    }

    //A supprimer
    $scope.dumpSelectedConf = function(){
        console.log('selectedConf');
        angular.forEach($scope.selectedConf, function(conf,key) {
            console.log(key);
            console.log(conf);
        });
    };

    $scope.checkDatesRangeOverlap = function(startA,endA,startB,endB) {
        return (new Date(startA).getTime() < new Date(endB).getTime()) && (new Date(endA).getTime() > new Date(startB).getTime());
    }

}]);