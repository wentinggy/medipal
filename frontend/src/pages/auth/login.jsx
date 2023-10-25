import { useState } from "react";
import MedipalPicture from "../../medipalpicture.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { login } from "../../api";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password).then((res) => {
        const data = res.data;
        alert(data.message);
        setCookie("sessionid", data.sessionid);
        setCookie("email", data.email);
        setCookie("firstName", data.first_name);
        setCookie("lastName", data.last_name);
        navigate("/chat");
      });

      console.log("Login successful", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <img className="w-24" src={MedipalPicture} alt="logo" />
      <input
        value={email}
        onChange={(newVal) => {
          setemail(newVal.target.value);
        }}
        placeholder="Please enter your email"
        className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-10"
      />
      <input
        value={password}
        onChange={(newVal) => {
          setpassword(newVal.target.value);
        }}
        type="password"
        placeholder="Please enter your password"
        className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-2"
      />

      <button
        type="submit"
        className="text-white bg-blue-600 text-sm px-4 py-2 rounded-md mt-5 hover:scale-105 transition-all duration-300"
      >
        Login
      </button>

      <div className="text-sm text-gray mt-10">
        Don't have an account?{" "}
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="text-blue-500 font-bold"
        >
          Signup
        </button>
      </div>
    </form>
  );
}

export default Login;
