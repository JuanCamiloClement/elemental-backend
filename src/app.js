require('dotenv').config();
const express = require('express');
const configExpress = require('./config/express.js');
const connect = require('./config/database.js');
const routes = require('./routes.js');

const app = express();
connect();

// Setup Express:
configExpress(app);

// Setup routes:
routes(app);

module.exports = app;