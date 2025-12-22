import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";

export const BidService = {
  getBids: (params: any): Promise<any> => 
    axiosInstance.get(`${ENDPOINTS}/`, { params }),
  submitBid: (data: any) => axiosInstance.post(ENDPOINTS.BID.BIDS, data),
  getContractors: () => axiosInstance.get(ENDPOINTS.CONTRACTORS.GET_CONTRACTOR),
  clientBids: (projectId:string, params:any) =>   axiosInstance.get(`${ENDPOINTS.BID.BIDS}project/${projectId}`, { params }),
};