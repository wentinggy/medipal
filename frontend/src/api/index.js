import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:5000/";
const BASE_API_URL = BASE_URL + "api";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getChatResponse = async (question) => {
  return await axiosInstance
    .post("/chat", { question: question })
    .then((response) => {
      // Handle the response data here
      return response;
    })
    .catch((error) => {
      // Handle any errors here
      throw error;
    });
};

export const signup = async (email, password, firstName, lastName) => {
  return await axiosInstance.post("/register", {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
  });
};

export const login = async (email, password) => {
  return await axiosInstance.post("/login", {
    email,
    password,
  });
};

export const logout = async (sessionid) => {
  return await axiosInstance.post("/logout", {
    sessionid,
  });
};
