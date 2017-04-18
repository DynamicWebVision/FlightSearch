/**
 * Created by Brian on 6/15/15.
 */
app.service('UtilityService', function($http, $q) {

    var service = {};

    //Weekdays
    service.week_days = [];
    service.week_days[1] = 'Sunday';
    service.week_days[2] = 'Monday';
    service.week_days[3] = 'Tuesday';
    service.week_days[4] = 'Wednesday';
    service.week_days[5] = 'Thursday';
    service.week_days[6] = 'Friday';
    service.week_days[7] = 'Saturday';

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
    service.findIndexByKeyValue = function(arraytosearch, key, valuetosearch) {

        for (var i = 0; i < arraytosearch.length; i++) {

            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    }

    service.sortArrayByPropertyAlpha = function (array , propertyName) {
        return array.sort(function(a, b){
            var nameA=a[propertyName].toLowerCase(), nameB=b[propertyName].toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        });
    }

    service.convertEmptyJsonArrayToObject = function(object) {
        if (Array.isArray(object)) {
            if (object.length == 0) {
                return {};
            }
        }
        return {};
    }

    service.formatPhone = function(phone_no) {
        return phone_no.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    service.shortenText = function(val, length) {
        if (!val){
            return "";
        }
        else if (val.length > 22) {
            return val.substring(val, length)+"...";
        }
        else {
            return val;
        }
    }

    service.shortenTextBackend = function(val) {
        if (!val){
            return "";
        }
        else if (val.length > 22) {
            return "~..."+val.substr(val.length - 22);
        }
        else {
            return val;
        }
    }

    service.positiveNegativeClass = function(number) {
        if (number > 0) {
            return "positive-green";
        }
        else if (number < 0) {
            return "negative-green";
        }
        else {
            return "";
        }
    }

    return service;
});


