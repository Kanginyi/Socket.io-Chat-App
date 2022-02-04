import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

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
      <div className="chat-window">
         <div className="chat-header">
            <p>Chatting in {room}</p>
         </div>

         <div className="chat-body">
            <ScrollToBottom className="message-container">
               {allMessages.map(messageSent => {
                  return <div className="message" id={username === messageSent.sender ? "you" : "other"}>
                           <div>
                              <div className="message-content">
                                 <p>{messageSent.message}</p>
                              </div>

                              <div className="message-meta">
                                 <p id="time">{messageSent.time}</p>
                                 <p id="sender">{messageSent.sender}</p>
                              </div>
                           </div>
                        </div>
               })}
            </ScrollToBottom>
         </div>

         <div className="chat-footer">
            <input
               onChange={e => setCurrentMessage(e.target.value)}
               type="text"
               placeholder="Enter a message"
               value={currentMessage}
               onKeyPress={e => {e.key === "Enter" && sendMessage()}}
            />

            <button onClick={sendMessage}>&#9658;</button>
         </div>
      </div>
   );
}

export default Chat;