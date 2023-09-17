// App.js

import React, { useEffect, useState } from 'react';
import ChatApp from './ChatApp';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

function SaveToLocalStorage() {
  localStorage.setItem("sessionID", "wadaw2131231qa")
}


function App() {

  const [loggedIn, setloggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('sessionid')!=undefined){
      setloggedIn(true);
    }
    else{
      setloggedIn(false);
    }
  },[])

  return (
    <div className="App">
      {
        loggedIn == true ?
          <Routes>
            <Route path="/" element={<ChatApp />} />
          </Routes> :
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      }
    </div>
  );
}

export default App;
