planningPHPTourApp.service('fullCalendarService', function(){
    this.changeClassEvent = function(id, className){
        var calendar = angular.element('#calendar');
        var confEvent = calendar.fullCalendar('clientEvents', id)[0];
        var currentClass = confEvent.className;
        confEvent.className = className;
        
        if (currentClass.lastIndexOf("filtredEvent") != -1) {
            confEvent.className += " filtredEvent";
        }

        calendar.fullCalendar('updateEvent', confEvent);
    };

    this.rerenderCalendar = function(){
        var calendar = angular.element('#calendar');
        calendar.fullCalendar( 'render' );
    };

    this.filtredEvent = function(id, isFiltred) {
        var calendar = angular.element('#calendar');
        var confEvent = calendar.fullCalendar('clientEvents', id)[0];

        if(confEvent != undefined) {
            if(typeof confEvent.className !== 'string') {
                confEvent.className = '';
            }

            if (isFiltred) {
                confEvent.className += " filtredEvent";
            } else {
                confEvent.className = confEvent.className.replace(" filtredEvent", ""); 
            }

            calendar.fullCalendar('updateEvent', confEvent);
        }
    }
});