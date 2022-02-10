import React from 'react';

function MessageInput({setCurrentMessage, currentMessage, sendMessage}) {
   return (
      <div className="chat-input">
         <input
            onChange={e => setCurrentMessage(e.target.value)}
            type="text"
            placeholder="Enter a message"
            value={currentMessage}
            onKeyPress={e => {e.key === "Enter" && sendMessage()}}
         />

         <button
            onClick={sendMessage}
            title="Send Message!"
         >
            &#9658;
         </button>
      </div>
   );
}

export default MessageInput;