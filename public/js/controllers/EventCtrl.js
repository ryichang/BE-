'use strict';

/* Event Controllers */

angular.module('basic-auth')
  .controller('NewEventCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', function(Event, Auth, $scope, $http, $timeout) {
  		console.log('NewEventCtrl active');
      //for entering date
      $scope.dateTimeNow = function() {
        $scope.date = new Date();
      };
      $scope.dateTimeNow();

      $scope.minDate = Date.now();

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
      $scope.newEventForm = false;
      $scope.createEventButton = function() {
        
          $scope.newEventForm = true;
          
     
        console.log('create event button clicked');
        console.log('$scope.newEventForm is: ', $scope.newEventForm);
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
      console.log("events are: ", $scope.events);

      $scope.eventShow = function(event) {
        Event.get({ id: event._id }, function(event) {
          $scope.event = event;
          console.log('event is; ', $scope.event);
          $location.path('/events/' + event._id);
        });
      };
}])

.controller('EventShowCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', '$location', '$routeParams', function(Event, Auth, $scope, $http, $timeout, $location, $routeParams) {
  console.log('EventShowCtrl active');

  $scope.currentUser = Auth.currentUser();

  //Get event
  $scope.event = Event.get({ id: $routeParams.id });
  console.log("event is: ", $scope.event);
  
}]);



















