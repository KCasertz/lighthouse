import "./Webchat.scss";
import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "../../Components/Chat/Chat";
import chat from "../../assets/icons/chat.png";
import { SOCKET_PORT } from "../../api/api";

const socket = io.connect(`http://localhost:${SOCKET_PORT}`);

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
    <div className="join">
      {!showChat ? (
        <div className="join__container">
          <img src={chat} alt="chat icon" className="join__icon" />
          <h3 className="join__header">Live Chat</h3>
          <p className="join__text">Connect with one of our support workers.</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="join__input"
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button className="join__button" onClick={joinRoom}>
            Start chat
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Webchat;
