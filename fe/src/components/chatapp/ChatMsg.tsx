import React, { useRef, useEffect } from "react";
import "components/chatapp/ChatMsg.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ChatMsgProps {
  isUser: boolean;
  content: string;
}

const ChatMsg: React.FC<ChatMsgProps> = ({ isUser, content }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);
  return (
    <div
      className={isUser ? "user-msg chat-msg" : "bot-msg chat-msg"}
      ref={messageRef}
    >
      <div className="logo-container">
        <AccountCircleIcon />
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default ChatMsg;
