
var Event = require('../models/event.js'),
	User = require('../models/user.js'),
	qs = require('querystring'), 
    auth = require('./auth'),
    request = require('request'),
    config = require('../config.js'),
    moment = require('moment');


module.exports = function(app) {

	app.get('/api/events', function(req, res){
		// INDEX - GET ALL EVENTS
		Event.find().sort('-created_at').exec(function(err,events) {
			if (err) { return res.status(404).send(err); }
			res.send(events);
		});
	});

	//get events owned by current user
	app.get('/api/my-events', auth.ensureAuthenticated, function(req, res){
		Event.find({owner: req.userId}).sort('-created_at').exec(function(err, events) {
			if (err) { return res.status(404).send(err); }
			res.send(events);
		});
	});

	//get event by id
	app.get('/api/events/:id', function(req, res){
		Event.findById(req.params.id, function(err, event) {
			if (err) { return res.status(404).send(err); }
			console.log("event is: ", event);
			res.send(event);
		});
	});

	// CREATE EVENT
	app.post('/api/events', function (req,res) {
		Event.create(req.body, function(err, event){
        console.log('req.body.owner is: ', req.body.owner );
      console.log("event created is: ", event);
      if (err) { return res.send(err); }
        event.owner.push(req.body.event);
        console.log('after push event is: ', event);
      res.status(201).send(event);
	   });
	});
};
