var express = require('express');
var router = express.Router();
const userModel = require("./users")
const passport = require('passport')
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()))

// userModel.authentication()rrrrrrrrrrrrrrrrr
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/home', isLoggedIn,function(req, res){
  res.render('home')
})




router.post('/register', function(req, res){
  var userdata = new userModel({
    username: req.body.username,
    // password: req.body.password,
    // secret: req.body.secret

  });
  userModel.register(userdata, req.body.password).then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/home')
    })
  })
});

router.post('/home', passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/"
}) ,(req, res)=>{})



router.get("/logout", (req, res, next)=>{
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/")
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();

  }
  res.redirect("/")
}

module.exports = router;