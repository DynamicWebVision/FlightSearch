/**
 * Created by Brian on 6/15/15.
 */
app.service('UtilityService', function($http, $q) {

    var service = {};

    service.getAllUsers = function() {
        var csrfToken  = $http.get('/crfToken');
        csrfToken.then(function(response){
            return response;
        });
        return csrfToken;
    }

    service.sessionCheck = function() {
        var csrfToken  = $http.get('/sessionCheck');
        csrfToken.then(function(response){
            if (response == 0) {
                window.location="/";
            }
        });
    }

    service.sessionCheck = function() {
        var csrfToken  = $http.get('/sessionCheck');
        csrfToken.then(function(response){
            if (response == 0) {
                window.location="/";
            }
        });
    }
    service.functiontofindIndexByKeyValue = function(arraytosearch, key, valuetosearch) {

        for (var i = 0; i < arraytosearch.length; i++) {

            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    }

    return service;
});
