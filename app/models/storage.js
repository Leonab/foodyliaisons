var mongoose = require('mongoose');

module.exports = mongoose.model('Storage', {
	text : {type : String, default: ''},
	name : String
});
/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model creation

var LocationModel = function() {
  var LocationSchema = new Schema({
    name: String,
    loc: {
      type: [Number],   // format will be [ <longitude> , <latitude> ]
      index: '2d'       // create the geospatial index
    }
  });


  // register the mongoose model
  mongoose.model('Storage', LocationSchema);
};

// create an export function to encapsulate the model creation
module.exports = LocationModel;
*/