var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
  userID: Schema.ObjectId,
  title: String,
  someID: String,
  url: String
});

module.exports = mongoose.model('Pic', Pic);