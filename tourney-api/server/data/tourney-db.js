const mongoose = require('mongoose');
const userSchema = require('./schemas/user-schema');
const tourneySchema = require('./schemas/tourney-schema');

mongoose.connect('mongodb://localhost/tourney');
const UsersModel = mongoose.model('Users', userSchema);
const TourneyModel = mongoose.model('Tourneys', tourneySchema);
const users = require('./actions/user-actions')(UsersModel);
const tourneys = require('./actions/tourney-actions')(TourneyModel);
const actions = {
  users,
  tourneys,
};

module.exports = actions;
