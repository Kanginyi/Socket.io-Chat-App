import React from 'react';

function JoinRoom({joinRoom, setUsername, setRoom}) {
   return (
      <div className="join-chat-container">
         <h1>Welcome to SpaceNook Messenger</h1>

         <h3>Join A Chatroom</h3>

         <input
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter a username"
         />

         <input
            onChange={e => setRoom(e.target.value)}
            type="text"
            placeholder="Enter Room ID"
         />

         <button onClick={joinRoom}>Join Room</button>
      </div>
   );
}

export default JoinRoom;