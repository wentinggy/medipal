import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import NewChat from './NewChat';

const ChatApp = () => {
  const [userInput, setUserInput] = useState('');

  const [messages, setMessages] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleDropdownChange = (event) => {
    setSelectedMenuItem(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var resp = await axios.get("http://localhost:8000/chat", {
      params: {
        question: userInput,
        sessionid: localStorage.getItem("sessionid")
      }
    })
    console.log(resp.data);


  };


  return (
      <div className="app-container">
        <Sidebar />
        <div className="chat-section">
          <h1>MediPal Bot</h1>
          <Routes>
            <Route path="/" element={
              <div className="chat-container">
                <div className="learn-more-section">
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
                </div>
                <div className="top-part">
                <p style={{ paddingRight: '10px' }}>I want to know more about</p>
                  <select value={selectedMenuItem} onChange={handleDropdownChange} style={{ paddingLeft: '10px', borderRadius: '10px' }}>
                    <option value="">Select an item</option>
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                    <option value="item3">Item 3</option>
                    <option value="item4">Item 4</option>
                  </select>
                </div>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    {message.content}
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="question-form">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleChange}
                  />
                  <button type="submit">Send</button>
                </form>
                
              </div>
            } />
            <Route path="/new-chat" element={<NewChat />} />
          </Routes>
        </div>
      </div>
  );
};

export default ChatApp;