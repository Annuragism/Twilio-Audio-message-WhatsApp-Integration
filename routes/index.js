const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const twilioClient = require('../lib/twilioClient');

module.exports = function(app) {
    // Set Pug as the default template engine
    app.set('view engine', 'pug');

    // Express static file middleware - serves up JS, CSS, and images from the
    // "public" directory where we started our webapp process
    app.use(express.static(path.join(process.cwd(), 'public')));

    // Parse incoming request bodies as form-encoded
    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Use morgan for HTTP request logging
    // “combined”: which gives you the Apache standard combined format for your logs.
    // “common”: referencing the Apache standard common format.
    // “dev”: A color-coded (by request status) log format.
    // “short”: Shorter than the default format, including just the few items you’d expect a request logline would have.
    // “tiny”: Even shorter, just the response time and a few extra item
    app.use(morgan('dev'));

// //Create a new named format
// morgan.token("custom", ":http-version (:method) :url => :status");
// //use the new format by name
// app.use(morgan('custom'))

//set up the logger to a file
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('dev',  {"stream": accessLogStream}));


    // Home Page with Click to Call
    app.get('/', function(request, response) {
      response.render('index');
    });

    // Handle an AJAX POST request to place an outbound call
    app.post('/call', function(request, response) {
      let phoneNumber = request.body.phoneNumber;
      let name = request.body.name
      let headersHost = 'http://' + request.headers.host;

      twilioClient.createCall(name, phoneNumber, headersHost)
        .then((result) => {
        console.log(name, phoneNumber, headersHost)
        response.send({message: result});
        })
        .catch((error) => {
        response.status(500).send(error);
        });
    });

    // Handle an AJAX POST request to place an outbound msg
    app.post('/msg', function(request, response) {
      let msgPhoneNumber = request.body.msgPhoneNumber;
      let msg = request.body.msg;
      let headersHost = 'http://' + request.headers.host;
      console.log(msgPhoneNumber, msg, headersHost);
      twilioClient.createMsg(msgPhoneNumber, msg, headersHost)
        .then((result) => {
        response.send({message: result});
        })
        .catch((error) => {
        response.status(500).send(error);
        });
    });

    // Handle an AJAX POST request to place an outbound msg
    app.post('/WAmsg', function(request, response) {
      let msgPhoneNumber = request.body.WAmsgPhoneNumber;
      let msg = request.body.WAmsg;
      let headersHost = 'http://' + request.headers.host;
      console.log(`This is WA msg`);
      twilioClient.whatsAppMsg(msgPhoneNumber, msg, headersHost)
        .then((result) => {
        response.send({message: result});
        })
        .catch((error) => {
        response.status(500).send(error);
        });
    });

    app.post('/WARply', function(request, response) {
      console.log(request);
    });






    // Return TwiML instructions for the outbound call
    app.post('/outbound/:salesNumber', function(request, response) {
      let result = twilioClient.voiceResponse(request.params.salesNumber);
      response.send(result);
    });
};
