var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model creation

var UserModel = function() {
  var UserSchema = new Schema({
    name: String,
	address: String,
	email: String,
	phone: Number,
    perishable: Boolean,
	pick: Boolean,
    date: { type: Date, default: Date.now }
  });


  // register the mongoose model
  mongoose.model('User', UserSchema);
};

// create an export function to encapsulate the model creation
module.exports = UserModel;