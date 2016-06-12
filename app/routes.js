var mongoose = require('mongoose'),
    location = require('./models/location')(),
	user = require('./models/user')();
var Location = mongoose.model('Location');
var User = mongoose.model('User');
var sms = require('../public/js/send_sms');
var core = require('../public/js/send_mail');


function getLocation(res){
	Location.find(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				return res.send(err);
			
            console.log(docs);
			return res.json(docs); // return all locations in JSON format
		});
};

//finds the last entry in the database
function getUser(res){
	User.findOne().sort({created_at: -1}).exec(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				return res.send(err);
			
            console.log(docs);
			return res.json(docs); // return all locations in JSON format
		});
};

module.exports = function(app) {
	
app.get('/api/locations', function(req, res) {

        // use mongoose to get all locations in the database
        getLocation(res);
    });
	
	
app.get('/api/lastuser', function(req, res) {

        // use mongoose to get all locations in the database
        getUser(res);
    });
	
	
app.post('/api/locations/', function(req, res) {

        // create, information comes from AJAX request from Angular
        Location.create({
            text : req.body.text,
            done : false
        }, function(err, locations) {
            if (err)
                res.send(err);

            // get and return all the locations after you create another
            getLocation(res);
        });

    });
	
app.post('/api/users', function(req, res) {

		
		var name = req.body.name,
			address = req.body.address,
			email= req.body.email,
			phone= req.body.phone,
			perishable= req.body.perishable || true,
			pick= req.body.pick || false;
		
		var user = new User({name : name, address : address, email: email, phone: phone, perishable: perishable, pick: pick});
		// create, information comes from AJAX request from Angular
		user.save(function(err) {
            if (err)
                res.send(err);
            

        });

    });

	
app.delete('/api/locations/:location_id', function(req, res) {
        Location.remove({
            _id : req.params.location_id
        }, function(err, locations) {
            if (err)
                res.send(err);

            // get and return all the locations after you create another
            getLocation(res);
        });
    });

app.get('/api/query', function(req, res, next){
    
    var limit = 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = 500;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;	
	console.log(req.query.latitude);
	console.log(req.query.longitude);

        Location.find({     // find a location
        loc: {
        $near: coords,
        $maxDistance: maxDistance
        }
        }).exec(function(err, locations) {
        if (err) {
        return res.send(500, err);
        }
       return res.json(200, locations);
    });
		
   });
   
   
   //===================================
   
   app.post('/contact-form',function(req, res){
	   core.sendMail(req, res);
   });
   
   app.post('/SMS',function(req,res){
	   sms.call(req,res);
   });
   
   
   
   
 app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
};
   