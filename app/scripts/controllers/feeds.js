'use strict';
angular.module('twitterapp')

.controller('myfeeds',function( $scope, $route ){
   // $route.reload();
    console.log('hi');
    $scope.feeds = function(d,s,id){
        console.log('fired feeds');
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

    $scope.feeds(document,"script","twitter-wjs");
});
