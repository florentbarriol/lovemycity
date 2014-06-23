'use strict';


// Declare app level module which depends on filters, and services
angular.module('loveMyCityApp', [
  'ngRoute',
  'loveMyCityFilters',
  'loveMyCityServices',
  'loveMyCityDirectives',
  'loveMyCityControllers',
  'loveMyCityAnimations'
]).
config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/partial-main.html',
            controller: 'LoveMyCitySearchCtrl'
        });
        $routeProvider.when('/city/:cityId', {
            templateUrl: 'partials/partial-messages.html',
            controller: 'LoveMyCityDisplayCtrl'
        });
        $routeProvider.when('/apropos', {
            templateUrl: 'partials/partial-about.html',
            controller: 'LoveMyCityAboutCtrl'
        });
        $routeProvider.when('/contact', {
            templateUrl: 'partials/partial-contact.html',
            controller: 'LoveMyCityContactCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
});