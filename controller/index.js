var express = require('express'),
    router = express.Router();
var  passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var facebook = require('./facebook')(passport);  //configure facebook
var google = require('./google')(passport);  //configure facebook

router.use('/signUp',require('./signUp'));
router.use('/login',require('./login'));

router.use("/authenticate",require('./authenticate'));

router.use("/authenticate/readTodo",require("./todo/readTodo"));
router.use("/authenticate/createTodo",require("./todo/createTodo"));
router.use("/authenticate/deleteTodo",require("./todo/deleteTodo"));
router.use("/authenticate/updateTodo",require("./todo/updateTodo"));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/auth/facebook',
		passport.authenticate('facebook', { scope : 'email' }
	));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		})
	);

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  router.get('/auth/google',
    passport.authenticate('google', { scope: ['email' , 'profile']}
  ));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
    router.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/home',
        failureRedirect: '/login'
      }));


module.exports = router;



//var isAuthenticated = function (req, res, next) {
// 	// if user is authenticated in the session, call the next() to call the next request handler
// 	// Passport adds this method to request object. A middleware is allowed to add properties to
// 	// request and response objects
// 	if (req.isAuthenticated())
// 		return next();
// 	// if the user is not authenticated then redirect him to the login page
// 	res.redirect('/');
// };
//
//
//
// 	/* GET login page. */
// 	router.get('/', function(req, res) {
//     	// Display the Login page with any flash message, if any
// 		res.render('index', { message: req.flash('message') });
// 	});
//
// 	/* Handle Login POST */
// 	router.post('/login', passport.authenticate('login', {
// 		successRedirect: '/home',
// 		failureRedirect: '/',
// 		failureFlash : true
// 	}));
//
// 	/* GET Registration Page */
// 	router.get('/signup', function(req, res){
// 		res.render('register',{message: req.flash('message')});
// 	});
//
// 	/* Handle Registration POST */
// 	router.post('/signup', passport.authenticate('signup', {
// 		successRedirect: '/home',
// 		failureRedirect: '/signup',
// 		failureFlash : true
// 	}));
//
// 	/* GET Home Page */
// 	router.get('/home', isAuthenticated, function(req, res){
// 		res.render('home', { user: req.user });
// 	});
//
// 	/* Handle Logout */
// 	router.get('/signout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});
