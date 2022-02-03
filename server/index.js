// This file is the "entry point" for the server

// Require express
const express = require("express");
// Now we want to create a variable that holds the instance of the express function
const app = express();

const http = require("http");
const cors = require("cors");

// Here's the first part of dealing with Socket.io
// Importing the class Server from Socket.io's library
const { Server } = require("socket.io");

// Use cors middleware to resolve a lot of the issues between Socket.io and cors
app.use(cors());

// Using the http library, call the function "createServer" and pass the express app we created before inside of here. This will generate the server for us.
const server = http.createServer(app);

// Create a new instance of the Server class we imported on line 13
// Pass in the server we created on line 19 to connect both the Socket.io server and the ExpressJS server we created
// The second argument we pass is going to be an object that will help us deal with the cors/Socket.io issues
const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000", // Which server is going to be making the calls to our main server; it's okay to accept Socket.io communication with this URL
      methods: ["GET", "POST"]
   }
});

// Socket.io works by listening for events to happen, some that are already built into Socket.io's library
// We're also going to put everything inside of this Socket.io connection because we only want to be listening to events if the User has actually connected to the server
// Also, when we're listening for events, we're going to be running everything as a callback function
io.on("connection", (socket) => { // This means we're listening for an event that has the same id or name "connection"|"socket" is the thing we're going to use to listen for events  
   console.log(`User Connected: ${socket.id}`); // When someone connects to Socket.io, they automatically get a random id. We can access that id by using socket

   socket.on("disconnect", () => {  // This is "disconnecting" from the server. If someone closes the page or leaves the chatroom/server
      console.log(`User Disconnected: ${socket.id}`);
   })
});


// "Listen" to a port that we want to use; since React generally defaults to 3000, we're going to be using 3001 here.
// Second part, pass in a callback function that just logs that our server is up and running
server.listen(3001, () => {
   console.log("SERVER RUNNING :^)");
});