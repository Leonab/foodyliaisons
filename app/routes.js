var mongoose = require('mongoose'),
    location = require('./models/location')();
var Location = mongoose.model('Location');
var Storage = require('./models/storage');

function getLocation(res){
	Location.find(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				return res.send(err);
			console.log(err);
            console.log(docs);
			return res.json(docs); // return all todos in JSON format
		});
};

module.exports = function(app) {
	
app.get('/api/locations', function(req, res) {

        // use mongoose to get all todos in the database
        getLocation(res);
    });
	
	
app.post('/api/locations/', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Location.create({
            text : req.body.text,
            done : false
        }, function(err, locations) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getLocation(res);
        });

    });

	
app.delete('/api/locations/:location_id', function(req, res) {
        Location.remove({
            _id : req.params.location_id
        }, function(err, locations) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getLocation(res);
        });
    });

app.get('/api/query', function(req, res, next){
    
    var limit = req.query.limit || 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = req.query.distance || 8;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude || 77.22336;
    coords[1] = req.query.latitude || 28.6375771;	
	console.log(req.query.latitude);
	console.log(req.query.longitude);

        Location.find({     // find a location
        loc: {
        $near: coords,
        $maxDistance: maxDistance
        }
        }).limit(limit).exec(function(err, locations) {
        if (err) {
        return res.send(500, err);
        }
        //var texts=JSON.stringify(locations);
       return res.json(200, locations);
    });
		
   });
   
 app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
};
   