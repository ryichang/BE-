
var Event = require('../models/event.js'),
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {

	app.get('/api/events', function(req, res){
		// INDEX - GET ALL EVENTS
		Event.find().sort('-created_at').exec(function(err,walks) {
			if (err) { return res.status(404).send(err); }
			res.send(events);
		});
	});


	// CREATE EVENT
	app.post('/api/events', auth.ensureAuthenticated, function (req,res) {
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
