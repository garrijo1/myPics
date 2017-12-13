var express = require('express'),
    router = express.Router();

module.exports = function (app, config) {
    app.use('/api', router);
    
}