import './App.css';

// io is going to be used to establish a connection to Socket.io
import io from "socket.io-client";

// Similar to how it is in the backend, we want to create a connection from the frontend to the backend server
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
       asdf
    </div>
  );
}

export default App;