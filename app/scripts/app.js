angular.module('twitterapp',['ngRoute']).config(['$routeProvider',function($routeProvider){
    'use strict';
    $routeProvider
      .when('/feeds',{
	    templateUrl: 'views/feed.html',
	    controller:  'myfeeds'
	  }).when('/custserv',{
	    templateUrl: 'views/hash.html',
	    controller:  'hashtags'
	  })
	  .otherwise({
	    redirectTo:'/feeds'
	  });
  }]);
