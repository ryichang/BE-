'use strict';

/* Rsvp Controllers */

angular.module('basic-auth')
  .controller('RsvpCtrl', ['Rsvp', 'Auth', '$scope', '$http', '$timeout', function(Rsvp, Auth, $scope, $http, $timeout) {
  		console.log('RsvpCtrl active');



//Get rsvp
      $scope.rsvps = Rsvp.query();
      

      //find current user
      $scope.currentUser = Auth.currentUser();
      console.log('current user is: ', $scope.currentUser);

      //show new rsvp chat when create event button is clicked
      // $scope.RsvpShow = false;
      // $scope.rsvpShow = function() {
        
      //     $scope.RsvpShow = true;
          
     
      //   console.log('create rsvp button clicked');
      //   console.log('$scope.RsvpShow is: ', $scope.RsvpShow);
      // };
}]);