import React, { useState, useEffect } from "react";
import "./Chat.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import ScrollToTop from "react-scroll-to-top";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([
    {
      room: room,
      author: "Ashen",
      message:
        "Hi, you're through to Ashen. I'm a support worker here at Lighthouse. How can I help?",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    },
  ]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const greeting = {
    author: "Support worker",
    message: "Hi, you're ",
    room: 1,
    time: "0:32",
  };

  return (
    <section className="chat">
      <div className="chat-window">
        <div className="chat-header">
          <p className="chat__header">Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p className="message">{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            type="text"
            className="footer-text"
            value={currentMessage}
            placeholder="Type your message here"
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
