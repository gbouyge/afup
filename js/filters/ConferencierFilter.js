angular.module('planningPHPTourApp.filters', []).filter('myconferencierFilter', [function () {
    return function (conferenciers, selectedConferencier) {
        console.log('coucou');
        // if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
        //     var tempClients = [];
        //     angular.forEach(selectedCompany, function (id) {
        //         angular.forEach(clients, function (client) {
        //             if (angular.equals(client.company.id, id)) {
        //                 tempClients.push(client);
        //             }
        //         });
        //     });
        //     return tempClients;
        // } else {
        //     return clients;
        // }
    };
}]);