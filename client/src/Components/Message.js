import React from 'react';

function Message({username, messageSent}) {
   return (
      <div className="message" id={username === messageSent.sender ? "you" : "other"}>
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
   );
}

export default Message;