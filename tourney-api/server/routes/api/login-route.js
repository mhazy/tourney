var express = require('express');
var router = express.Router();
var ResponseMessage = require('../../models/response-model');

module.exports = function(users) {

/*
 * Handel login.
 */
router.post('/', function(request, response) {
  request.on('data', function(data, error) {
    var newUser;
    if(error) {
      console.log('error ' + JSON.stringify(error));
      ResponseMessage.respondWithFail(response, error);
    }else {
      newUser = JSON.parse(data);
      console.log('raw got new user = ' + JSON.stringify(newUser));
      users.findUser({ profileId: newUser.profileId })
      .then(user => {
        if(user) {
          console.log('user already exists ' + JSON.stringify(user));
          ResponseMessage.respondWithSuccess(response, user);
        }else {
          newUser._id = users.getNewId();
          users.createUser(newUser)
          .then((user) => {
            console.log('create new user = ' + JSON.stringify(user));
            ResponseMessage.respondWithSuccess(response, user);
          })
          .catch((error) => {
            console.log('error happened creating new user ' + JSON.stringify(error));
            ResponseMessage.respondWithFail(response, error);
          });
        }
      })
      .catch(error => {
        console.log('error happened finding a user ' + JSON.stringify(error));
        ResponseMessage.respondWithFail(response, error);
      });
    }
  });
});

return router;
};
