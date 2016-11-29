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
    console.log('trying to get tourney with id ' + tourneyId);
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

  return {
    getAllTourneys,
    createTourney,
    getTourney,
    findTourney,
    deleteTourney,
    updateTourney,
    getNewId,
  };
};
