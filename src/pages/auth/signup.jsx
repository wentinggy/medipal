import { useState } from "react";
import MedipalPicture from "../../medipalpicture.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await signup(email, password, firstName, lastName).then(
        (res) => {
          // Handle successful registration (e.g., show success message)
          console.log("User registered:", res.data.msg);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <img className="w-24" src={MedipalPicture} alt="logo" />

      <input
        value={firstName}
        onChange={(newVal) => {
          setfirstName(newVal.target.value);
        }}
        placeholder="First Name"
        className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-2"
      />
      <input
        value={lastName}
        onChange={(newVal) => {
          setlastName(newVal.target.value);
        }}
        placeholder="Last Name"
        className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-2"
      />

      <input
        value={email}
        onChange={(newVal) => {
          setemail(newVal.target.value);
        }}
        placeholder="Please enter your email"
        className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-2"
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
        Register
      </button>

      <div className="text-sm text-gray mt-10">
        Already have an account?{" "}
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-blue-500 font-bold"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Signup;
