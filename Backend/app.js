var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const db = require('./database/db');
const eventRoutes = require("./routes/eventRoutes");
const indexRouter = require('./routes/index');
const cors = require("cors");
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Setup allowing frontend pipeline access
app.use(cors());

// Mount point matching front-end fetch structures exactly:
app.use('/api', indexRouter);         // Fixes /api/registrations
app.use('/api/events', eventRoutes);   // Fixes /api/events

module.exports = app;
