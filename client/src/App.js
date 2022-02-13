import './App.css';
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";

// io is going to be used to establish a connection to Socket.io
import io from "socket.io-client";
import { useEffect, useState } from "react";

// Similar to how it is in the backend, we want to create a connection from the frontend to the backend server
const socket = io.connect("http://localhost:3001");

function App() {
   const [username, setUsername] = useState("");
   const [room, setRoom] = useState("");
   const [showChatroom, setShowChatroom] = useState(false);
   const [allUsers, setAllUsers] = useState([]);

   const currentUser = socket.id;
  
   // onClick to join the room that we want to 
   const joinRoom = () => {
      if (username !== "" && room !== "") {
         socket.emit("join_room", {username, room, currentUser})// First event call from the front end. Using .emit(), we can access the thing in the backend with the same name ("join_room") and then pass in the matching data in the backend by passing in a second argument, in this case, "room"
         setShowChatroom(prev => !prev);
      }
   }

   useEffect(() => {
      socket.on("all_users", data => {
         setAllUsers(data);
      })
   }, [socket]);

   const homeHeader = <h1 id="spacenook-font-size" className="spacenook-header">
                        Welcome to SpaceNook Messenger
                      </h1>
   
   const chatHeader = <h1 className="spacenook-header">
                        Hello {username}!
                      </h1>

   return (
      <div className="App">
         {showChatroom ? chatHeader : homeHeader}

         {
            showChatroom ?
               <Chat
                  socket={socket}
                  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
                  currentUser={currentUser}
                  allUsers={allUsers}
                  setShowChatroom={setShowChatroom}
               />
            : 
               <JoinRoom
                  setUsername={setUsername}
                  setRoom={setRoom}
                  joinRoom={joinRoom}
               />
         }
      </div>
   );
}

export default App;