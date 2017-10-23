var express = require('express');
var config = require('./config/config');
var app = express();

//var port = process.env.port || 3000

require('./config/express')(app, config);

require('http').createServer(app).listen(config.port, function () {
    console.log('info',"HTTP Server listening on port: %s, in %s mode", config.port, app.get('env'));
});

module.exports=app;