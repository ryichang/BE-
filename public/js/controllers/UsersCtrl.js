'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('ProfileCtrl', ['Event', '$scope', '$http', '$auth', 'Auth', function(Event, $scope, $http, $auth, Auth) {
  	console.log('profile ctrl');
    $http.get('/api/me').then(function(data) {
      $scope.user = data;
    });

    $scope.myEvents = Event.myEvents();

    $scope.eventShow = function(event) {
    	Event.get({ id: event._id }, function(event) {
    		$scope.event = event;
    		console.log('event is: ', $scope.event);
    		$location.path('/events/' + event._id);
    	});
    };
    
  }]);