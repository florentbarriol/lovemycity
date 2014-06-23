'use strict';

/**
    TODO:
    - bootstrap alert si une erreur survient à l'envoi du message
    - date affiché en anglais
    - modération des messages
    - possiblité de twitté le message
    - Récupèrer l'image profil Twitter avec le nom d'utilisateur Twitter
    - Poster le message sur un compte twitter spéciale.
    - Remplir avec du vrai texte
    - Penser à un autre nom - logo
**/

/* Controllers */

var loveMyCityControllers = angular.module('loveMyCityControllers', ['ui.bootstrap']);

// Controller Home page
// Home page, display cities
loveMyCityControllers.controller('LoveMyCitySearchCtrl', ['$scope', 'Server', '$location',
    function ($scope, Server, $location) {
        $scope.cities = [];
        Server.getCities().success(function (data) {
            $scope.cities = data;
        });

        // Add class 'active' to right menu link
        $scope.isActive = function (route) {
            return route === $location.path();
        };
}]);

//Controller City Message Page
// Display message from the selected city
loveMyCityControllers.controller('LoveMyCityDisplayCtrl', ['$scope', '$http', '$routeParams', '$anchorScroll', '$location', 'Server',
    function ($scope, $http, $routeParams, $anchorScroll, $location, Server) {

        $scope.isCollapsed = true;

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


        // Add class 'active' to right menu link
        $scope.isActive = function (route) {
            return route === $location.path();
        }

        $scope.messages = [];
        $scope.messages_displayed = [];
        $scope.items_per_page = 5;
        $scope.nb_messages_displayed = 0;
        $scope.nb_total_messages = 0;
        // Filter order message
        $scope.order_message = "-message_date";

        // Get the messages 
        Server.getMessages($routeParams.cityId).success(function (data) {
            $scope.messages = data;
            $scope.nb_total_messages = $scope.messages.length;
            $scope.moreMsg();
        });

        // Add more messages to display
        $scope.moreMsg = function () {
            var i = $scope.nb_messages_displayed;
            var j = 0;
            while (i < $scope.nb_total_messages && j < $scope.items_per_page) {
                $scope.messages_displayed.push($scope.messages[i]);
                i++;
                j++;
            }
            $scope.nb_messages_displayed = $scope.messages_displayed.length;

        };
        // Return true if there more message to display
        $scope.isMoreMsg = function () {
            if ($scope.nb_messages_displayed == $scope.nb_total_messages) {
                return true;
            } else {
                return false;
            }
        };

        // Post function, post message
        $scope.alerts = [];
        $scope.error = "";
        $scope.addMessage = function (msg) {
            Server.addMessage(msg.message_text, $routeParams.cityId, msg.message_author, msg.message_author_twitter)
                .success(function (data) {
                    $scope.messages_displayed.unshift(data);
                    $scope.alerts.push({
                        type: 'success',
                        msg: "Message ajouté."
                    });
                    $scope.nb_total_messages = $scope.messages_displayed.length;
                })
                .error(function (data) {
                    $scope.alerts.push({
                        type: 'danger',
                        msg: "Erreur lors de l'ajout du message. Veuillez réessayer plus tard ou nous contacter."
                    });
                });
            $scope.msg = "";
        };

        $scope.city_id = "";
        $scope.city_name = "";
        $scope.city_text = "";
        $scope.city_picture = "";

        // Get the selected city
        Server.getCity($routeParams.cityId).success(function (data) {
            $scope.city_id = data[0].id;
            $scope.city_name = data[0].city_name;
            $scope.city_text = data[0].city_text;
            $scope.city_picture = data[0].city_picture;
        });

        // Go to the top of page
        $scope.goTop = function () {
            $location.hash("header");
            $anchorScroll();
        };

}]);

// Controller About Page
loveMyCityControllers.controller('LoveMyCityAboutCtrl', ['$scope', 'Server', '$location',
function ($scope, Server, $location) {

        // Add class 'active' to right menu link
        $scope.isActive = function (route) {
            return route === $location.path();
        }
        //Twitter.fetchAccessToken($scope);





}]);

// Controller Contact Page
loveMyCityControllers.controller('LoveMyCityContactCtrl', ['$scope', 'Server', '$location',
function ($scope, Server, $location) {

        // Add class 'active' to right menu link
        $scope.isActive = function (route) {
            return route === $location.path();
        }

}]);