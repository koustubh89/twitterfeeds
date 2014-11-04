'use strict';
angular.module('twitterapp')

.controller('home',function( $scope, $rootScope, $route ){
    
    console.log('home');
    if(window.location.href.split('#')[1] =='/feeds'){
    	$rootScope.selectedLink = 'feed';
    }
    else{
		$rootScope.selectedLink = 'hash';
	}

    $scope.change = function(param){
        $rootScope.selectedLink = param;
        $route.reload();
    };

    $scope.location = window.location.href;
    $scope.location = $scope.location.split('/#/')[0];
});
