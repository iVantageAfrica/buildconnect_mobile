import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";



export const AuthService = {
  login: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data),
//   signup: (data: RegisterInput) => axiosInstance.post(APIURLS.AUTH.PERSONAL.REGISTER, data),
//   forgotpassword:(data: ForgotPasswordInput) => axiosInstance.post(APIURLS.AUTH.PERSONAL.FORGOT_PASSWORD, data),
};