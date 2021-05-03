var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuthMiddleware');
const loginController = require('./controllers/loginController');
const MongoStore = require('connect-mongo')

var app = express();

require('./lib/connectMongoose');

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
app.post('/api/loginJWT',   loginController.postJWT);
app.use('/api/nodepop', require('./routes/api/nodepop'));
// Setup de i18n
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);

/**
 * Middleware de Gestion de sesiones del website
 */
app.use(session({
  name: 'nodeapi-session',
  secret: 'dsa987ad9/)H(/G()/9sa7d98',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV !== 'development', // solo se envian al servidor cuando la petici�n es HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 d�as de inactividad
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTION_STR})
}));
// app.use((req, res, next) => {
//   // sacar la cookie nodeapi-session de la petici�n
//   // coger el sessionID
//   // buscar en el almac�n de sesiones una sesi�n con sessionID que pone en la cookie
//   // si encuentro la session la pon en req.session
// })

// hacemos disponible la sesion en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})
app.use('/api/tag', require('./routes/api/tag'));

app.use('/',       require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login',         loginController.index);
app.post('/login',        loginController.post);
app.get('/logout',        loginController.logout);

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
    err.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
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
