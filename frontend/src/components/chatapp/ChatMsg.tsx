import React, { useRef, useEffect } from "react";
import "components/chatapp/ChatMsg.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dots from "components/ui/Dots";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";

interface ChatMsgProps {
  isUser: boolean;
  content: string | null;
  rateResByIdx: (rating: string) => void;
}

const ChatMsg: React.FC<ChatMsgProps> = ({ isUser, content, rateResByIdx }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const ratePositiveRsp = () => {
    rateResByIdx("Good");
  };

  const rateNegativeRsp = () => {
    rateResByIdx("Poor");
  };

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

      {content && (
        <div className="content">
          <p>{content}</p>

          {!isUser && (
            <div className="msg-actions">
              <IconButton onClick={ratePositiveRsp}>
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={rateNegativeRsp}>
                <ThumbDownIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
      )}

      {!content && <Dots isLoading={true} />}
    </div>
  );
};

export default ChatMsg;
