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

     // $scope.eventShow = function(event) {
     //    console.log('click even show');
     //    Event.get({ id: event._id }, function(event) {
     //      $scope.event = event;
     //      console.log('event is; ', $scope.event);
     //      $location.path('/events/' + event._id);
     //    });
     //  };



}])
.controller('EventListCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', '$location', '$window', function(Event, Auth, $scope, $http, $timeout, $location, $window) {
  console.log('EventListCtrl active');
  $scope.currentUser = Auth.currentUser();
  //Get events
      $scope.events = Event.query();
      console.log("events are: ", $scope.events);

      //  go back button
      // $scope.backButton = function() {
      //    $window.history.back();
      // };


      //click listener to redirect to events:id page
       $scope.eventShow = function(event) {
        console.log('click event show');
        Event.get({ id: event._id }, function(event) {
          $scope.event = event;
          console.log('event is; ', $scope.event);
          $location.path('/events/' + event._id);
        });
      };
}])

.controller('EventShowCtrl', ['Event', 'Auth', '$scope', '$http', '$timeout', '$location', '$routeParams', '$window', function(Event, Auth, $scope, $http, $timeout, $location, $routeParams, $window) {
  console.log('EventShowCtrl active');

  $scope.currentUser = Auth.currentUser();

  //Get event
  $scope.event = Event.get({ id: $routeParams.id });
  console.log("event is: ", $scope.event);

     //go back button
      $scope.backButton = function() {
         $window.history.back();
      };


    //show edit event form when create event button is clicked
      $scope.EventEdit = false;
      $scope.editEventButton = function() {
        
          $scope.EventEdit = true;

        console.log('Event edit button clicked');
        console.log('$scope.editEventForm is: ', $scope.EventEdit);
      };
      //Update Event
      $scope.updateEvent = function(event) {
        console.log('event in form function is:', event);
        console.log( $routeParams.id);
        Event.update({ id: $routeParams.id }, event, function() {
          console.log('event is: ', event);
          $scope.event = event;
          $scope.event.$update(function(event) {
            console.log('scope.event.update worked');
          });
            $location.path('/events/' + event._id);
        });
      };
      //Delete Event
      $scope.deleteEvent = function(event) {
        Event.delete( { id: $routeParams.id}, function(event) { 
          $location.path('/events/' + event._id);
        });
      };

      //add Rsvp
      $scope.addRsvp = function(event) {
        console.log(event);
        var rsvp = {user:$scope.currentUser, event:event};
        $http.post( '/api/rsvps', rsvp, function (data) {
          console.log(data);
        });
      };

      $scope.rsvpShow = function(event) {
        console.log('click event show');
        Rsvp.get({ id: event._id }, function(rsvp) {
          $scope.rsvp = rsvp;
          console.log('rsvp is; ', $scope.rsvp);
          $location.path('/events/' + event._id);
        });
      };
}]);






// $scope.event = {};
//       $scope.newEvent = function() {
//       console.log('scope.event is ', $scope.event);
//       $scope.event.owner = $scope.currentUser;
//       var event = new Event($scope.event);
//       event.$save(function(data) {
//         $scope.events.unshift(data);
//         $scope.event = {};
//         $scope.createEventForm = false;
//         console.log('after save createEventForm is: ', $scope.createEventForm);

//       });
//     };












