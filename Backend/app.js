var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require("cors"); // Moved up
var logger = require('morgan');

const db = require('./database/db'); 
const indexRouter = require('./routes/index'); 
const eventRoutes = require("./routes/eventRoutes"); 

var app = express();

// --- 1. CORE CORS GUARD HOOK (Must be first to prevent browser blocks) ---
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// --- 2. STANDARD EXPRESS MIDDLEWARE ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- 3. API ROUTE ROUTERS ---
app.use('/api', indexRouter);         
app.use('/api/events', eventRoutes);   

// --- 4. EXCEPTION HANDLING GATEWAYS ---
app.use(function(req, res, next) {
  res.status(404).json({ message: `Route ${req.originalUrl} not found on this operational node.` });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message || "Internal network system error occurred.",
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;