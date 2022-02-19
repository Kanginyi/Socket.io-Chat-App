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

app.get('/', (req, res) => {
   res
      .json({ message: "Welcome"})
      .status(200)
      .end()
});

// Create a new instance of the Server class we imported on line 13
// Pass in the server we created on line 19 to connect both the Socket.io server and the ExpressJS server we created
// The second argument we pass is going to be an object that will help us deal with the cors/Socket.io issues
const io = new Server(server, {
   cors: {
      origin: "https://spacenook-messenger.vercel.app/", // Which server is going to be making the calls to our main server; it's okay to accept Socket.io communication with this URL
      // methods: ["GET", "POST"]
   }
});

// Socket.io works by listening for events to happen, some that are already built into Socket.io's library
// We're also going to put everything inside of this Socket.io connection because we only want to be listening to events if the User has actually connected to the server
// Also, when we're listening for events, we're going to be running everything as a callback function

// This object will hold all the individual rooms as keys
// Those keys will hold arrays of usernames as their values
const allRooms = {};

io.on("connection", socket => { // This means we're listening for an event that has the same id or name "connection"|"socket" is the thing we're going to use to listen for events  
   console.log(`User Connected: ${socket.id}`); // When someone connects to Socket.io, they automatically get a random id. We can access that id by using socket

   // Broadcast will show to everyone except for the user who connected
   // socket.broadcast.emit("message", "A user has joined the chat");

   // Whenever someone triggers the event of "join_room", we want to then use socket.join() from Socket.io's library to join based on the id from the front end
   socket.on("join_room", data => { // We can pass in the data, should recognize it from the frontend
      socket.join(data.room); // This data will match whatever you pass as the second argument in the frontend .emit() function

      if (allRooms[data.room]) {
         allRooms[data.room].push({username: data.username, id: data.currentUser});
      } else {
         allRooms[data.room] = [{username: data.username, id: data.currentUser}];
      }
      
      // Showing all users inside a specific room
      io.to(data.room).emit("all_users", allRooms[data.room]);

      // Showing when a user joins a specific room
      io.to(data.room).emit("user_join", allRooms[data.room]);

      console.log(`User ${data.username} with an ID of: ${socket.id} joined room: ${data.room}`);
   });

   // This event will handle each message being sent from the frontend 
   socket.on("send_message", data => {
      // .to(data.room) is making sure we only send these messages out to that specific room
      socket.to(data.room).emit("receive_message", data);
   });

   socket.on("leave_room", data => {
      // Showing when a user leaves a specific room
      socket.to(data.room).emit("user_leave", data);

      socket.leave(data.room);
      
      allRooms[data.room] = allRooms[data.room]?.filter(data => data.id !== socket.id);

      if (!allRooms[data.room]?.length) {
         delete allRooms[data.room];
      }

      io.to(data.room).emit("all_users", allRooms[data.room]);

      console.log(`User ${data.username} with an ID of: ${socket.id} left room: ${data.room}`);
   });

   // Hold this variable to set equal to socket.rooms from the disconnecting event
   let disconnectRoomName;

   socket.on("disconnecting", () => {
      disconnectRoomName = socket.rooms;
   });

   socket.on("disconnect", () => {  // This is "disconnecting" from the server. If someone closes the page or leaves the chatroom/server

      // Create an array with the disconnectRoomName keys which hold the socket.id and room name, grab the value at index of 1, which will be the room name
      const roomName = Array.from(disconnectRoomName.keys())[1];

      socket.to(roomName).emit("user_leave", {id: socket.id, username: "A user has"});

      allRooms[roomName] = allRooms[roomName]?.filter(data => data.id !== socket.id);

      if (!allRooms[roomName]?.length) {
         delete allRooms[roomName];
      }

      io.to(roomName).emit("all_users", allRooms[roomName]);

      console.log(`User with an ID of ${socket.id} left room: ${roomName}`);
      console.log(`User Disconnected: ${socket.id}`);
   });
});

// "Listen" to a port that we want to use; since React generally defaults to 3000, we're going to be using 3001 here.
// Second part, pass in a callback function that just logs that our server is up and running
server.listen(process.env.PORT || 3001, () => {
   console.log("SERVER RUNNING :^)");
});

// io.sockets.adapter.rooms.get()
// Each socket has its own ID; with this, we can find all of the sockets that are connected to a specific room