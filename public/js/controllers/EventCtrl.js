'use strict';

/* Event Controllers */

angular.module('basic-auth')
  .controller('NewEventCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', function(Event, Auth, $scope, $http, $timeout) {
  		console.log('NewEventCtrl active');
      //for entering date
      $scope.dateTimeNow = function() {
        $scope.date = new Date();
      };
      $

      //for entering location
      $scope.autocompleteOptions = {
          componentRestrictions: { country: 'usa' },
          types: ['geocode']
      };
      
      //Get events
      $scope.events = Event.query();
      
      


      //find current user
      $scope.currentUser = Auth.currentUser();
      console.log('current user is: ', $scope.currentUser);

      //show new event form when create event button is clicked
      $scope.createEventForm = false;
      $scope.createEventButton = function() {
        
          $scope.createEventForm = true;
          
     
        console.log('create event button clicked');
        console.log('$scope.createEventForm is: ', $scope.createEventForm);
      };

      //Create an event
      $scope.event = {};
      $scope.newEvent = function() {
      console.log('scope.event is ', $scope.event);
      $scope.event.owner = $scope.currentUser;
      var event = new Event($scope.event);
      event.$save(function(data) {
        $scope.events.unshift(data);
        $scope.event = {};
        $scope.createEventForm = false;
        console.log('after save createEventForm is: ', $scope.createEventForm);

      });
    };

      
  }])
.controller('EventListCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', function(Event, Auth, $scope, $http, $timeout) {
  console.log('EventListCtrl active');
  $scope.currentUser = Auth.currentUser();
  //Get events
      $scope.events = Event.query();
}]);

