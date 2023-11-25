import ChatMsgsContainer from "components/chatapp/ChatMsgsContainer";
import MessageBar from "components/chatapp/Messagebar";
import Sidebar from "components/sidebar/Sidebar";
import { useState } from "react";
import { apiClient } from "services/api";
import "views/chat/ChatAppPage.scss";

function ChatAppPage() {
  const [userMsg, setUserMsg] = useState<string>("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const handleSubmit = () => {
    setMessages([...messages, userMsg, "..."]);
    apiClient.getChatResponse(userMsg).then((res) => {
      const response = res.data.answer.result;
      setMessages([...messages, userMsg, response]);
    });
    return;
  };
  return (
    <div className="chatapp">
      <Sidebar />
      <div className="chat-container">
        <ChatMsgsContainer messages={messages} />
        <MessageBar
          onMessageSubmit={handleSubmit}
          userMsg={userMsg}
          setUserMsg={setUserMsg}
        />
      </div>
    </div>
  );
}

export default ChatAppPage;
