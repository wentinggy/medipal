import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import CustomButton from "components/ui/CustomButton";
import "views/auth/signup/SignupPage.scss";
import CustomTextField from "components/ui/CustomTextField";
import { apiClient } from "services/api";
import { useToastr } from "hooks/useToastr";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const [signupData, setSignupData] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { showToastr } = useToastr();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    apiClient
      .signup(
        signupData.email,
        signupData.password,
        signupData.username,
        signupData.username
      )
      .then((res) => {
        showToastr({ message: "Signup successful!", type: "success" });
      })
      .catch((err) => {
        console.log("err");
        showToastr({ message: "Signup failed!", type: "error" });
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="Username"
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleChange}
          />
          <CustomTextField
            label="Email"
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
          />
          <CustomTextField
            label="Password"
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
          />
          <CustomTextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
        <div className="signup-footer">
          Already have an account? Sign in{" "}
          <Link className="signin-link" to="/login">
            here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
