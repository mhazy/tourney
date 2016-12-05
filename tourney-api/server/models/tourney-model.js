const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

module.exports = {
  _id:  ObjectId,
  owner: ObjectId,
  name: String,
  description: String,
  rules: String,
  registration: {
    start: Date,
    end: Date,
  },
  duration: {
    start: Date,
    end: Date,
  },
  participants: {
    min: Number,
    max: Number,
  },
  playoffs: String,
  schedule: String,
  players: Array,
};
