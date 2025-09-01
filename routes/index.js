var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('./auth')
const userModel = require("./users")
const passport = require('passport')
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/coa',isLoggedIn,  function(req, res){
  res.render('coa')
})






router.post('/register', function(req, res){
  var userdata = new userModel({
    username: req.body.username,
    user_designation: req.body.user_designation,
    user_id: req.body.user_id

  });
  userModel.register(userdata, req.body.password).then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/login')
    })
  })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}) ,(req, res)=>{})



router.get("/logout", (req, res, next)=>{
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/login")
  })
})



module.exports = router;