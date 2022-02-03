import './App.css';
import Chat from "./Components/Chat";

// io is going to be used to establish a connection to Socket.io
import io from "socket.io-client";
import { useState } from "react";

// Similar to how it is in the backend, we want to create a connection from the frontend to the backend server
const socket = io.connect("http://localhost:3001");

function App() {
   const [username, setUsername] = useState("");
   const [room, setRoom] = useState("");
   const [showChatroom, setShowChatroom] = useState(false);

   // onClick to join the room that we want to 
   const joinRoom = () => {
      if (username !== "" && room !== "") {
         socket.emit("join_room", room)// First event call from the front end. Using .emit(), we can access the thing in the backend with the same name ("join_room") and then pass in the matching data in the backend by passing in a second argument, in this case, "room"
         setShowChatroom(prev => !prev);
      }
   }

   return (
      <div className="App">
         {showChatroom ?
            <Chat socket={socket} username={username} room={room}/>
         : 
            <div className="join-chat-container">
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
         }
      </div>
   );
}

export default App;