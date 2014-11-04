'use strict';
angular.module('twitterapp')

.controller('hashtags',function( $scope, $route){
    console.log('hashtags');
    //$route.reload();
    $scope.hash = function(d,s,id){
        console.log('fired hash');
        var js,
        fjs=d.getElementsByTagName(s)[0],
        p=/^http:/.test(d.location)?'http':'https';

        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src=p+"://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);
        }
    }//(document,"script","twitter-wjs");

    $scope.hash(document,"script","twitter-wjs");
});
