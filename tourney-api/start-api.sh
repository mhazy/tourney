#! /bin/bash

# clear the screan
clear

# either set the values in this file without using quotes
export SECRET=<put here> 
export CLIENT_ID=<put here>

# or pass them as arguments to this script without quotes
if [ ! -z "$1" ]
then
    export SECRET=$1
fi

if [ ! -z "$2" ]
then
    export CLIENT_ID=$2
fi

#start the server
node server/server.js
