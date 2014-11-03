'use strict';
angular.module('twitterapp')

.controller('home',function( $scope, $rootScope ){
    
    console.log('home');
    $rootScope.selectedLink = 'feed';

    $scope.change = function(param){
        $rootScope.selectedLink = param;
    };

});
