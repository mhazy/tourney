var express = require('express');
var jwt = require('express-jwt');
var tourneyDb = require('./data/tourney-db');
var tourneysRouter = require('./routes/api/tourneys_route');
//var loginRouter = require('./routes/api/login-route')(tourneyDb.users);
var userRouter = require('./routes/api/user-route')(tourneyDb.users);

var app = express();
var SERVER_PORT = 8000;

/*
 * Set up token decoding keys.
 */
var jwtCheck = jwt({
  secret: new Buffer(process.env.SECRET, 'base64'),
  audience: process.env.CLIENT_ID
});

/*
 * No need to know what we use.
 */
app.disabled('x-powered-by');

/*
 * Handle CORS
 */
app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  response.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', false);
    response.sendStatus(200);
    response.end();
    return;
  }
  next();
});

/*
 * Handle static content.
 * This will serve up whatever is located in /public directory.
 */
app.use(express.static(__dirname + '/public'));

/*
* Secure API and require authorization
*/
app.use('/api', jwtCheck);

/*
 * Handle confused requests.
 * @TODO: perhaps redirect to documentation page?
 */
app.get('/', function(request, response) {
  response.send('Hello, World! Have you taken a wrong turn?');
});

/*
 * Handle /api request.
 * Serve api documentation page.
 */
app.use('/api', express.static(__dirname + '/public/api.html'));

/*
 * Handle /api/login requests.
 */
//app.use('/api/login', loginRouter);

/*
 * Handle /api/user requestsion.
 */
app.use('/api/user', userRouter);

/*
 * Handle tourneys api calls.
 */
app.use('/api/tourneys', tourneysRouter);


/*
 * Start the server.
 */
app.listen(SERVER_PORT, function() {
  console.log('express app listening on part ' + SERVER_PORT + '!');
});
