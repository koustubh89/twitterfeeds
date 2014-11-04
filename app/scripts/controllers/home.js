'use strict';
angular.module('twitterapp')

.controller('home',function( $scope, $rootScope){
    
    console.log('home', window.location.href.split('#'));
    if(window.location.href.split('#')[1] =='/custserv'){
    	$rootScope.selectedLink = 'hash';
    }
    else{
		$rootScope.selectedLink = 'feed';
	}

    $scope.change = function(param){
        $rootScope.selectedLink = param;
    };

    $scope.location = window.location.href;
    $scope.location = $scope.location.split('/#/')[0];
});
