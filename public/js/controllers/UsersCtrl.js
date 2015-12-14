'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('ProfileCtrl', ['Event', '$scope', '$http', '$auth', 'Auth', function(Event, $scope, $http, $auth, Auth) {
  	console.log('profile ctrl');
    $http.get('/api/me').then(function(data) {
      $scope.user = data.data;
    });

    $scope.myEvents = Event.myEvents();
    
  }]);