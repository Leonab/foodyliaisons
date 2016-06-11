'use strict';
 
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
 
/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(req, res) {
 
    var data = req.body;
 
    transporter.sendMail({
        from: data.contactEmail,
        to: 'leonabrocks@yahoo.com',
        subject: 'Message from ' + data.contactName,
        text: data.contactMsg
    });
 
    res.json(data);
};