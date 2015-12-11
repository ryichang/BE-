'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('ProfileCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').then(function(data) {
      $scope.user = data.data;


   $scope.createEvent = function() {
   		$http.post('/api/events', $scope.event)
   			.success(function(response) {
   				$scope.user.events.unshift(response);
   				$scope.event = {};
   			})
   			.error(function(response) {
   				console.log(response);
   			});
   };
    });
  }]);