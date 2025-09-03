var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session')
const flash = require('flash')
const mongoose = require('mongoose')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const customerRouter = require('./routes/customer');
const customerSchema = require('./routes/customerSC');
const batchSchema = require('./routes/batchSC');
const plantSchema = require('./routes/plantSC');
const designSchema = require('./routes/designDetailsSC');
const dimensionSchema = require('./routes/dimension');
const newBatch = require('./routes/newBatch');
const newDesign = require('./routes/newDesign');
const newCustomer = require('./routes/newCustomer');
// const genrateDimension = require('./routes/genrateDimension');
const passport = require('passport');

var app = express();

//Database connection
mongoose.connect("mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


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

app.use(express.static("public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coa/redirect', customerRouter);
app.use('/customerSC', customerSchema);
app.use('/batchSC', batchSchema);
app.use('/designDetailsSC', designSchema);
app.use('/plantSC', plantSchema);
app.use('/dimensionSC', dimensionSchema);
app.use('/batch', newBatch);
app.use('/design', newDesign);
app.use('/customer', newCustomer);

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
