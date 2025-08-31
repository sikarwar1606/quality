var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session')
const flash = require('flash')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const customerRouter = require('./routes/customer');
const customerSchema = require('./routes/customerSC');
const batchSchema = require('./routes/batchSC');
const plantSchema = require('./routes/plantSC');
const designSchema = require('./routes/designDetailsSC');
const dimensionSchema = require('./routes/dimension');
// const genrateDimension = require('./routes/genrateDimension');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//////////////////////////////////////////////////////////////////
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "Hello"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
///////////////////////////////////////////////////////////////////
app.use(flash())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', customerRouter);
app.use('/customerSC', customerSchema);
app.use('/batchSC', batchSchema);
app.use('/designDetailsSC', designSchema);
app.use('/plantSC', plantSchema);
app.use('/dimensionSC', dimensionSchema);
// app.use('/genrateDimensionSC', genrateDimension);

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
