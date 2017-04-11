var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var User = require('../model/signUp');
var googleConfig = require('../config/auth');
var  passport = require('passport');

    module.exports = function(passport) {
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
          console.log("user..",user);
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
          console.log("id..",id);
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        // pull in our app id and secret from our auth.js file
        passport.use(new GoogleStrategy(googleConfig.googleAuth, function(access_token, tokenSecret, profile, done) {

    		// asynchronous
    		process.nextTick(function() {
    			// find the user in the database based on their google id
    	        User.findOne({ 'google.id' : profile.id }, function(err, user) {
                console.log("google profile",profile);
    	        	// if there is an error, stop everything and return that
    	        	// ie an error connecting to the database
    	            if (err)
    	                return done(err);
    				// if the user is found, then log them in
    	            if (user) {
    	                return done(null, user); // user found, return that user
                      } else {
    	                // if there is no user found with that google id, create them
    	                var newUser = new User();
    					        // set all of the google information in our user model
    	                newUser.google.id    = profile.id; // set the users google id
    	                newUser.google.access_token = access_token; // we will save the token that google provides to the user
    	                newUser.google.firstName  = profile.displayName;
    	                newUser.google.email = profile.emails[0].value; // google can return multiple emails so we'll take the first

    					// save our user to the database
    	                newUser.save(function(err) {
    	                    if (err)
    	                        throw err;
    	                    // if successful, return the new user
    	                    return done(null, newUser);
    	                });
    	               }

    	        });
            });

        }));
      };
