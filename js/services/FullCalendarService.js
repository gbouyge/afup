planningPHPTourApp.service('fullCalendarService', function(){
    this.changeClassEvent = function(id, className){
        var calendar = angular.element('#calendar');
        var confEvent = calendar.fullCalendar('clientEvents', id)[0];
        confEvent.className = className;
        calendar.fullCalendar('updateEvent', confEvent);
    };
});