var express = require('express');
var app = express();
var mongoose = require('mongoose');
var async = require('async');
//var Location = require('./app/models/location')();
//var storage = require('./app/models/storage')();
//var location = mongoose.model('Location');
//var Storage = mongoose.model('Storage');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var methodOverride = require('method-override');

mongoose.connect('  mongodb://leonab:password@ds039674.mlab.com:39674/foody'), function(err) {
  if (err) throw err;
/*
 // load data from file and transform it to Object
  var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data1.json'), 'utf8'));

 // clean db and load new data
  Location.remove(function() {
    async.each(data, function(item, callback) {
      // create a new location
      Location.create(item, callback);
    }, function(err) {
      if (err) throw err;
    });
  });
  
   Storage.remove(function() {
    async.each(data, function(item, callback) {
      // create a new location
      Storage.create(item, callback);
    }, function(err) {
      if (err) throw err;
    });
  });*/

};

var port= process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(methodOverride('X-HTTP-Method-Override'))


require('./app/routes.js')(app);


app.listen(port, function() {
  console.log("App listening on port 3000");
});   