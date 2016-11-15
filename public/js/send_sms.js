var plivo = require('plivo');

var p = plivo.RestAPI({
  authId: 'MAODA1ODVIMZHHZGE2NZ',
  authToken: 'NzE2MmRiNjk4NjcyYWI3MjVmNWFkZGY2OTRjNTM3'
});

exports.call = function(req, res){

var name = req.body.name;
var address = req.body.address;
var phone = req.body.phone;
var perishable = req.body.perishable;
var pick = req.body.pick;

var params = {
    'src': '14154847489', // Sender's phone number with country code
    'dst' : '+919650517916', // Receiver's phone Number with country code
    'text' : "Client \n"+"Name: "+name+"\nAddress: "+address+"\nPhone No.: "+phone+"\nPerishable: "+perishable+"\nPickup: "+pick, // Your SMS Text Message - English
    'url' : "http://foodyliaisons.herokuapp.com/response/", // The URL to which with the status of the message is sent
    'method' : "GET" // The method used to call the url
};

// Prints the complete response
p.send_message(params, function (status, response) {
    console.log('Status: ', status);
    console.log('API Response:\n', response);
});

res.send("Done");
};
