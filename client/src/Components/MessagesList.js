import React from 'react';
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesList({allMessages, currentUser}) {
   const renderMessage = allMessages?.map(messageSent => {
      return <Message
               messageSent={messageSent}
               currentUser={currentUser}
             />
   });

   return (
      <div className="chat-body">
         <ScrollToBottom className="messages-list">
            {renderMessage}
         </ScrollToBottom>
      </div>
   );
}

export default MessagesList;