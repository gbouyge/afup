planningPHPTourApp.directive('fullcalendar', function() {
    return {
        restrict: 'E',
        template: '<div id="calendar"></div>',
        scope: { confs: '=confs' },
        link: function (scope, el, attrs) {
            var config = {
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                year: 2014,
                month: 5,
                date: 23,
                defaultView: "agendaWeek",
                weekends:false,
                hiddenDays: [ 3, 4, 5 ],
                editable: false,
                allDaySlot:false,
                slotMinutes:15,
                firstHour:9,
                minTime:9,
                maxTime:18,
                h: 2500,
                timeFormat: 'H(:mm)',
                columnFormat: {
                    week: 'dddd dd MMMM'
                },
                axisFormat: 'HH:mm',
                dayNames: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
                dayNamesShort: ['Lun','Mar','Mer','Jeu','Thu','Ven','Sam','Dim'],
                monthNames : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
            };

            var makeEvent = function(conf) {
                var newEvent = new Object();
                var eventDateStart = conf.date_start;
                var eventDateEnd = conf.date_end;

                newEvent.id = conf.id;
                newEvent.className = '';
                newEvent.title = conf.name;
                newEvent.start = new Date(eventDateStart);
                newEvent.end = new Date(eventDateEnd);
                newEvent.allDay = false;

                return newEvent;
            };

            angular.element('#calendar').fullCalendar(config);
            
            var calendarEvents = [];
            scope.$watch('confs', function(confs) {
                angular.forEach(confs, function(conf, key) {
                    calendarEvents.push(makeEvent(conf));
                }); 
                angular.element('#calendar').fullCalendar('addEventSource', calendarEvents ,'stick');               
            });
        }
    }
});