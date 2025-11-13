import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";

export interface LookupItem {
  id: string;
  label: string;
  value: string;
  description?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface LookupResponse {
  success: boolean;
  data: {
    items: LookupItem[];
  };
  message: string;
  statusCode: number;
  reqId: string;
}

export const LookupService = {
  getProjectTypes: () =>
    axiosInstance.get<LookupResponse>(ENDPOINTS.LOOKUP.PROJECT_TYPES),
  
  getTimelines: () =>
    axiosInstance.get<LookupResponse>(ENDPOINTS.LOOKUP.TIMELINES),
  
  getBudgetRanges: () =>
    axiosInstance.get<LookupResponse>(ENDPOINTS.LOOKUP.BUDGET_RANGES),
};

