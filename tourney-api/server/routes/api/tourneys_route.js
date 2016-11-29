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
   * @TODO: should it be /:id ?
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

  return router;
};

// /*
//  * Add player to tournament.
//  */
// router.put('/:tourneyId/user/:userId', function(request, response) {
//   var updatedTourney;
//   var tourneyId = +request.params.tourneyId;
//   var userId = +request.params.userId;
//   var responseMessage = {};
//   var currentPlayers;
//   updatedTourney = tourneys.find(tourney => tourney.id === tourneyId);
//   if (updatedTourney) {
//     currentPlayers = updatedTourney.players ? updatedTourney.players : [];
//     if (currentPlayers.length === updatedTourney.participants.max) {
//       responseMessage.status = 'fail';
//       responseMessage.message = 'Tournament is full.';
//     } else if (!currentPlayers.includes(userId)) {
//       currentPlayers.push(userId);
//       updatedTourney.players = currentPlayers;
//       updatedTourney.participants.current = currentPlayers.length;
//       responseMessage.status = 'success';
//       responseMessage.message = 'Player successfully added to the tournament.';
//     } else {
//       responseMessage.status = 'warning';
//       responseMessage.message = 'This player is already in the tournament.';
//     }
//   }
//   response.setHeader('Content-Type', 'application/json');
//   response.send(JSON.stringify(responseMessage));
// });

// /*
//  * Remove player from tournament.
//  */
// router.delete('/:tourneyId/user/:userId', function(request, response) {
//   var tourneyId = +request.params.tourneyId;
//   var userId = +request.params.userId;
//   var responseMessage = {};
//   responseMessage.status = 'fail';
//   responseMessage.message = 'Cannot find required tournament.';
//   tourneys = tourneys.map(
//     tourney => {
//       if (tourney.id === tourneyId) {
//         responseMessage.status = 'warning';
//         responseMessage.message = 'This tournament has no players to remove.';
//         if (tourney.players) {
//           tourney.players = tourney.players.filter(player => player !== userId);
//           tourney.participants.current = tourney.players.length;
//           responseMessage.status = 'success';
//           responseMessage.message = 'Player was removed from the tournament.';
//         }
//       }
//       return tourney;
//     }
//   );
//   response.setHeader('Content-Type', 'application/json');
//   response.send(JSON.stringify(responseMessage));
// });



// module.exports = router;
