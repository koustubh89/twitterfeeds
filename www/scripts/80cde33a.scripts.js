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
    $rootScope.selectedLink = "feed";
    $scope.change = function(param) {
        $rootScope.selectedLink = param;
    };
});

"use strict";

angular.module("twitterapp").controller("myfeeds", function($scope) {
    console.log("hi");
    !function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? "http" : "https";
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
});

"use strict";

angular.module("twitterapp").controller("hashtags", function($scope) {
    console.log("hashtags");
    !function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? "http" : "https";
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
});