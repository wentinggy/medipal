import ChatMsgsContainer from "components/chatapp/ChatMsgsContainer";
import MessageBar from "components/chatapp/Messagebar";
import { Sidebar } from "components/sidebar/Sidebar";
import { useToastr } from "hooks/useToastr";
import { useState } from "react";
import { apiClient } from "services/api";
import "views/chat/ChatAppPage.scss";

function ChatAppPage() {
  const [userMsg, setUserMsg] = useState<string>("");
  const [messages, setMessages] = useState<Array<string | null>>([]);
  const { showToastr } = useToastr();
  const [isMsgSending, setIsMsgSending] = useState<boolean>(false);

  const handleNewChat: () => void = () => {
    setMessages([]);
  };

  const handleSubmit = () => {
    if (isMsgSending) {
      showToastr({
        message: "Only one message can be sent at a time!",
        type: "error",
      });
      return;
    }
    setMessages([...messages, userMsg, null]);
    setIsMsgSending(true);
    apiClient
      .getChatResponse(userMsg)
      .then((res) => {
        const response = res.data.answer.result;
        setMessages([...messages, userMsg, response]);
      })
      .catch((err) => {
        showToastr({
          message:
            "Error occurred while sending message! Please refresh the page.",
          type: "error",
        });
      })
      .finally(() => {
        setIsMsgSending(false);
      });
    return;
  };
  return (
    <div className="chatapp">
      <Sidebar handleNewChat={handleNewChat} />
      <div className="chat-container">
        <ChatMsgsContainer messages={messages} />
        <MessageBar
          onMessageSubmit={handleSubmit}
          userMsg={userMsg}
          setUserMsg={setUserMsg}
          isMsgSending={isMsgSending}
        />
      </div>
    </div>
  );
}

export default ChatAppPage;
