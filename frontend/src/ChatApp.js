import React, { useState } from "react";
import Sidebar from "./Components/sidebar/Sidebar";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import NewChat from "./NewChat";
import { ChatMsg } from "./Components/chat/ChatMsg";
import { getChatResponse } from "./api";
import "./chatApp.css";

const ChatApp = () => {
  const [userInput, setUserInput] = useState("");

  const [messages, setMessages] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleDropdownChange = (event) => {
    setSelectedMenuItem(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currQuestion = userInput;

    await getChatResponse(userInput)
      .then((res) => {
        // Assuming that `res.data.history` is an array of arrays
        const prevConvo = res.data.history.map((entry) => [
          entry[0],
          entry[1].result,
        ]);
        const currRes = res.data.answer.result;
        setMessages([...prevConvo, [currQuestion, currRes]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="chat-section">
        <div className="chat-container">
          <div className="msgs-container">
            {messages.map((obj, idx) => (
              <div key={idx}>
                <ChatMsg isFromUser={true} content={obj[0]} />
                <ChatMsg isFromUser={false} content={obj[1]} />
              </div>
            ))}
          </div>
          {/* <div className="learn-more-section">
                  <p>Learn More</p>
                  <div className="buttons-container">
                    <div className="buttons">
                      <button>Palitexcel</button>
                      <button>Dietary</button>
                      <button>Nutrition</button>
                      <button>Symptoms</button>
                      <button>..more</button>
                    </div>
                  </div>
                </div> */}
          <div className="send-msg-container">
            <div className="top-part">
              <div className="learn-more-section">
                <p style={{ paddingRight: "10px" }}>
                  I want to know more about
                </p>
                <select
                  value={selectedMenuItem}
                  onChange={handleDropdownChange}
                  style={{ paddingLeft: "10px", borderRadius: "10px" }}
                >
                  <option value="">Select an item</option>
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                  <option value="item3">Item 3</option>
                  <option value="item4">Item 4</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="question-form">
              <input type="text" value={userInput} onChange={handleChange} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
