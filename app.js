'use strict';

var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');

var SESSION_NAME = process.env.SESSION_NAME;
var SESSION_SECRET = process.env.SESSION_SECRET;
var isDev = process.env.NODE_ENV === 'development';



//var routes = require('./routes/index');
var auth = require('./routes/auth');
var wall = require('./routes/wall');

var app = express();

var cookie = { domain: '',
               httpOnly: true,
               secure: false };

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: cookie,
  name: SESSION_NAME
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// give view access to moment library
app.locals.moment = moment;

app.locals.pretty = isDev;

app.use(function (req, res, next) {

  if (req.session.user) {
    app.locals.user = req.session.user;
  }

  next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*
app.use(
    sassMiddleware({
      src: __dirname + '/sass',
      dest: __dirname + '/public/stylesheets',
      prefix:  '/stylesheets',
      debug: true,
      indentedSyntax: false
    })
);
*/
app.use('/bower_components',express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/', auth);
app.use('/', wall);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
