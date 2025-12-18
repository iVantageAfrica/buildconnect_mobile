import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";

export const ProjectService = {
  getProjectsMarketPlace: (params: any): Promise<any> => 
    axiosInstance.get(`${ENDPOINTS.PROJECT.MARKETPLACE}/`, { params }),
getSingleProjectsMarketPlace: (id: any): Promise<any> => 
    axiosInstance.get(`${ENDPOINTS.PROJECT.MARKETPLACE}/${id}`),
  register: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.REGISTER, data),
};