import "components/chatapp/ChatMsgsContainer.scss";
import ChatMsg from "components/chatapp/ChatMsg";

interface ChatMsgsContainerProps {
  messages: Array<string | null>;
  rateResponse: (index: number, rating: string) => void;
}

const ChatMsgsContainer: React.FC<ChatMsgsContainerProps> = ({
  messages,
  rateResponse,
}) => {
  return (
    <div className="chat-msgs-container">
      {messages.map((message, idx) => (
        <ChatMsg
          key={idx}
          content={message}
          isUser={idx % 2 === 0}
          rateResByIdx={(rating) => {
            rateResponse(Math.floor(idx / 2), rating);
          }}
        />
      ))}
    </div>
  );
};

export default ChatMsgsContainer;
