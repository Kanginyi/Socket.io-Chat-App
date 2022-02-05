import React from 'react';
import "../Stylings/JoinRoom.css";

function JoinRoom({setUsername, setRoom, joinRoom}) {
   return (
      <>
      <h1 id="spacenook-header">
         Welcome to SpaceNook Messenger
      </h1>

      <div className="join-chat-container">
         <h2>Join A Chatroom!</h2>

         <input
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            maxLength={15}
         />

         <input
            onChange={e => setRoom(e.target.value)}
            type="text"
            placeholder="Enter Room ID"
            maxLength={10}
         />

         <button onClick={joinRoom}>JOIN ROOM</button>
      </div>
      </>
   );
}

export default JoinRoom;