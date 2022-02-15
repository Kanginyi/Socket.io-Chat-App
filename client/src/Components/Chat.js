import React, { useEffect, useState } from 'react';
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import MessageUsers from './MessageUsers';

import "../Stylings/Chat.css";
import moment from "moment";

// Going to be sending and receiving messages inside of this component through Socket.io

function Chat({socket, username, setUsername, room, setRoom, currentUser, allUsers, setShowChatroom}) {
   const [currentMessage, setCurrentMessage] = useState("");
   const [allMessages, setAllMessages] = useState([]);

   // Function to send a message, asynchronous, also emits a socket event that the backend should be listening for
   const sendMessage = async () => {
      if (currentMessage !== "") {
         const messageData = {
            id: currentUser,
            room: room,
            sender: username,
            message: currentMessage,
            time: moment().format("h:mma")
         };

         // Emit a socket message that matches the backend
         await socket.emit("send_message", messageData);
         setAllMessages(list => [...list, messageData]);
         setCurrentMessage("");
      }
   };

   // Listen for any changes inside of our Socket.io server, essentially whenever we receive a new message
   useEffect(() => {
      socket.on("receive_message", data => {
         setAllMessages(list => [...list, data]);
      });
   }, [socket]);

   // Send a message when users join the room
   useEffect(() => {
      socket.on("user_join", data => {
         setAllMessages(list => [...list, {
            id: socket.id,
            room: room,
            sender: "SpaceNook Messenger",
            message: `${data[data.length - 1]?.username} joined room ${room}!`,
            time: moment().format("h:mma")
         }]);
      })
   }, [socket, room]);

   // Send a message when users leave the room
   useEffect(() => {
      socket.on("user_leave", data => {
         setAllMessages(list => [...list, {
            id: data?.id,
            room: room,
            sender: "SpaceNook Messenger",
            message: `${data?.username} left room ${room}!`,
            time: moment().format("h:mma")
         }]);
      })
   }, [socket, room]);

   return (
      <main className="chat-container">
         <div className="chat-header">
            <h2>Chatting in {room}</h2>
         </div>

         <MessagesList
            allMessages={allMessages}
            currentUser={currentUser}

            socket={socket}
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            setShowChatroom={setShowChatroom}
         />

         <MessageInput
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage}
            sendMessage={sendMessage}
         />

         <MessageUsers
            socket={socket}
            allUsers={allUsers}
         />
      </main>
   );
}

export default Chat;