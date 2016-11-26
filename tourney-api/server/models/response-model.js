module.exports =  function(){
  const ResponseStatus = {
    SUCCESS: 'success',
    FAIL: 'fail',
    WARNING: 'warning'
  };

  const generateResponse = function(status, message) {
    return {
      'status': status,
      'message': message
    };
  };

  const sendResponseMessage = function(response, responseMessage){
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseMessage));
    response.end();
  };

  const respondWithSuccess = function(response, payload){
    const successResponse = generateResponse(ResponseStatus.SUCCESS, JSON.stringify(payload));
    sendResponseMessage(response, successResponse);
  };

  const respondWithFail = function(response, error){
    const failResponse = generateResponse(ResponseStatus.FAIL, JSON.stringify(error));
    sendResponseMessage(response, failResponse);
  };

  const respondWithWarning = function(response, warning){
    const warningResponse = generateResponse(ResponseStatus.FAIL, JSON.stringify(warning));
    sendResponseMessage(response, warningResponse);
  };

  return {
    respondWithSuccess,
    respondWithFail,
    respondWithWarning,
  };
}();
