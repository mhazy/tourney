# Tourney
Tournament scheduling app for foosball.

# Install
npm install

# Run Mongo DB
`./start-db.sh`

# Run API Server
#### 1 of 3 ways to run:

1. run this in terminal `SECRET=<secret code> CLIENT-ID=<client id> node ./server/server.js`
2. run this in terminal `./start-api.sh <secret code> <client id>`
3. modify start-api.sh file by placing `<secret code>` and `<client id>` values into corresponding variables.
  * then run this in terminal `./start-api.sh`

#### Note: 
If you update `start-api.sh` then make sure you don't commit it.  
To stop tracking the file run `git update-index --assume-unchanged start-api.sh`.  
To start tracking the file again run `git update-index --no-assume-unchanged start-api.sh`.  

# Requirements
1. Mongo DB
