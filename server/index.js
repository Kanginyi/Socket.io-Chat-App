// This file is the "entry point" for the server

// Require express
const express = require("express");
// Now we want to create a variable that holds the instance of the express function
const app = express();

const http = require("http");
const cors = require("cors");

// Use cors middleware to resolve a lot of the issues between socket.io and cors
app.use(cors());

// Using the http library, call the function "createServer" and pass the express app we created before inside of here. This will generate the server for us.
const server = http.createServer(app);

// "Listen" to a port that we want to use; since React generally defaults to 3000, we're going to be using 3001 here.
// Second part, pass in a callback function that just logs that our server is up and running
server.listen(3001, () => {
   console.log("SERVER RUNNING :^)");
});