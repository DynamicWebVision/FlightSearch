/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ngRoute','utility.directives']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "template/transactions.html",
            controller : "TransactionController",
            controllerAs: 'transaction'
        })
        .when("/flight_preferences", {
            templateUrl : "template/user_prefrences.html",
            controller : "UserPreferenceController",
            controllerAs: 'up'
        })
});
