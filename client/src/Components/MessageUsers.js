import React from 'react';

function MessageUsers({socket, username, room, allUsers, setShowChatroom}) {
   const leaveRoom = () => {
      socket.emit("leave_room", {username, room})

      setShowChatroom(false);
   }

   return (
      <details className="">
         <summary>Bingo</summary>
         {allUsers.map(data => <p>{data.username}</p>)}
         <button onClick={leaveRoom}>Leave Room</button>
      </details>
   );
}

export default MessageUsers;