var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var services = require('./services/index');
var redisProperties = require('./config').redis;
var constant = require('./constant/Constant');
var loggerInfo = require('./logger/log');
var app = express();

// view engine setup
app.set('view options', {
  layout: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: redisProperties.secret_key,
  store: new RedisStore({
    host: redisProperties.host,
    port: redisProperties.port,
    disableTTL: true
  }),
  resave: true,
  saveUninitialized: true
})
);


//require('./AppFilters/PathFilter')(app);
require('./AppFilters/SessionFilter')(app);
//require('./services/trace/reqrestrace')(app);
//capture every request
app.use(function(req,res,next){         
  loggerInfo.reqReslog('info',req.url,req.method,req.headers,req.query,req.body);
  next();
});
require('./services/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
     //res.status(err.status || 500);  
    console.log(err);
    loggerInfo.errorLog('error',err,req.url,req.method,req.headers,req.query,req.body);
    return res.json( {
      statusCode: 0,
      message: "Server Error, Please Try Again!"
    });
  });
}

// stagging error handler
// will print stacktrace
if (app.get('env') === 'staging') {
  app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    return res.json({
      statusCode: 0,
      message: "Server Error, Please Try Again!"
    });
  });
}

if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    return res.json({
      statusCode: 0,
      message: ""
    });
  });
}

module.exports = app;
