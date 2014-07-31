/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/test';

var express = require('express');
var mongoose = require('mongoose');
var restifier = require('restifier');
var config = require('./config/environment');

// Connect to db
mongoose.connect(process.env.MONGOHQ_URL);

var Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  completed: Boolean
}));

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

// Restifier stuff
app.use('/api', restifier());
app.use('/api', restifier(Todo).middleware());

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(function(req, res) {
    res.status(404).send('Not found');
  });

app.route('/*')
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });

// Expose app
exports = module.exports = app;
