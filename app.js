var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utils = require('./lib/utils')
const session = require('express-session')
const LoginController = require('./controllers/loginController')
const jwtAuth = require('./lib/jwtAuthMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//conexion base de datos
require('./lib/connectMongoose')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();

/**
 * Rutas de mi Api
 */
app.use('/api/anuncios', require ('./routes/api/anuncios'));
app.post('/api/login', loginController.postJWT)

// setup i18n para la internacionalización
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);
// Setup de sesiones del Website
app.use(session({
  name: 'nodeapi-session',
  secret: 'CzXM~FU:B&43x[=5',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 día de inactividad
  }

}))

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/privado', require('./routes/privado'))
app.use('/users', usersRouter);
app.use('/change-locale', require ('./routes/change-locale'))
app.get('/login', loginController.index)
app.post('/login', loginController.post)
app.get('/logout', loginController.logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
