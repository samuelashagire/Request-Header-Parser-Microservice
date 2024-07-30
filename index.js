// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  const ipAddress = req.ip;
  const fowardedIp = req.headers["x-forwarded-for"];
  //To get the correct ip, 'x-forwarded-for' must set when the request pass through an HTTP proxy or load balancer. For more infrmation https://www.rfc-editor.org/rfc/rfc7239#page-6
  console.log(JSON.stringify(req.headers));
  const acceptLanguage = req.headers['accept-language'];
  const userAgent = req.headers['user-agent'];
  res.send({ipaddress : ipAddress, language: acceptLanguage, software: userAgent, fowardedIp: fowardedIp});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});