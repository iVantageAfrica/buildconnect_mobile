// axios.ts
import Axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: "https://d2jd9jr42ljaqn.cloudfront.net/v1/", 
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenString = await SecureStore.getItemAsync("authToken");
    if (tokenString) {
      const sessionObj = JSON.parse(tokenString);
      if (sessionObj?.token) {
        config.headers.Authorization = `Bearer ${sessionObj.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
