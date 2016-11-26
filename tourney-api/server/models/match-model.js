const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  _id: ObjectId,
  tourneyId: ObjectId,
  team1: ObjectId,
  team2: ObjectId,
  datePlayed: Date,
  scoreTeam1: [],
  scoreTeam2: [],
};
