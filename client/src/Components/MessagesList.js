import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesList({allMessages, username}) {
   return (
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
   );
}

export default MessagesList;