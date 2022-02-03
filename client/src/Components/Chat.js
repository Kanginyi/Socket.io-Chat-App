import React, { useState } from 'react';

// Going to be sending and receiving message inside of this component through Socket.io

function Chat({socket, username, room}) {
   const [currentMessage, setCurrentMessage] = useState("");

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
      }
   };

   return (
      <div>
         <div className="chat-header">
            <p>Chatting in {room}</p>
         </div>

         <div className="chat-body"></div>

         <div className="chat-footer">
            <input
               onChange={e => setCurrentMessage(e.target.value)}
               type="text"
               placeholder="Enter a message"
            />

            <button onClick={sendMessage}>&#9658;</button>
         </div>
      </div>
   );
}

export default Chat;