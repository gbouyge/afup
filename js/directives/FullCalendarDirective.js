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
                slotEventOverlap: false,
                h: 2500,
                timeFormat: 'H:mm',
                columnFormat: {
                    week: 'dddd dd MMMM'
                },
                axisFormat: 'HH:mm',
                dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Thu','Ven','Sam'],
                monthNames : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                eventClick: function(event, jsEvent, view) {
                    location.hash = "#" + event.id;
                    angular.element(".profile").removeClass('calendarSelect');
                    angular.element("#" + event.id).parent().addClass('calendarSelect');
                },
                eventRender: function(event, element) {
                },
                viewDisplay: function(calendarView) {
                    calendarView.setHeight(9999);
                }
            };

            var makeEvent = function(conf) {
                var newEvent = new Object();

                newEvent.id = conf.id;
                newEvent.className = 'defaultEvent';
                newEvent.title = conf.name;
                newEvent.start = $.fullCalendar.parseDate(conf.date_start);
                newEvent.end = $.fullCalendar.parseDate(conf.date_end);
                newEvent.allDay = false;
                newEvent.eventBorderColor = 'black';

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