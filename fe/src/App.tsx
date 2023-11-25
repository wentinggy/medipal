import { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import LoginPage from "views/auth/login/LoginPage";
import SignupPage from "views/auth/signup/SignupPage";
import { ToastContainer } from "react-toastify";
import ChatAppPage from "views/chat/ChatAppPage";

function App() {
  const views = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    CHAT: "/chat",
  };

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="app">
      <Routes>
        <Route path={views.HOME} element={<LoginPage />}></Route>
        <Route path={views.LOGIN} element={<LoginPage />} />
        <Route path={views.SIGNUP} element={<SignupPage />} />
        <Route path={views.CHAT} element={<ChatAppPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
