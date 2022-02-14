import React from 'react';

function Message({messageSent, currentUser}) {
   return (
      <div
         // classNames: message | you | other
         className={`message ${messageSent.id === currentUser ? "you" : "other"}`}
      >
         
         <div className="message-content">
            <p>{messageSent.message}</p>
         </div>
         
         <div className="message-info">
            {messageSent.id === currentUser ?
               <>
                  <p className="message-time">{messageSent.time}</p>
                  <p className="message-sender">{messageSent.sender}</p>
               </>
            :
               <>
                  <p className="message-sender">{messageSent.sender}</p>
                  <p className="message-time">{messageSent.time}</p>
               </>
            }
         </div>
      </div>
   );
}

export default Message;