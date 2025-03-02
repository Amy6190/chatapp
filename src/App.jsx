import React, { useState } from "react";
import Chat from "./components/Chat.jsx";

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div>
      {!joined ? (
        <div>
          <h2>Join a Chat Room</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={() => setJoined(true)}>Join</button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
};

export default App;
