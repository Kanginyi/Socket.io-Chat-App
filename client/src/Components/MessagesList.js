import React from 'react';
import BotMessage from './BotMessage';
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesList({allMessages, currentUser, socket, username, setUsername, room, setRoom, setShowChatroom}) {
   const renderMessage = allMessages?.map(messageSent => {
      if (messageSent.sender === "SpaceNook Messenger") {
         return <BotMessage
                  messageSent={messageSent}
                />
      } else {
         return <Message
                  messageSent={messageSent}
                  currentUser={currentUser}
                />
      }
   });

   const leaveRoom = () => {
      socket.emit("leave_room", {username, room, id: socket.id});
      
      setUsername("");
      setRoom("");

      setShowChatroom(false);
   }

   return (
      <div className="chat-body">
         <button
            onClick={leaveRoom}
            className="leave-room"
            title="Leave Current Room"
         >
            Leave Room
         </button>

         <ScrollToBottom className="messages-list">
            {renderMessage}
         </ScrollToBottom>
      </div>
   );
}

export default MessagesList;