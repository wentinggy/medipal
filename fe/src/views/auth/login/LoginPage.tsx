import "views/auth/login/LoginPage.scss";
import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import CustomButton from "components/ui/CustomButton";
import CustomTextField from "components/ui/CustomTextField";
import { apiClient } from "services/api";
import { useToastr } from "hooks/useToastr";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { showToastr } = useToastr();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    apiClient
      .login(loginData.email, loginData.password)
      .then((res: any) => {
        showToastr({ message: "Login success!", type: "success" });
        Cookies.set("sessionid", res.data.sessionid);
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
        showToastr({ message: "Login failed!", type: "error" });
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <CustomTextField
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            onClick={handleSubmit}
          />
          <CustomButton type="submit">Sign In</CustomButton>
        </form>
        <div className="login-footer">
          Don't have an account? Sign up{" "}
          <Link className="signup-link" to="/signup">
            here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
