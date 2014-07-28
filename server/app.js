/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://localhost/test';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to db
mongoose.connect(process.env.MONGOGQ_URL);

var Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  status: Boolean
}));

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Restifier stuff
app.use('/api', restifier());
app.use('/api', restifier(Todo).middleware());

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
