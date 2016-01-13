'use strict';

// Declare app level module which depends on filters, and services
angular.module('basic-auth', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'google.places'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider, $authProvider) {

//       $authProvider.google({
//       clientId: '443314981286-hij2tse2619ppccl6ar7qom10jt3ci0p.apps.googleusercontent.com'
//       });

//       $authProvider.google({
//   url: '/auth/google',
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
//   redirectUri: window.location.origin,
//   requiredUrlParams: ['scope'],
//   optionalUrlParams: ['display'],
//   scope: ['profile', 'email'],
//   scopePrefix: 'openid',
//   scopeDelimiter: ' ',
//   display: 'popup',
//   type: '2.0',
//   popupOptions: { width: 452, height: 633 }
// });

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
        templateUrl: 'templates/EventIndex',
        controller: 'EventListCtrl'
      });

      // $routeProvider.when('createEvent', {
      //   templateUrl: 'templates/newEventForm',
      //   controller: 'NewEventCtrl'
      // });

      $routeProvider.when('/events/:id', {
        templateUrl: 'templates/Eventshow',
        controller: 'EventShowCtrl'
      });

      $routeProvider.when('/rsvps/:id', {
        templateUrl: 'templates/RsvpShow',
        controller: 'EventShowCtrl'
      });

      // $routeProvider.when('/events/:id/edit', {
      //   tempalteUrl: 'templates/EditEventForm',
      //   controller: 'EventEditCtrl'
      // });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);


