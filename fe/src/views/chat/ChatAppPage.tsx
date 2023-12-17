import ChatMsgsContainer from "components/chatapp/ChatMsgsContainer";
import MessageBar from "components/chatapp/Messagebar";
import PlaceholderContainer from "components/chatapp/PlaceholderContainer";
import { Sidebar } from "components/sidebar/Sidebar";
import useInactivity from "hooks/useInactivity";
import { useToastr } from "hooks/useToastr";
import { useState } from "react";
import { apiClient } from "services/api";
import "views/chat/ChatAppPage.scss";

function ChatAppPage() {
  const [userMsg, setUserMsg] = useState<string>("");
  const [messages, setMessages] = useState<Array<string | null>>([]);
  const { showToastr } = useToastr();
  const [isMsgSending, setIsMsgSending] = useState<boolean>(false);

  // Handle inactivity beyond 5 minutes to auto logout
  useInactivity();

  // To adjust once session id can be created for new chats
  const handleNewChat: () => void = () => {
    setMessages([]);
  };

  const rateResponse: (index: number, rating: string) => void = (
    index,
    rating
  ) => {
    apiClient.rate_response(index, rating).then((res) => {
      showToastr({
        message: "Response recorded. Thank you for your feedback!",
        type: "success",
      });
    });
  };

  const sendMessage = async (userMsg: string) => {
    setMessages([...messages, userMsg, null]);
    setIsMsgSending(true);
    await apiClient
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
  };

  const handleSubmit = async () => {
    if (isMsgSending) {
      showToastr({
        message: "Only one message can be sent at a time!",
        type: "error",
      });
      return;
    }
    sendMessage(userMsg);
  };
  return (
    <div className="chatapp">
      <Sidebar handleNewChat={handleNewChat} />
      <div className="chat-container">
        {messages?.length ? (
          <ChatMsgsContainer messages={messages} rateResponse={rateResponse} />
        ) : (
          <PlaceholderContainer sendMessage={sendMessage} />
        )}
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
