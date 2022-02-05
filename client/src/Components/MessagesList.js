import React from 'react';
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesList({allMessages, username}) {
   const renderMessage = allMessages?.map(messageSent => {
      return <Message
               username={username}
               messageSent={messageSent}
             />
   });

   return (
      <div className="chat-body">
         <ScrollToBottom className="message-container">
            {renderMessage}
         </ScrollToBottom>
      </div>
   );
}

export default MessagesList;