var LinkedinStrategy = require('passport-linkedin').Strategy;
var User = require('../models/User');
var liConfig = require('../li.js');

module.exports = function(passport) {

    passport.use('linkedin', new LinkedinStrategy({
        consumerKey        : liConfig.clientID,
        consumerSecret    : liConfig.clientSecret,
        callbackURL     : liConfig.callbackURL,
        profileFields  : liConfig.profileFields,
        // MLL - Added profileFields parameter
        // http://stackoverflow.com/questions/19073128/facebook-oauth2-does-not-provide-user-email
        //  ?  profileFields	: ['emails', 'first_name', 'last_name']
    },

    // linkedin will send back the tokens and profile
    //function(access_token, refresh_token, profile, done) {
	function(token, tokenSecret, profile, done) {
		
    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their id from the auth source
	        User.findOne({ linkedinId : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that linkedin id, create them
	                var newUser = new User();

					// set all of the linkedin information in our user model
	                newUser.id = profile.id; // set the users linkedin id	                
	                newUser.token = token; // we will save the token that linkedin provides to the user	                
	                newUser.firstName  = profile.name.givenName;
	                newUser.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                newUser.email = profile.emails.value; // 

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