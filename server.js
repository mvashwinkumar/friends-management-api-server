var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

var serverUtils = require('./utils/serverUtils');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var port = serverUtils.normalizePort(3000);
app.set('port', port);

var server = http.createServer(app);
server.listen(port, function () {
    console.log('started API server on port ' + port)
});