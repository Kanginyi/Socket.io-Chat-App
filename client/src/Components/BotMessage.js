import React from 'react';

function BotMessage({messageSent}) {
   return (
      <div className="message bot">
         <div className="join-leave-room">
            <p>{messageSent.message}</p>
         </div>

         <div className="message-info">
            <p className="message-sender">{messageSent.sender}</p>
            <p className="message-time">{messageSent.time}</p>
         </div>
      </div>
   );
}

export default BotMessage;