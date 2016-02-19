module.exports = function (app, passport) {
var request = require('request');
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var Pic = require("../dbmodels/pic.js");
Pic = mongoose.model("Pic");
var User = require("../dbmodels/user.js");
User = mongoose.model("User");

var passportTwitter = require('../auth/twitter');

app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

app.get('/auth/twitter/return',
  passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    req.session.isLoggedIn = true;
    req.session.userID = req.user._id;
    res.redirect("/recent");
    //res.json(req.user);
  });

app.get('/logout', function(req, res) {
        req.session.isLoggedIn = false;
        req.session.userID = null;
        req.logout();
        res.redirect('/recent');
});

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
         res.render("showPics", {loggedIn: req.session.isLoggedIn, pics: allPics, canDelete: false});
      });
    });
    app.get("/myPics", function(req, res){
      if(req.session.isLoggedIn){
        var myPics = [];
        var picStream = Pic.find({"userID": req.session.userID}).limit(500).stream();
        picStream.on("data", function(doc){
        myPics.push(doc);
      });
      picStream.on("end", function(){
         res.render("showPics", {loggedIn: true, pics: myPics, canDelete: true});
      }); 
      }
      else{
        res.redirect("/recent");
      }
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
        var newPic = new Pic({"title": req.body.title, "url": req.body.url, "userID": req.session.userID, "userName": req.session.userName});
        newPic.save();
        res.send({});
      }
    });
    app.post("/deletePic", function(req, res){
      if(req.session.isLoggedIn){
        Pic.remove({"_id": req.body.deleteID, "userID": req.session.userID}, function(){
          res.send({});
        });
      }
    });
    app.get("/user/:userID", function(req, res){
          var theirPics = [];
          var picStream = Pic.find({"userID": req.params.userID}).limit(500).stream();
          picStream.on("data", function(doc){
          theirPics.push(doc);
        });
        picStream.on("end", function(){
          User.find({"_id": req.params.userID}, function(){
            if(req.params.userID == req.session.userID){
            res.render("showPics", {loggedIn: req.session.isLoggedIn, pics: theirPics, canDelete: true}); 
            }
            else{
            res.render("showPics", {loggedIn: req.session.isLoggedIn, pics: theirPics, userName: req.session.userName, canDelete: false});    
            }
          });
        }); 
    });
}