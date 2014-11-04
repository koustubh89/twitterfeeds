angular.module("twitterapp", [ "ngRoute" ]).config([ "$routeProvider", function($routeProvider) {
    "use strict";
    $routeProvider.when("/feeds", {
        templateUrl: "views/feed.html",
        controller: "myfeeds"
    }).when("/custserv", {
        templateUrl: "views/hash.html",
        controller: "hashtags"
    }).otherwise({
        redirectTo: "/feeds"
    });
} ]);

"use strict";

angular.module("twitterapp").controller("home", function($scope, $rootScope) {
    console.log("home");
    if (window.location.href.split("#")[1] == "/feeds") {
        $rootScope.selectedLink = "feed";
    } else {
        $rootScope.selectedLink = "hash";
    }
    $scope.change = function(param) {
        $rootScope.selectedLink = param;
    };
    $scope.location = window.location.href;
    $scope.location = $scope.location.split("/#/")[0];
});

"use strict";

angular.module("twitterapp").controller("myfeeds", function($scope, $route) {
    console.log("hi");
    $scope.feeds = function(d, s, id) {
        console.log("fired feeds");
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? "http" : "https";
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    };
    $scope.feeds(document, "script", "twitter-wjs");
});

"use strict";

angular.module("twitterapp").controller("hashtags", function($scope, $route) {
    console.log("hashtags");
    $scope.hash = function(d, s, id) {
        console.log("fired hash");
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? "http" : "https";
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    };
    $scope.hash(document, "script", "twitter-wjs");
});