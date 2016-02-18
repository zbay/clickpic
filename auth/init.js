var mongoose = require("mongoose");
var passport = require('passport');
var User = require('../dbmodels/user.js');
User = mongoose.model("User");

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};