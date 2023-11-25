import "components/chatapp/ChatMsgsContainer.scss";
import ChatMsg from "components/chatapp/ChatMsg";

interface ChatMsgsContainerProps {
  messages: string[];
}

const ChatMsgsContainer: React.FC<ChatMsgsContainerProps> = ({ messages }) => {
  return (
    <div className="chat-msgs-container">
      {messages.map((message, idx) => (
        <ChatMsg key={idx} content={message} isUser={idx % 2 === 0} />
      ))}
    </div>
  );
};

export default ChatMsgsContainer;
