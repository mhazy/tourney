const express = require('express');
const ResponseMessage = require('../../models/response-model');
const router = express.Router();

module.exports = function(tourneys) {

  /*
   * Create a new tourney with given information.
   */
  router.post('/', function(request, response) {
    var newTrouney = {};
    request.on('data', function(data, error) {
      if (error) {
        ResponseMessage.respondWithFail(response, error);
        return;
      }
      newTrouney = JSON.parse(data);
      newTrouney._id = tourneys.getNewId();
      tourneys.createTourney(newTrouney)
      .then((tourney) => {
        ResponseMessage.respondWithSuccess(response, tourney);
      })
      .catch((error) => {
        ResponseMessage.respondWithFail(response, error);
      });
    });
  });

  /*
   * Get all trouneys.
   */
  router.get('/', function(request, response) {
    tourneys.getAllTourneys()
    .then((tourneys) => {
      ResponseMessage.respondWithSuccess(response, tourneys || []);
    })
    .catch((error) => {
      ResponseMessage.respondWithFail(response, error);
    });
  });

  /*
   * Get a tourney with given id.
   */
  router.get('/:id', function(request, response) {
    const tourneyId = request.params.id;
    tourneys.getTourney(tourneyId)
    .then((tourney) => {
      if(tourney) {
        ResponseMessage.respondWithSuccess(response, tourney);
      }else {
        ResponseMesssage.respondWithFail(response, 'Tournament cannot be found.');
      }
    })
    .catch((error) => {
      ResponseMessage.respondWithFail(response, error);
    });
  });

  /*
   * Delete a tourney with given id.
   */
  router.delete('/:id', function(request, response) {
    const tourneyId = request.params.id;
    tourneys.deleteTourney(tourneyId)
    .then(() => {
      ResponseMessage.respondWithSuccess(response, 'Tournament was deleted.');
    })
    .catch((error) => {
      ResponseMessage.respondWithFail(response, error);
    });
  });

  /*
   * Update an existing tourney with given information.
   */
  router.put('/', function(request, response) {
    request.on('data', function(data, error) {
      const updatedTourney = JSON.parse(data);
      if (error) {
        ResponseMessage.respondWithFail(response, error);
      }else {
        tourneys.updateTourney(updatedTourney._id, updatedTourney)
        .then((tourney) => {
          if(tourney) {
            ResponseMessage.respondWithSuccess(response, tourney);
          }else {
            ResponseMessage.respondWithFail(response, 'Failed to find and update specified tournament.');
          }
        })
        .catch((error) => {
          ResponseMessage.respondWithFail(response, error);
        });
      }
    });
  });

  /*
   * Add player to tournament.
   */
  router.put('/:tourneyId/user/:userId', function(request, response) {
    var tourneyId = request.params.tourneyId;
    var userId = request.params.userId;
    tourneys.isTourneyNotFull(tourneyId)
    .then((tourney) => {
      if(tourney) {
        _joinTourney(tourneyId, userId, response);
      }else{
        ResponseMessage.respondWithFail(response, 'Tournament is full.');
      }
    })
    .catch((error) => {
      ResponseMessage.respondWithFail(response, error);
    });
  });

  /*
   * Private helper function.
   */
  function _joinTourney(tourneyId, userId, response) {
    tourneys
    .joinTourney(tourneyId, userId)
    .then((tourney) => {
      if(tourney) {
        ResponseMessage.respondWithSuccess(response, tourney);
      }else {
        ResponseMessage.respondWithFail(response, 'Failed to join specified tournament.');
      }
    });
  }

  /*
   * Remove player from tournament.
   */
  router.delete('/:tourneyId/user/:userId', function(request, response) {
    var tourneyId = request.params.tourneyId;
    var userId = request.params.userId;
    tourneys.leaveTourney(tourneyId, userId)
    .then((tourney) => {
      if(tourney) {
        ResponseMessage.respondWithSuccess(response, tourney);
      }else {
        ResponseMessage.respondWithFail(response, 'Failed to leave tournament.');
      }
    })
    .catch((error) => {
      ResponseMessage.respondWithFail(response, error);
    });
  });

  return router;
};
