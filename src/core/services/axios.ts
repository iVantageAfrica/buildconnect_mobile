// axios.ts
import Axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: "https://api-buildconnect.ivantage.africa/v1",
  timeout: 60000,
});

// Request interceptor — attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenString = await SecureStore.getItemAsync("authToken");
    if (tokenString) {
      const sessionObj = JSON.parse(tokenString);
      if (sessionObj?.token) {
        config.headers.Authorization = `Bearer ${sessionObj.token}`;
      }
    }
    console.log("➡️ Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.log("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor — log results
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("❌ API Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.log("❌ Network/Timeout Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
