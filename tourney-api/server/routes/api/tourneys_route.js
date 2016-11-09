var express = require('express');
var router = express.Router();

/*
 * MOCK DATA
 * @TODOD: REPLACE WITH MONGODB
 */
var tourneys = [];


/*
 * Get all trouneys.
 */
router.get('/', function(request, response) {
  response.send(JSON.stringify(tourneys));
});

/*
 * Get a tourney with given id.
 */
router.get('/:id', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(tourneys.find(tourney => tourney.id === +request.params.id)));
});

/*
 * Delete a tourney with given id.
 */
router.delete('/:id', function(request, response) {
  tourneys = tourneys.filter(tourney => tourney.id !== +request.params.id);
  response.sendStatus(200);
});

/*
 * Update an existing tourney with given information.
 * @TODO: should it be /:id ?
 */
router.put('/', function(request, response) {
  var updatedTourney = {};

  request.on('data', function(data, error) {
    if (error) {
      response.writeHeader(500, { 'Content-Type': 'text/plain' });
      response.write('Error reading data stream: ' + JSON.stringify(error));
      response.end();
      return;
    }
    updatedTourney = JSON.parse(data);
    tourneys = tourneys.map(tourney => {
      if (tourney.id == updatedTourney.id) {
        return updatedTourney;
      } else {
        return tourney;
      }
    });
  });
  request.on('end', function() {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(updatedTourney));
    response.end();
  });
});

/*
 * Add player to tournament.
 */
router.put('/:tourneyId/user/:userId', function(request, response) {
  var updatedTourney;
  var tourneyId = +request.params.tourneyId;
  var userId = +request.params.userId;
  var responseMessage = {};
  var currentPlayers;
  updatedTourney = tourneys.find(tourney => tourney.id === tourneyId);
  if (updatedTourney) {
    currentPlayers = updatedTourney.players ? updatedTourney.players : [];
    if (currentPlayers.length === updatedTourney.participants.max) {
      responseMessage.status = 'fail';
      responseMessage.message = 'Tournament is full.';
    } else if (!currentPlayers.includes(userId)) {
      currentPlayers.push(userId);
      updatedTourney.players = currentPlayers;
      updatedTourney.participants.current = currentPlayers.length;
      responseMessage.status = 'success';
      responseMessage.message = 'Player successfully added to the tournament.';
    } else {
      responseMessage.status = 'warning';
      responseMessage.message = 'This player is already in the tournament.';
    }
  }
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(responseMessage));
});

/*
 * Remove player from tournament.
 */
router.delete('/:tourneyId/user/:userId', function(request, response) {
  var tourneyId = +request.params.tourneyId;
  var userId = +request.params.userId;
  var responseMessage = {};
  responseMessage.status = 'fail';
  responseMessage.message = 'Cannot find required tournament.';
  tourneys = tourneys.map(
    tourney => {
      if (tourney.id === tourneyId) {
        responseMessage.status = 'warning';
        responseMessage.message = 'This tournament has no players to remove.';
        if (tourney.players) {
          tourney.players = tourney.players.filter(player => player !== userId);
          tourney.participants.current = tourney.players.length;
          responseMessage.status = 'success';
          responseMessage.message = 'Player was removed from the tournament.';
        }
      }
      return tourney;
    }
  );
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(responseMessage));
});

/*
 * Create a new tourney with given information.
 */
router.post('/', function(request, response) {
  var newTrouney = {};
  request.on('data', function(data, error) {
    if (error) {
      response.writeHeader(500, { 'Content-Type': 'text/plain' });
      response.write('Error reading data stream: ' + JSON.stringify(error));
      response.end();
      return;
    }
    newTrouney = JSON.parse(data);
    newTrouney.id = tourneys.length;
    tourneys.push(newTrouney);

  });
  request.on('end', function() {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(newTrouney));
    response.end();
  });
});

module.exports = router;