module.exports = function (app, passport) {
var request = require('request');
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var Pic = require("../dbmodels/pic.js");
Pic = mongoose.model("Pic");
var async = require('async');

    app.get("/", function(req, res){
            res.redirect("/recent");
    });
    app.get("/recent", function(req, res){
      var allPics = [];
      var picStream = Pic.find({}).limit(500).stream();
      picStream.on("data", function(doc){
        allPics.push(doc);
      });
      picStream.on("end", function(){
         res.render("showPics", {loggedIn: req.session.isLoggedIn, pics: allPics});
      });
    });
    app.get("/myPics", function(req, res){
      var myPics = [];
      var picStream = Pic.find({"_id": req.session.userID}).limit(500).stream();
      picStream.on("data", function(doc){
        myPics.push(doc);
      });
      picStream.on("end", function(){
         res.render("showPics", {loggedIn: req.session.isLoggedIn, pics: myPics});
      });
    });
    app.get("/add", function(req, res){
      if(req.session.isLoggedIn){
        res.render("newPic", {loggedIn: true});
      }
      else{
        res.redirect("/recent");
      }
    });
    app.post("/newPic", function(req, res){
      if(req.session.isLoggedIn){
        var newPic = new Pic({"title": req.body.title, "url": req.body.url});
        newPic.save();
        res.send({});
      }
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

app.get('/logout', function(req, res) {
        req.session.isLoggedIn = false;
        req.session.userID = null;
        req.logout();
        res.redirect('/');
});

}