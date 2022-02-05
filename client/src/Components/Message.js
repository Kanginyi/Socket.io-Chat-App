import React from 'react';

function Message({username, messageSent}) {
   return (
      <div
         // classNames: message | you | other
         className={`message ${username === messageSent.sender ? "you" : "other"}`}
      >
         <div>
            <div className="message-content">
               <p>{messageSent.message}</p>
            </div>
            
            <div className="message-info">
               <p className="message-time">{messageSent.time}</p>
               <p className="message-sender">{messageSent.sender}</p>
            </div>
         </div>
      </div>
   );
}

export default Message;