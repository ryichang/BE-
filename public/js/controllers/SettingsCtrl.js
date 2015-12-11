'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('SettingsCtrl', ['$scope', '$http', '$auth', 'Auth', '$location', function($scope, $http, $auth, Auth, $location) {
    $http.get('/api/me').then(function(data) {
      $scope.user = data.data;
    });

    $scope.updateUser = function() {
    	$http.put('/api/me', $scope.user ).then(function(data){
    		console.log(data);
    		$location.path('/profile');
    	});
    };
  }]);