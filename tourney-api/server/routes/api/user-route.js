const express = require('express');
const router = express.Router();
const ResponseMessage = require('../../models/response-model');

module.exports = function(users) {
  /*
   * Get user.
   */
  router.get('/get/:id', function(request, response) {
    const userId = +request.params.id;
      users.getUser(userId)
      .then((user) => {
        ResponseMessage.respondWithSuccess(response, user);
      })
      .catch((error) => {
        ResponseMessage.respondWithFail(response, error);
      });
  });

  /*
   * Create new user.
   */
  router.post('/', function(request, response) {
    request.on('data', function(data, error) {
      const newUser = JSON.parse(data);
      if(error) {
        ResponseMessage.respondWithFail(response, error);
        return;
      }

      users.findUser({ profileId: newUser.profileId })
      .then(user => {
        if(user) {
          ResponseMessage.respondWithSuccess(response, user);
        }else {
          newUser._id = users.getNewId();
          users.createUser(newUser)
          .then((user) => {
            ResponseMessage.respondWithSuccess(response, user);
          })
          .catch((error) => {
            ResponseMessage.respondWithFail(response, error);
          });
        }
      })
      .catch(error => {
        ResponseMessage.respondWithFail(response, error);
      });
    });
  });
  return router;
}