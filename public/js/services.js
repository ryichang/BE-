
'use strict';

/* Services */

angular.module('basic-auth.services', [])

  .factory('Auth', ['$auth', function ($auth) {
    return {
      currentUser: function() {
        var user = $auth.getPayload();

        var currentUser = {
          _id: user.sub,
          // email: user.email,
          // picture: user.picture,
          username: user.username
        };
        return currentUser;
      }
    };
  }])

  // .factory('Event', function ($window, $resource) {
  //   return $resource($window.location.origin + '/api/events/:id', { id: '@id' }, {
  //     update: { method: 'PUT'} 
  //   });
  // });


  .factory('Event', function($resource, $window) {
  return $resource('/api/events/:id', { id: '@_id'}, {
    myEvents: {
      method: 'GET', url: '/api/my-events', isArray: true
    },
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
})

  .factory('Rsvp', function($resource, $window) {
  return $resource('/api/events/:event_id/rsvps/:rsvp_id', { event_id: '@_id', rsvp_id: '@_id' }, {
    // myEvents: {
    //   method: 'GET', url: '/api/rsvps', isArray: true
    // },
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
  
  
});