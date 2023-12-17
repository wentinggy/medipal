import React, { useRef, useEffect } from "react";
import "components/chatapp/ChatMsg.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dots from "components/ui/Dots";

interface ChatMsgProps {
  isUser: boolean;
  content: string | null;
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
        {isUser ? (
          <AccountCircleIcon />
        ) : (
          <img src="/assets/logo.png" alt="medipal-logo" />
        )}
      </div>
      {content ? (
        <div className="content">{content}</div>
      ) : (
        <Dots isLoading={true} />
      )}
    </div>
  );
};

export default ChatMsg;
