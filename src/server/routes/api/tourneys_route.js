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
router.get('/', function (request, response){
  response.send(JSON.stringify(tourneys));
});

/*
 * Get a tourney with given id.
 */
router.get('/:id', function (request, response){
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(tourneys.find(tourney => tourney.id === +request.params.id)));
});

/*
 * Delete a tourney with given id.
 */
router.delete('/:id', function (request, response){
  tourneys = tourneys.filter( tourney => tourney.id !== +request.params.id);
  response.sendStatus(200);
});

/*
 * Update an existing tourney with given information.
 * @TODO: should it be /:id ?
 */
router.put('/', function(request, response){
  var updatedTourney = {};

  request.on('data', function(data, error){
    if(error){
      response.writeHeader(500, {'Content-Type': 'text/plain'});
      response.write('Error reading data stream: ' + JSON.stringify(error));
      response.end();
      return;
    }
    updatedTourney = JSON.parse(data);
    tourneys = tourneys.map(tourney => {
      if(tourney.id == updatedTourney.id){
        return updatedTourney;
      }else{
        return tourney;
      }
    });
  });
  request.on('end', function(){
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(updatedTourney));
    response.end();
  });
});

/*
 * Create a new tourney with given information.
 */
router.post('/', function (request, response){
  var newTrouney = {};
  request.on('data', function(data, error){
    if(error){
      response.writeHeader(500, {'Content-Type': 'text/plain'});
      response.write('Error reading data stream: ' + JSON.stringify(error));
      response.end();
      return;
    }
    newTrouney = JSON.parse(data);
    newTrouney.id = tourneys.length;
    tourneys.push(newTrouney);
    
  });
  request.on('end', function(){
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(newTrouney));
    response.end();
  });
});

module.exports = router;