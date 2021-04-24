var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('./lbi/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//middleware de ficheros estaticos
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas del API
 */
app.use('/api/nodepop', require('./routes/api/nodepop'));
app.use('/api/tag', require('./routes/api/tag'));

app.use('/',      require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  //es un error de validacion
  if(err.array){
    const errorInfo = err.array({onlyFirstError: true})[0];
    err.message = `Not valid -${errorInfo.param}  ${errorInfo.msg}`;
    res.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({error: err.message})
    return
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
