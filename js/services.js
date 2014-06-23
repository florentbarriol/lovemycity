'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var loveMyCityServices = angular.module('loveMyCityServices', ['ngResource']).
value('version', '0.1');

// Communication with the back-end - PHP - get messages from DB
loveMyCityServices.factory('Server', function ($http) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    return {
        getMessages: function (cityId) {
            return $http.get("php/server.php?action=getMessages&cityId=" + cityId + "");
        },
        addMessage: function (message_text, city_id, message_author, message_author_twitter) {
            return $http.post("php/server.php", "action=addMessage&message_text=" + message_text + "&message_author=" + message_author + "&message_author_twitter="+ message_author_twitter + "&city_id=" + city_id);
        },
        getCities: function () {
            return $http.get("php/server.php?action=getCities");
        },
        getCity: function (cityId) {
            return $http.get("php/server.php?action=getCity&cityId=" + cityId + "");
        }
    };

});

/*
loveMyCityServices.factory('TwitterConnect', function ($http) {
    var factory = {};
    var baseUrl = 'https://api.twitter.com/';

    var bearerToken = function () {
        var consumerKey = encodeURIComponent('SKO1j8x9cE36dZuhHDKbHUu4n');
        var consumerSecret = encodeURIComponent('uOKdXsFdRfGfLXH1tleIVQHJqoypbvRuY0ja5vTP1bPR3YexAE');
        var tokenCredentials = btoa(consumerKey + ':' + consumerSecret);

        return tokenCredentials;
    };

    factory.fetchAccessToken = function (scope) {
        var oAuthurl = baseUrl + "oauth2/token";
        var headers = {
            'Authorization': 'Basic ' + bearerToken(),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        $http({
            method: 'POST',
            url: oAuthurl,
            headers: headers,
            data: 'grant_type=client_credentials'
        }).
        success(function (data, status) {
            scope.status = status;
            scope.data = data;
        }).
        error(function (data, status) {
            scope.status = status;
            scope.data = data || "Request failed";
        });
    };

    factory.fetchTimeLine = function (scope) {
        scope.fetchAccessToken();
        //the rest
    };
    return factory;
});
*/
loveMyCityServices.factory('Base64', function(){
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
});

loveMyCityServices.factory('Twitter', function ($http) {
    var factory = {};
    var baseUrl = 'https://api.twitter.com/';
    var bearerToken = function(){
        var consumerKey = encodeURIComponent('SKO1j8x9cE36dZuhHDKbHUu4n');
        var consumerSecret = encodeURIComponent('uOKdXsFdRfGfLXH1tleIVQHJqoypbvRuY0ja5vTP1bPR3YexAE');
        var tokenCredentials = btoa(consumerKey + ':' + consumerSecret);

        return tokenCredentials;
    };
    

    factory.fetchAccessToken = function(scope){
        var oAuthurl = baseUrl + "oauth2/token";
        var headers = {
                'Authorization': 'Basic ' + bearerToken(),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'grant_type': 'client_credentials'
            };
        console.log(headers);
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        $http({method: 'POST', url: oAuthurl, headers: headers, data: 'grant_type=client_credentials'}).
            success(function(data, status){
                scope.status = status;
                scope.data = data;
            }).
            error(function(data, status){
                scope.status = status;
                scope.data = data || "Request failed";
            });
    };

    factory.fetchTimeLine = function(scope){
        scope.fetchAccessToken();
        //the rest
    };
    return factory;
});
