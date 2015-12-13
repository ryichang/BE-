'use strict';

// Declare app level module which depends on filters, and services
angular.module('basic-auth', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'google.places'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ProfileCtrl'
      });

      $routeProvider.when('/settings', {
        templateUrl: 'templates/settings',
        controller: 'SettingsCtrl'
      });

      $routeProvider.when('/events', {
        templateUrl: 'templates/event-index',
        controller: 'EventListCtrl'
      });

      // $routeProvider.when('createEvent', {
      //   templateUrl: 'templates/newEventForm',
      //   controller: 'NewEventCtrl'
      // });

      $routeProvider.when('/events/:id', {
        templateUrl: 'templates/event-show',
        controller: 'EventShowCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);
