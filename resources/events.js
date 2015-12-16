
var Event = require('../models/event.js'),
	User = require('../models/user.js'),
	Rsvp = require('../models/rsvp.js'),
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

	//UPDATE
	app.put('/api/events/:id', function(req,res){
		console.log('hitting api/events/:id path');
		Event.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, function (err, event) {
			console.log(event);
			if (err) {return res.send(err); }
			res.send(event);
		});
	});

	 //DELETE
	  app.delete('/api/events/:id', function(req,res) {
	    Event.findById({ _id: req.params.id}).remove().exec();
	    res.sendStatus(200);
	  });

	  app.get('/api/rsvps', function(req, res){
		// INDEX - GET ALL RSVPS
		Rsvp.find().sort('-created_at').exec(function(err,rsvps) {
			if (err) { return res.status(404).send(err); }
			res.send(rsvps);
		});
	});
	  // CREATE RSVP
	  app.post('/api/rsvps', function (req,res) {

		Rsvp.create(req.body, function(err, rsvp){
        console.log('req.body.owner is: ', req.body );
      console.log("event created is: ", rsvp);
      if (err) { return res.send(err); }
      	console.log(rsvp.isConfirmed);
      	rsvp.isConfirmed = req.body.isConfirmed;
        rsvp.user = req.body.user;
        rsvp.event = req.body.event;
        console.log('after push event is: ', rsvp);
      res.status(201).send(rsvp);
	   });
	});
};
