import React from "react";
import "./chatMsg.css";

export function ChatMsg({ isFromUser, content }) {
  const getProfileClassnames = () => {
    return isFromUser ? "user chat-msg" : "bot chat-msg";
  };
  return (
    <div className={getProfileClassnames()}>
      <div className="profile-pic">{/* {isFromUser ? "User1" : ""} */}</div>
      <div className="single-msg-container">{content}</div>
    </div>
  );
}
