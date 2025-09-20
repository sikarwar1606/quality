var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session')
const flash = require('flash')
const mongoose = require('mongoose')
var users = require('./models/users');
const mongostore = require('connect-mongo');

//Models


const customerSchema = require('./models/customerSC');
const mbDetailsSchema = require('./models/mbDetailsSC');
const rmDetailsSchema = require('./models/rmDetailsSC');
const docNoDetailsSchema = require('./models/docNoDetailsSC');
const plantSchema = require('./models/plantSC');
const batchSchema = require('./models/batchSC');
const CokeCoaSchema = require('./models/cokeCoaDetailsSC');
const RelianceCoaSchema = require('./models/relianceCoaDetailsSC');


//Routes
var indexRouter = require('./routes/index');
const customerRouter = require('./routes/prepareCoa');
const addmbDetail = require('./routes/addMB');
const addrmDetail = require('./routes/addRM');
const addnewDocDetail = require('./routes/docNoDetails');
const newPlant = require('./routes/addPlant');
const dimensionSchema = require('./routes/dimension');
const newBatch = require('./routes/newBatch');
const cokeCoaDetails = require('./routes/cokeCoaDetails');
const relianceCoaDetails = require('./routes/relianceCoaDetails');
const newCustomer = require('./routes/newCustomer');
const specs = require('./routes/specs');

//Find routes
const findBatch = require('./routes/find/findBatch');
const findCustomer = require('./routes/find/findCustomer');
const findMB = require('./routes/find/findMB');
const findRM = require('./routes/find/findRM');
const findrelcoa = require('./routes/find/findRelCoaDe');
const findDesign = require('./routes/find/findDesign');



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
  secret: "Hello",
  store: mongostore.create({mongoUrl:"mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"}),
  cookie: {
    maxAge: 1000 * 60 * 480 // 8 hour in ms
  }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
///////////////////////////////////////////////////////////////////
app.use(flash())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static("public"));

//Models
app.use('/customerSC', customerSchema);
app.use('/batchSC', batchSchema);
app.use('/cokeCoaDetailsSC', CokeCoaSchema);
app.use('/plantSC', plantSchema);
app.use('/dimensionSC', dimensionSchema);
app.use('/mbDetailsSC', mbDetailsSchema);
app.use('/addnewDocDetailsSC', docNoDetailsSchema);

//Routes
app.use('/', indexRouter);
app.use('/coa/redirect', customerRouter);
app.use('/cokecoadetails', cokeCoaDetails);
app.use('/reliancecoadetails', relianceCoaDetails);
app.use('/newplant', newPlant);
app.use('/batch', newBatch);
app.use('/batch', findBatch);
app.use('/customer', newCustomer);
app.use('/customer', findCustomer);
app.use('/specs', specs);
app.use('/addmbDetails', addmbDetail);
app.use('/addmbDetails', addmbDetail);
app.use('/mb', findMB);
app.use('/rm', findRM);
app.use('/relcoade', findrelcoa);
app.use('/design', findDesign);
app.use('/addnewdocDetails', addnewDocDetail);



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
