import "./Webchat.scss";
import { join } from "lodash";
import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "../../Components/Chat/Chat";

const socket = io.connect("http://localhost:3333");

const Webchat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(1);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="app">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="John"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {/* <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
          <button onClick={joinRoom}>Join chat room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Webchat;
