const mongoose = require('mongoose');
const tourneyModel = require('../../models/tourney-model');
const Schema = mongoose.Schema;

module.exports = new Schema(tourneyModel);
