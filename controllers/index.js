module.exports = function (app, passport) {
var request = require('request');
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var async = require('async');

  /*function isLoggedIn (req, res, next) {
		if (req.session.loggedIn) {
			return next();
		} else {
			res.redirect('/unlogged');
		}
	}*/
    app.get("/", function(req, res){
            res.render("main", {loggedIn: req.session.isLoggedIn});
    });
    
var passportTwitter = require('../auth/twitter');

app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

app.get('/auth/twitter/return',
  passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    req.session.isLoggedIn = true;
    req.session.userID = req.user._id;
    res.redirect("/");
    //res.json(req.user);
  });
}