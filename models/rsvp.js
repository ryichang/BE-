/*
 * RSVP MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RsvpSchema = Schema({
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date },
    comment: { type: String, trim: true },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isConfirmed: { type:Boolean, default: false}
});

// MIDDLEWARE
RsvpSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// export rsvp model
var Rsvp = mongoose.model('Rsvp', RsvpSchema);

module.exports = Rsvp;
