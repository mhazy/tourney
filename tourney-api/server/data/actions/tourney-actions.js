const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(tourneyModel) {
  const getNewId = function() {
    return new ObjectId();
  };

  const getAllTourneys = function() {
    const tourneys = tourneyModel.find({});
    return tourneys.exec();
  }

  const findTourney = function(query) {
    const tourney = tourneyModel.findOne(query);
    return tourney.exec();
  };

  const createTourney = function(tourney) {
    const newTourney = new tourneyModel(tourney);
    return newTourney.save();
  };

  const getTourney = function(tourneyId) {
    const tourney = tourneyModel.findOne({ '_id': ObjectId(tourneyId) });
    return tourney.exec();
  };

  const deleteTourney = function(tourneyId) {
    const deletedTourney = tourneyModel.remove({ '_id': tourneyId });
    return deletedTourney.exec();
  };

  const updateTourney = function(tourneyId, newData) {
    const updatedTourney = tourneyModel.findOneAndUpdate({ _id: tourneyId }, newData, { 'new': true });
    return updatedTourney.exec();
  };

  const joinTourney = function(tourneyId, userId) {
    const condition = { _id: tourneyId };
    const update = { $addToSet: { players: userId }};
    const joinedTourney = tourneyModel.findOneAndUpdate(condition, update, { 'new': true });
    return joinedTourney.exec();
  };

  const leaveTourney = function(tourneyId, userId) {
    const condition = { _id: tourneyId };
    const update = { $pull: { players: userId } };
    const options = { 'new': true };
    const leftTourney = tourneyModel.findOneAndUpdate(condition, update, options);
    return leftTourney.exec();
  }

  const isTourneyNotFull = function(tourneyId) {
    const condition = { _id: tourneyId, $where : 'this.players.length < this.participants.max' };
    fullTourney = tourneyModel.findOne(condition);
    return fullTourney.exec();
  }

  return {
    getAllTourneys,
    createTourney,
    getTourney,
    findTourney,
    deleteTourney,
    updateTourney,
    getNewId,
    joinTourney,
    leaveTourney,
    isTourneyNotFull,
  };
};
