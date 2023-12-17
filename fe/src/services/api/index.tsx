import axios, { AxiosInstance, AxiosResponse } from "axios";

interface ApiResponse<T = any> {
  data: T;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async getChatResponse(question: string): Promise<any> {
    return this.axiosInstance.post("/chat", { question });
  }

  async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    return this.axiosInstance.post("/register", {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
  }

  async rate_response(index: number, rating: string): Promise<void> {
    return this.axiosInstance.post("/rating", {
      index,
      rating,
    });
  }

  async login(email: string, password: string): Promise<void> {
    return this.axiosInstance.post("/login", {
      email,
      password,
    });
  }

  async logout(sessionid: string): Promise<void> {
    return this.axiosInstance.post("/logout", {
      sessionid,
    });
  }
}

const BASE_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:5000/";
const BASE_API_URL = BASE_URL + "api";

export const apiClient = new ApiClient(BASE_API_URL);
