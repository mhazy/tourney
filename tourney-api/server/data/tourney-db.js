const mongoose = require('mongoose');
const userSchema = require('./schemas/user-schema');

mongoose.connect('mongodb://localhost/tourney');
const UsersModel = mongoose.model('Users', userSchema);
const users = require('./actions/user-actions')(UsersModel)
const actions = {
  users
};

module.exports = actions;