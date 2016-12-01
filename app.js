var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routesIndex = require('./routes/index');
var routesAlumno = require('./routes/alumno');
var routesProfesor = require('./routes/profesor');
var routesAsignatura = require('./routes/asignatura');
var routesMatricula = require('./routes/matricula.js');
var users = require('./routes/users');
var app = express();
var db = require('./model/db.js');
var alumnos = require("./model/alumno.js");
var profesores = require("./model/profesor.js");
var asignaturas = require("./model/asignatura.js");
var matriculas = require("./model/matricula.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', routesIndex);
app.use('/', routesAlumno);
app.use('/', routesProfesor);
app.use('/', routesAsignatura);
app.use('/', routesMatricula);
app.use('/users', users);

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