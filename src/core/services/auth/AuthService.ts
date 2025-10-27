import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";



export const AuthService = {
  login: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data),
  register: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.REGISTER, data),
};