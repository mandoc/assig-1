var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sample = mongoose.model('Sample');


/* GET home page. */
/*
	router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cal PPE Graphs' });
});

// Create a route in index.js 
var mongoose = require('mongoose');
var Sample = mongoose.model('Sample');

router.get('/sample', function(req, res, next) {
  Sample.find(function(err, sample){
    if(err){ return next(err); }
    res.json(sample);
  });
});
*/
// END => Create a route in index.js 

//PASSPORT

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport) {

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { title: 'Cal PPE Graphs', message: req.flash('message') });
		
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{ title: 'Cal PPE Graphs', message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user, title: 'Cal PPE Graphs' });
	});
	


	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));
	
	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);
	
	// route for linkedin authentication and login
	// different scopes while logging in
	router.get('/login/linkedin', 
		passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }), 
		 function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });
	
	// handle the callback after linkedin has authenticated the user
	router.get('/login/linkedin/callback',
		passport.authenticate('linkedin', {failureRedirect : '/'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });
	
	//MLL - data route, only if authenticated!
	router.get('/Sample', isAuthenticated, function(req, res, next) {
	  Sample.find({}, {_id: 0}, function(err, data){
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});

	return router;
};

//END PASSPORT

//module.exports = router;
