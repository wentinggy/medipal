import {
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  KeyboardEvent,
} from "react";
import "components/chatapp/Messagebar.scss";
import CustomButton from "components/ui/CustomButton";
import Dots from "components/ui/Dots";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

interface MessageBarProps {
  onMessageSubmit: (message: string) => void;
  userMsg: string;
  setUserMsg: Dispatch<SetStateAction<string>>;
  isMsgSending: boolean;
}

const MessageBar: React.FC<MessageBarProps> = ({
  onMessageSubmit,
  userMsg,
  setUserMsg,
  isMsgSending,
}) => {
  const handleSubmit = () => {
    if (userMsg.trim() !== "") {
      onMessageSubmit(userMsg);
      setUserMsg("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserMsg(e.target.value);
  };

  return (
    <div className="message-bar">
      <textarea
        placeholder="Enter your message..."
        value={userMsg}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {isMsgSending ? (
        <CustomButton fullWidth={false} className="send-btn">
          <Dots isLoading={isMsgSending} />
        </CustomButton>
      ) : (
        <CustomButton
          fullWidth={false}
          onClick={handleSubmit}
          className="send-btn"
        >
          <SendIcon fontSize="small" />
        </CustomButton>
      )}

      <IconButton onClick={handleSubmit} className="mobile-send-btn">
        <SendIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default MessageBar;
