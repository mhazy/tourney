const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

module.exports = {
  _id:  ObjectId,
  name: String,
  email: String,
  avatar: String,
  profileId: String,
};