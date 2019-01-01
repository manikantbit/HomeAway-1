// Add dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var index = require('./route/index');

var app = express();

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

var Sequelize = require('sequelize');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

// create database, ensure 'sequelize' in your package.json
const sequelize = new Sequelize('homeaway', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  });
    
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
  
  var myStore = new SequelizeStore({
      db: sequelize
  })
  
  //myStore.sync();
  app.use(session({
          name : 'homeaway',
          secret: "098878755854467997",
          resave: true,
          store:myStore,
          saveUninitialized: true
  }));
      
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(cookieParser());
  
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', index);
  
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('URL Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;

