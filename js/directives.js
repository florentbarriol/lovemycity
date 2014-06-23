'use strict';

/* Directives */


var loveMyCityDirectives = angular.module('loveMyCityDirectives', []);

loveMyCityDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}]);

loveMyCityDirectives.directive('menu', function(){
    
});
