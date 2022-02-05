import React, { useEffect, useState } from 'react';
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

import "../Stylings/Chat.css";

// Going to be sending and receiving messages inside of this component through Socket.io

function Chat({socket, username, room}) {
   const [currentMessage, setCurrentMessage] = useState("");
   const [allMessages, setAllMessages] = useState([]);

   // Function to send a message, asynchronous, also emits a socket event that the backend should be listening for
   const sendMessage = async () => {
      if (currentMessage !== "") {
         const messageData = {
            room: room,
            sender: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
         };

         // Emit a socket message that matches the backend
         await socket.emit("send_message", messageData);
         setAllMessages(list => [...list, messageData]);
         setCurrentMessage("");
      }
   };

   // Listen for any changes inside of our Socket.io server, essentially whenever we receive a new message
   useEffect(() => {
      socket.on("receive_message", (data) => {
         setAllMessages(list => [...list, data]);
      });
   }, [socket]);

   return (
      <main className="chat-container">
         <div className="chat-header">
            <h2>Chatting in {room}</h2>
         </div>

         <MessagesList
            allMessages={allMessages}
            username={username}
         />

         <MessageInput
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage}
            sendMessage={sendMessage}
         />
      </main>
   );
}

export default Chat;