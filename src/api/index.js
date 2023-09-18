import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://ec2-46-137-202-117.ap-southeast-1.compute.amazonaws.com/api", // Your API's base URL
  baseURL: "http://localhost:8001/api", // Your API's base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
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
