planningPHPTourApp.filter('langueFilter', [function () {
    return function (confs, selectedLang) {
        if (selectedLang != null) {
            var resutl = [];
            
            angular.forEach(confs, function (conf) {
                if (conf.lang == selectedLang) {
                    resutl.push(conf);
                };
            });

            //this.highlightSessions(resutl);

            return resutl;
        } 

        //this.highlightSessions(null);

        return confs;
    };
}]);