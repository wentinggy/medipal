import React from "react";
import "./chatMsg.css";
import Dots from "../accessories/dots";
import ProfileCard from "../sidebar/ProfileCard";
import MedipalPicture from "../../medipalpicture.png";

export function ChatMsg({ isFromUser, content, sources }) {
  const getProfileClassnames = () => {
    return isFromUser ? "user chat-msg" : "bot chat-msg";
  };
  return (
    <div className={getProfileClassnames()}>
      <div className="profile-pic">
        {isFromUser ? (
          "User"
        ) : (
          <img
            className="profile-image"
            src={MedipalPicture}
            alt="Profile"
            style={{ width: "2rem" }}
          />
        )}
      </div>
      {content != null ? (
        <div
          className="single-msg-container"
          style={{ whiteSpace: "pre-line" }}
        >
          {content}
          {sources && (
            <>
              <br />
              <br />
              <h2>Sources</h2>
              <p>{sources}</p>
            </>
          )}
        </div>
      ) : (
        <div className="single-msg-container">
          <Dots isLoading={content == null} />
        </div>
      )}
    </div>
  );
}
