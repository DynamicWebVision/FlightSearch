(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserPreferenceController', UserPreferenceController);

    function UserPreferenceController($timeout, UtilityService, $http) {
        var vm = this;

        vm.travelPreferences = [];
        vm.airports = [];

        vm.tradeStats = {};
        vm.oandaAccounts = [];

        vm.airportFilter = '';

        vm.userTravelPreferences = {};
        vm.userTravelPreferences.airports = [];

        vm.filterAirports = filterAirports;
        vm.addAirport = addAirport;
        vm.removeAirport = removeAirport;
        vm.updateFlightPreferences = updateFlightPreferences;

        load();

        function load() {
            $http.get('/user_preferences').then(function(response) {
                vm.travelPreferences = response.data.travelPreferences;
                vm.airports = response.data.airports;
                console.log(response.data);
            });
        }

        function filterAirports(airport) {

                if (vm.airportFilter.length < 3) {
                    return false;
                }
                var regexAirportSearch = new RegExp( vm.airportFilter.toUpperCase(), 'g' );

                if (airport.airport_name.toUpperCase().match(regexAirportSearch) || airport.city.toUpperCase().match(regexAirportSearch) || airport.country.toUpperCase().match(regexAirportSearch)) {
                    return true;
                }
                else {
                    return false;
                }
        }

        function addAirport(airport) {
            vm.userTravelPreferences.airports.push(airport);
            removeAirportSearchList(airport.id)
        }

        function removeAirport(airport) {
            vm.airports.push(airport);
            removeAirportSelected(airport.id)
        }

        function removeAirportSearchList(id) {
            var i = 0;
            while (i < vm.airports.length) {
                if (vm.airports[i].id == id) {
                    vm.airports.splice(i, 1);
                }
                i++;
            }


        }

        function removeAirportSelected(id) {
            var i = 0;
            while (i < vm.airports.length) {
                if (vm.userTravelPreferences.airports[i].id == id) {
                    vm.userTravelPreferences.airports.splice(i, 1);
                }
                i++;
            }
        }

        function updateFlightPreferences() {
            $http.post('/user_preferences', vm.userTravelPreferences).then(function(response) {
                console.log(response);
            });
        }

    }
})();