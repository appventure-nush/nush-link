"use strict";
var express = require('express');
var app = express();
var port = 8080; // default port to listen
// define a route handler for the default home page
app.get('/', function (req, res) {
    res.send('Hello world!');
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
