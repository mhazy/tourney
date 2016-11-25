const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const Schema = mongoose.Schema;

module.exports = new Schema(userModel);
