import {
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  KeyboardEvent,
} from "react";
import "components/chatapp/Messagebar.scss";
import CustomButton from "components/ui/CustomButton";

interface MessageBarProps {
  onMessageSubmit: (message: string) => void;
  userMsg: string;
  setUserMsg: Dispatch<SetStateAction<string>>; // Corrected type
}

const MessageBar: React.FC<MessageBarProps> = ({
  onMessageSubmit,
  userMsg,
  setUserMsg,
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
      <CustomButton fullWidth={false} onClick={handleSubmit}>
        Send
      </CustomButton>
    </div>
  );
};

export default MessageBar;
