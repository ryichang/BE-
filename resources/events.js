
var Event = require('../models/event.js')
	, User = require('../models/user.js')
  , auth = require('./auth')

module.exports = function(app) {
	app.post('/api/events', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var event = new Event(req.body);
			event.save(function(err, event) {
				user.events.unshift(event._id);
				user.save();
				res.send(event);				
			});
		});
	});
};
