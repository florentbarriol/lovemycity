'use strict';

/* Filters */

var loveMyCityFilters = angular.module('loveMyCityFilters', []);

loveMyCityFilters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);

loveMyCityFilters.filter('cityFilter', function() {
  return function(input, cityFocus) {
    if(input === cityFocus){
        return "show";
    }else{
        return "hide";
    }
  };
});

loveMyCityFilters.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});
/*
loveMyCityFilters.filter('badDateToISO', function() {
  return function(badTime) {
    var goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
    return goodTime;
  };
});*/