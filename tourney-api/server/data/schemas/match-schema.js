const mongoose = require('mongoose');
const matchModel = require('../../models/match-model');
const Schema = mongoose.Schema;

module.exports = new Schema(matchModel);
